import { describe, expect, it } from 'vitest'
import { televimArchitecture } from '@/data/projects/televim/architecture'
import type { FlowBoardData, FlowBoardState } from '../types'
import {
  buildIndex,
  edgeEmphasis,
  graphBounds,
  groupBounds,
  layoutGrid,
  polylinePath,
  routeMidpoint,
  sanitizeState,
  traceHighlight,
  transition,
  validateBoard,
} from '../utils'
import { orders } from './fixtures'

const none: FlowBoardState = { selectedNodeId: null, activeTraceId: null, activeStepId: null }

describe('validateBoard', () => {
  it('accepts the Televim board and the unrelated fixture, cycle included', () => {
    expect(validateBoard(televimArchitecture)).toEqual([])
    expect(validateBoard(orders)).toEqual([])
  })

  it('reports every malformed reference', () => {
    const broken: FlowBoardData = {
      id: 'broken',
      nodes: [
        { id: 'a', kind: 'k', label: 'A', groupId: 'nope', position: { x: 0, y: 0 } },
        { id: 'a', kind: 'k', label: 'A again' },
      ],
      edges: [
        { id: 'e', source: 'a', target: 'ghost', kind: 'k' },
        { id: 'e', source: 'a', target: 'a', kind: 'k' },
      ],
      traces: [
        {
          id: 't',
          label: 'T',
          steps: [
            { id: 's', nodeId: 'ghost', edgeIds: ['missing'], description: '' },
            { id: 's', nodeId: 'a', description: '' },
          ],
        },
        { id: 't', label: 'T', steps: [] },
      ],
    }
    const codes = validateBoard(broken).map((i) => i.code)
    expect(codes.filter((c) => c === 'duplicate-id')).toHaveLength(4) // node, edge, trace, step
    expect(codes).toContain('missing-group')
    expect(codes.filter((c) => c === 'missing-node')).toHaveLength(2) // edge target, step node
    expect(codes).toContain('missing-edge')
    expect(codes).toContain('mixed-positions')
    expect(codes).toContain('empty-trace')
  })
})

describe('buildIndex', () => {
  it('indexes by id and lays out unpositioned graphs on a grid', () => {
    const index = buildIndex(orders)
    expect(index.nodes.get('db')?.label).toBe('Postgres')
    expect(index.edges.get('db-api')?.target).toBe('api')
    expect(index.traces.get('audit')?.steps).toHaveLength(1)
    expect(index.groups.get('backend')?.label).toBe('Backend')
    expect([...index.positions.values()]).toEqual([...layoutGrid(orders.nodes).values()])
  })

  it('keeps supplied positions', () => {
    expect(buildIndex(televimArchitecture).positions.get('grammers')).toEqual({ x: 720, y: 510 })
  })
})

describe('traceHighlight', () => {
  it('keeps distinct step numbers for repeated visits', () => {
    const h = traceHighlight(orders.traces?.[0])
    expect(h.nodeSteps.get('api')).toEqual([1, 4])
    expect(h.nodeSteps.get('db')).toEqual([3])
  })

  it('highlights only edges a step names, never edges implied by step order', () => {
    const h = traceHighlight(orders.traces?.[0])
    // db -> api is step 3 -> 4 and an edge exists, but no step names it.
    expect([...h.edgeIds]).toEqual(['api-worker', 'worker-db'])
  })

  it('numbers Televim visits like the dossier did', () => {
    const move = traceHighlight(televimArchitecture.traces?.find((t) => t.id === 'move'))
    expect(move.nodeSteps.get('app')).toEqual([1, 5])
    expect(move.nodeSteps.get('tui')).toEqual([2, 3, 4])
  })
})

describe('edgeEmphasis', () => {
  const [place, audit] = orders.traces ?? []
  const edge = (id: string) => orders.edges.find((e) => e.id === id)!

  it('lights named edges and dims the rest during a trace', () => {
    const h = traceHighlight(place)
    expect(edgeEmphasis(edge('api-worker'), place, h, null)).toBe('on')
    expect(edgeEmphasis(edge('db-api'), place, h, null)).toBe('dim')
  })

  it('leaves edges idle for a trace that names none', () => {
    expect(edgeEmphasis(edge('db-api'), audit, traceHighlight(audit), 'db')).toBe('idle')
  })

  it("lights the selected node's edges without a trace", () => {
    const h = traceHighlight(undefined)
    expect(edgeEmphasis(edge('db-api'), undefined, h, 'api')).toBe('on')
    expect(edgeEmphasis(edge('worker-db'), undefined, h, 'api')).toBe('dim')
    expect(edgeEmphasis(edge('worker-db'), undefined, h, null)).toBe('idle')
  })
})

describe('transition', () => {
  const index = buildIndex(orders)
  const initial: FlowBoardState = {
    selectedNodeId: 'api',
    activeTraceId: 'place',
    activeStepId: null,
  }

  it('selecting a node keeps the trace and drops a step on another node', () => {
    const onStep = { selectedNodeId: 'worker', activeTraceId: 'place', activeStepId: 'enqueue' }
    expect(transition(onStep, { type: 'SELECT_NODE', nodeId: 'db' }, index, initial)).toEqual({
      selectedNodeId: 'db',
      activeTraceId: 'place',
      activeStepId: null,
    })
    expect(
      transition(onStep, { type: 'SELECT_NODE', nodeId: 'worker' }, index, initial).activeStepId
    ).toBe('enqueue')
  })

  it('clears selection and ignores unknown nodes', () => {
    const s = transition(initial, { type: 'SELECT_NODE', nodeId: null }, index, initial)
    expect(s.selectedNodeId).toBeNull()
    expect(
      transition(initial, { type: 'SELECT_NODE', nodeId: 'ghost' }, index, initial).selectedNodeId
    ).toBeNull()
  })

  it('switching trace clears the old step and keeps the node', () => {
    const s = { selectedNodeId: 'db', activeTraceId: 'place', activeStepId: 'store' }
    expect(transition(s, { type: 'SELECT_TRACE', traceId: 'audit' }, index, initial)).toEqual({
      selectedNodeId: 'db',
      activeTraceId: 'audit',
      activeStepId: null,
    })
  })

  it('selecting a step selects its node; steps of other traces are ignored', () => {
    const s = transition(initial, { type: 'SELECT_STEP', stepId: 'store' }, index, initial)
    expect(s).toEqual({ selectedNodeId: 'db', activeTraceId: 'place', activeStepId: 'store' })
    expect(transition(initial, { type: 'SELECT_STEP', stepId: 'read' }, index, initial)).toBe(
      initial
    )
  })

  it('reset returns to the initial state', () => {
    const s = { selectedNodeId: 'db', activeTraceId: 'audit', activeStepId: 'read' }
    expect(transition(s, { type: 'RESET' }, index, initial)).toEqual(initial)
  })
})

describe('sanitizeState', () => {
  it('drops references the data cannot resolve', () => {
    const index = buildIndex(orders)
    expect(
      sanitizeState({ selectedNodeId: 'gone', activeTraceId: 'gone', activeStepId: 'x' }, index)
    ).toEqual(none)
    expect(
      sanitizeState({ selectedNodeId: 'api', activeTraceId: 'audit', activeStepId: 'store' }, index)
    ).toEqual({
      selectedNodeId: 'api',
      activeTraceId: 'audit',
      activeStepId: null,
    })
  })
})

describe('geometry', () => {
  it('draws polylines and finds their midpoint', () => {
    const pts = [
      { x: 0, y: 0 },
      { x: 10, y: 0 },
      { x: 10, y: 10 },
    ]
    expect(polylinePath(pts)).toBe('M0 0 L10 0 L10 10')
    expect(routeMidpoint(pts)).toEqual({ x: 10, y: 0 })
  })

  it('wraps groups around their members and includes edge routes in the drawing', () => {
    const index = buildIndex(televimArchitecture)
    expect(groupBounds('boundary', index)).toEqual({ x: 650, y: 350, width: 300, height: 242 })
    const b = graphBounds(index)
    expect(b.x).toBe(40) // the app -> domain route runs left of every node
    expect(b.x + b.width).toBe(985)
  })
})

import { useState } from 'react'
import { describe, expect, it, vi } from 'vitest'
import { fireEvent, render, screen, within } from '@testing-library/react'
import { FlowBoard, type BoardNodeRendererProps, type FlowBoardData } from '../index'
import { orders } from './fixtures'

const pressed = (name: RegExp | string) => screen.getByRole('button', { name, pressed: true })

function Panels() {
  return (
    <>
      <FlowBoard.TracePicker />
      <FlowBoard.NodeInspector />
      <FlowBoard.TraceSteps />
      <FlowBoard.Toolbar />
    </>
  )
}

describe('uncontrolled board', () => {
  it('starts from defaults and moves through trace, step and reset', () => {
    render(
      <FlowBoard.Root data={orders} defaultTraceId="place" defaultSelectedNodeId="api">
        <Panels />
      </FlowBoard.Root>
    )
    expect(pressed(/Place an order/)).toBeTruthy()
    expect(screen.getByRole('heading', { name: 'API' })).toBeTruthy()

    fireEvent.click(screen.getByRole('button', { name: /Step 3/ }))
    expect(screen.getByRole('heading', { name: 'Postgres' })).toBeTruthy()
    expect(screen.getByText('Writes the row.').closest('li')?.getAttribute('aria-current')).toBe(
      'step'
    )

    // Switching trace clears the step but keeps the inspected node.
    fireEvent.click(screen.getByRole('button', { name: /Audit/ }))
    expect(screen.getByRole('heading', { name: 'Postgres' })).toBeTruthy()
    expect(document.querySelector('[aria-current="step"]')).toBeNull()

    fireEvent.click(screen.getByRole('button', { name: /Reset/ }))
    expect(pressed(/Place an order/)).toBeTruthy()
    expect(screen.getByRole('heading', { name: 'API' })).toBeTruthy()
  })

  it('keeps two boards on one page independent', () => {
    render(
      <>
        <section aria-label="first">
          <FlowBoard.Root data={orders} defaultTraceId="place">
            <FlowBoard.TracePicker />
          </FlowBoard.Root>
        </section>
        <section aria-label="second">
          <FlowBoard.Root data={orders} defaultTraceId="place">
            <FlowBoard.TracePicker />
          </FlowBoard.Root>
        </section>
      </>
    )
    const first = within(screen.getByRole('region', { name: 'first' }))
    const second = within(screen.getByRole('region', { name: 'second' }))
    fireEvent.click(first.getByRole('button', { name: /Audit/ }))
    expect(first.getByRole('button', { name: /Audit/, pressed: true })).toBeTruthy()
    expect(second.getByRole('button', { name: /Place an order/, pressed: true })).toBeTruthy()
  })
})

describe('controlled board', () => {
  it('treats the prop as authoritative and reports user intent', () => {
    const onChange = vi.fn()
    const { rerender } = render(
      <FlowBoard.Root data={orders} activeTraceId="place" onActiveTraceChange={onChange}>
        <FlowBoard.TracePicker />
      </FlowBoard.Root>
    )
    fireEvent.click(screen.getByRole('button', { name: /Audit/ }))
    expect(onChange).toHaveBeenCalledWith('audit')
    // The parent did not accept the change, so the board still shows its prop.
    expect(pressed(/Place an order/)).toBeTruthy()

    // Re-selecting the active trace is a no-op and fires nothing.
    onChange.mockClear()
    fireEvent.click(screen.getByRole('button', { name: /Place an order/ }))
    expect(onChange).not.toHaveBeenCalled()

    rerender(
      <FlowBoard.Root data={orders} activeTraceId="audit" onActiveTraceChange={onChange}>
        <FlowBoard.TracePicker />
      </FlowBoard.Root>
    )
    expect(pressed(/Audit/)).toBeTruthy()
  })

  it('lets another component drive the trace', () => {
    function Page() {
      const [trace, setTrace] = useState<string | null>('place')
      return (
        <>
          <button type="button" onClick={() => setTrace('audit')}>
            Show audit
          </button>
          <FlowBoard.Root data={orders} activeTraceId={trace} onActiveTraceChange={setTrace}>
            <FlowBoard.TraceSteps />
          </FlowBoard.Root>
        </>
      )
    }
    render(<Page />)
    expect(screen.getByRole('heading', { name: 'Place an order' })).toBeTruthy()
    fireEvent.click(screen.getByRole('button', { name: 'Show audit' }))
    expect(screen.getByRole('heading', { name: 'Audit' })).toBeTruthy()
  })

  it('reads unresolvable references as empty when the data changes', () => {
    const smaller: FlowBoardData = {
      ...orders,
      nodes: orders.nodes.slice(0, 1),
      edges: [],
      traces: [],
    }
    const { rerender } = render(
      <FlowBoard.Root data={orders} selectedNodeId="db">
        <FlowBoard.NodeInspector />
      </FlowBoard.Root>
    )
    expect(screen.getByRole('heading', { name: 'Postgres' })).toBeTruthy()
    rerender(
      <FlowBoard.Root data={smaller} selectedNodeId="db">
        <FlowBoard.NodeInspector />
      </FlowBoard.Root>
    )
    expect(screen.getByText('Select a node to see what it does.')).toBeTruthy()
  })
})

describe('panels', () => {
  it('shows inspector sections and evidence links', () => {
    render(
      <FlowBoard.Root data={orders} defaultSelectedNodeId="api">
        <FlowBoard.NodeInspector />
      </FlowBoard.Root>
    )
    expect(screen.getByText('Accepts orders.')).toBeTruthy()
    expect(screen.getByRole('link', { name: 'api.md' }).getAttribute('href')).toBe(
      'https://example.com/api.md'
    )
    expect(screen.getByText('Documented')).toBeTruthy()
    expect(screen.getByText('Service · HTTP')).toBeTruthy()
  })

  it('has intentional empty states and degrades without traces', () => {
    const plain: FlowBoardData = { id: 'plain', nodes: orders.nodes, edges: orders.edges }
    const { container } = render(
      <FlowBoard.Root data={plain}>
        <FlowBoard.TracePicker />
        <FlowBoard.TraceSteps />
        <FlowBoard.NodeInspector emptyLabel="Nothing selected." />
      </FlowBoard.Root>
    )
    expect(container.querySelector('.fb-picker')).toBeNull()
    expect(container.querySelector('.fb-steps')).toBeNull()
    expect(screen.getByText('Nothing selected.')).toBeTruthy()
  })

  it('asks for a trace when none is active', () => {
    render(
      <FlowBoard.Root data={orders}>
        <FlowBoard.TraceSteps />
      </FlowBoard.Root>
    )
    expect(screen.getByText('Select a trace to follow it step by step.')).toBeTruthy()
  })

  it('explains only what the board uses', () => {
    render(
      <FlowBoard.Root data={orders}>
        <FlowBoard.Legend />
      </FlowBoard.Root>
    )
    expect(screen.getByText('Datastore')).toBeTruthy()
    expect(screen.getByText('Inferred')).toBeTruthy()
    expect(screen.queryByText('Illustrative')).toBeNull()
  })
})

describe('canvas', () => {
  it('renders nodes as labelled buttons with step badges', () => {
    render(
      <FlowBoard.Root data={orders} defaultTraceId="place">
        <FlowBoard.Canvas>
          <FlowBoard.Toolbar />
        </FlowBoard.Canvas>
      </FlowBoard.Root>
    )
    const api = screen.getByRole('button', { name: /^API/ })
    expect(api.textContent).toContain('1·4')
    expect(api.textContent).toContain('steps 1 and 4')
    fireEvent.click(screen.getByRole('button', { name: /^Postgres/ }))
    expect(screen.getByRole('button', { name: /^Postgres/, pressed: true })).toBeTruthy()
    for (const name of [
      'Zoom in',
      'Zoom out',
      'Fit the whole diagram',
      'Reset view and selection',
    ]) {
      expect(screen.getByRole('button', { name })).toBeTruthy()
    }
  })

  it('uses a registered renderer and falls back to the default for other kinds', () => {
    function StoreNode({ node, onSelect }: BoardNodeRendererProps) {
      return (
        <button type="button" onClick={onSelect}>
          store:{node.label}
        </button>
      )
    }
    render(
      <FlowBoard.Root data={orders} nodeRenderers={{ store: StoreNode }}>
        <FlowBoard.Canvas />
      </FlowBoard.Root>
    )
    expect(screen.getByRole('button', { name: 'store:Postgres' })).toBeTruthy()
    expect(screen.getByRole('button', { name: /^API/ }).className).toContain('fb-node')
  })

  it('shows an empty state for a board with no nodes', () => {
    render(
      <FlowBoard.Root data={{ id: 'empty', nodes: [], edges: [] }}>
        <FlowBoard.Canvas />
      </FlowBoard.Root>
    )
    expect(screen.getByText('This board has no nodes yet.')).toBeTruthy()
  })
})

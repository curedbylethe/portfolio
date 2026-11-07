# FlowBoard

A read-only architecture explorer. It draws a system's parts and relationships, follows
behaviour traces through them, and explains each part in an inspector.

FlowBoard owns graph rendering (React Flow, internal), selection and trace state, and the
generic panels. It does not own project content, page layout around the board, or editing.
Visitors can select, pan, zoom and follow traces. They cannot move, add or connect nodes.

Import only from the barrel, and only in client components (`'use client'`):

```tsx
import { FlowBoard, type FlowBoardData } from '@/components/flow-board'
```

## Data schema

All types are in `types.ts` and exported from `index.ts`.

| Type             | Meaning                                                                                            |
| ---------------- | -------------------------------------------------------------------------------------------------- |
| `FlowBoardData`  | One board: `nodes`, `edges`, optional `groups`, `traces`, `nodeKinds`, `edgeKinds`, `source`.      |
| `BoardNode`      | A part of the system. `kind` is any string. Optional `position`, `size`, `groupId`, `details`, `note`. |
| `BoardEdge`      | A structural relationship. `kind` is any string. Optional `points` (hand-drawn route), `directed`. |
| `BoardGroup`     | A boundary drawn around its members (nodes with that `groupId`).                                   |
| `BoardTrace`     | An ordered behaviour: `steps`, optional `trigger`, `triggerKind`, `constraint`.                    |
| `BoardTraceStep` | One step: the `nodeId` it happens in, a `description`, optional `edgeIds` and `evidence`.          |
| `BoardEvidence`  | Provenance: `documented`, `inferred` or `illustrative`, with an optional source `label` and `url`. |
| `BoardKind`      | Display name for a kind, and `stroke: 'dashed'` for a non-colour cue.                              |

`RichText` fields (`InspectorSection.content`, `BoardTraceStep.description`, the trace
`constraint`) accept a string or React elements such as `<code>` and `<kbd>`.

Rules, checked by `validateBoard(data)` and logged to the console in development:

- Node, edge, group and trace ids are unique. Step ids are unique within a trace.
- Edges, steps and `edgeIds` reference ids that exist. `groupId` references a group.
- Position every node, or none. Without positions, nodes go on a grid in data order.
- Cycles, disconnected nodes and repeated visits in a trace are valid.

## Edges are not trace steps

An edge says "A depends on, calls or feeds B". A trace says "first A, then B". FlowBoard keeps
them apart:

- Step order never creates or lights an edge.
- An edge lights up only when a step lists it in `edgeIds`.
- A trace whose steps list no edges numbers its nodes and leaves every edge neutral.
- A node visited twice shows both step numbers (`1·4`).

## Compound API

```tsx
<FlowBoard.Root data={data} defaultTraceId="place">
  <FlowBoard.TracePicker label="Behaviour" />
  <FlowBoard.Layout>
    <div>
      <FlowBoard.Canvas label="Order pipeline">
        <FlowBoard.Toolbar />
      </FlowBoard.Canvas>
      <FlowBoard.NodeInspector />
    </div>
    <FlowBoard.Sidebar>
      <FlowBoard.TraceSteps />
      <FlowBoard.Legend />
    </FlowBoard.Sidebar>
  </FlowBoard.Layout>
</FlowBoard.Root>
```

| Member          | Does                                                                                                   |
| --------------- | ------------------------------------------------------------------------------------------------------ |
| `Root`          | One board instance: its own React Flow store and state. Required around everything else.               |
| `Layout`        | 12-column grid. First child is the main column, `Sidebar` the side column. One column below 1024px.    |
| `Sidebar`       | The side column.                                                                                       |
| `Canvas`        | The drawing. Nodes are buttons. Children overlay its bottom-left corner. `label` names the drawing.   |
| `Toolbar`       | Zoom in, zoom out, Fit (view only), Reset (view, selection and trace). Works inside or outside Canvas. |
| `TracePicker`   | One toggle per trace. Renders nothing without traces.                                                  |
| `TraceSteps`    | The active trace as a numbered list with evidence. The text alternative to the drawing.                |
| `NodeInspector` | The selected node's eyebrow, label, `details` and `evidence`. `emptyLabel` sets the empty state.       |
| `Legend`        | Explains only the node kinds, edge kinds and evidence statuses the board uses.                        |

Components read state through hooks, never through props. Custom panels can use the same hooks:
`useBoardData`, `useBoardSelection`, `useBoardTrace`, `useBoardActions`.

## State

| Slice            | Controlled prop  | Default prop            | Callback                |
| ---------------- | ---------------- | ----------------------- | ----------------------- |
| Selected node    | `selectedNodeId` | `defaultSelectedNodeId` | `onSelectedNodeChange`  |
| Active trace     | `activeTraceId`  | `defaultTraceId`        | `onActiveTraceChange`   |
| Active step      | `activeStepId`   | `defaultStepId`         | `onActiveStepChange`    |

- A slice is controlled when its prop is not `undefined`; `null` controls "nothing". The
  controlled value always wins. The board keeps no copy of it.
- Defaults are read once, on mount, and again by Reset.
- Callbacks fire only when a user action changes a value.
- A value the current data cannot resolve reads as `null`, without a callback.

Transitions (`transition` in `utils.ts`):

- **Select node**: keeps the trace. Keeps the active step only if it is on that node.
- **Select trace**: clears the active step. Keeps the selected node.
- **Select step**: selects the step's node. Pans to the node if it is off screen; never zooms.
- **Reset**: restores the defaults and fits the drawing.

Drive the board from another component with the controlled props:

```tsx
const [trace, setTrace] = useState<string | null>('move')
<DemoPlayer onBehaviour={setTrace} />
<FlowBoard.Root data={data} activeTraceId={trace} onActiveTraceChange={setTrace}>…</FlowBoard.Root>
```

## Custom renderers

Register a component per `kind`. Kinds without one use `DefaultBoardNode` / `DefaultBoardEdge`.
Renderers get board types, never React Flow types.

```tsx
function DatabaseNode({ node, selected, dimmed, steps, onSelect }: BoardNodeRendererProps) {
  return (
    <button type="button" aria-pressed={selected} onClick={onSelect} className="fb-node">
      ⛁ {node.label}
      {steps.length > 0 && <span className="fb-badge">{steps.join('·')}</span>}
    </button>
  )
}

<FlowBoard.Root data={data} nodeRenderers={{ store: DatabaseNode }} edgeRenderers={{}}>
```

Keep renderer maps stable (module scope or `useMemo`), as with any React context value.

## Example 1: Televim

Data: `data/projects/televim/architecture.tsx`. Integration:
`app/projects/televim/TelevimArchitecture.tsx`, rendered in section 04 of the dossier.

```tsx
'use client'

import { FlowBoard } from '@/components/flow-board'
import { televimArchitecture } from '@/data/projects/televim/architecture'

export default function TelevimArchitecture() {
  return (
    <FlowBoard.Root data={televimArchitecture} defaultTraceId="move" defaultSelectedNodeId="tui">
      <FlowBoard.TracePicker label="Observed behaviour" />
      <FlowBoard.Layout>
        <div>
          <figure className="fp-project-exhibit">
            {/* plate bar */}
            <FlowBoard.Canvas label="Crate map" />
            <FlowBoard.Toolbar label="Crate map view" />
            {/* caption */}
          </figure>
          <FlowBoard.NodeInspector emptyLabel="Select a crate for its responsibility." />
        </div>
        <FlowBoard.Sidebar>
          <FlowBoard.TraceSteps />
        </FlowBoard.Sidebar>
      </FlowBoard.Layout>
    </FlowBoard.Root>
  )
}
```

Its edges are crate dependencies. A step lists an edge only where it crosses that dependency.

## Example 2: an unrelated system

An order pipeline with a cycle and a node visited twice. No positions, so the grid layout
places it. This is the fixture in `__tests__/fixtures.ts`.

```ts
export const orders: FlowBoardData = {
  id: 'orders',
  nodeKinds: { service: { label: 'Service' }, store: { label: 'Datastore', stroke: 'dashed' } },
  groups: [{ id: 'backend', label: 'Backend' }],
  nodes: [
    { id: 'api', kind: 'service', label: 'API', details: [{ label: 'Role', content: 'Accepts orders.' }] },
    { id: 'worker', kind: 'service', label: 'Worker', groupId: 'backend' },
    { id: 'db', kind: 'store', label: 'Postgres', groupId: 'backend' },
  ],
  edges: [
    { id: 'api-worker', source: 'api', target: 'worker', kind: 'calls' },
    { id: 'worker-db', source: 'worker', target: 'db', kind: 'calls' },
    { id: 'db-api', source: 'db', target: 'api', kind: 'calls', evidence: [{ status: 'inferred' }] },
  ],
  traces: [
    {
      id: 'place',
      label: 'Place an order',
      trigger: 'POST /orders',
      steps: [
        { id: 'receive', nodeId: 'api', description: 'Receives the request.' },
        { id: 'enqueue', nodeId: 'worker', edgeIds: ['api-worker'], description: 'Takes the job.' },
        { id: 'store', nodeId: 'db', edgeIds: ['worker-db'], description: 'Writes the row.' },
        { id: 'reply', nodeId: 'api', description: 'Replies 201.' },
      ],
    },
  ],
}
```

A graph with no traces: omit `traces`. `TracePicker` and `TraceSteps` render nothing, and
selecting a node lights its own edges.

## Adding a board for another project

1. Write `data/projects/<project>/architecture.ts(x)` exporting a `FlowBoardData`.
2. Run `yarn test`; add the board to the `validateBoard` test so broken references fail CI.
3. Compose it in a `'use client'` component with the members you need.

## Styling

Concrete rules are in `css/tailwind.css` under `fb-`, built on the portfolio tokens
(`--text`, `--line`, `--accent`, …). `styles.ts` names the class contract and viewport constants.
Selection, trace membership and provenance each have a non-colour cue: inverted fill, opacity
plus screen-reader text, and solid/dashed/dotted outlines.

## Limits

- No automatic layout beyond the grid fallback. Position nodes for diagrams that carry meaning.
- On touch screens, one-finger drag scrolls the page instead of panning. Zoom with the toolbar;
  selecting a node or step pans to it.
- Groups do not nest and are not React Flow parent nodes.
- Edge labels are SVG text and do not avoid overlaps.
- The React Flow attribution badge is hidden (`proOptions.hideAttribution`).

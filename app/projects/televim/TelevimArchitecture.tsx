'use client'

import { FlowBoard } from '@/components/flow-board'
import { televimArchitecture } from '@/data/projects/televim/architecture'

/** Section 04: pick a behaviour, follow it through the crate map. */
export default function TelevimArchitecture() {
  return (
    <FlowBoard.Root data={televimArchitecture} defaultTraceId="move" defaultSelectedNodeId="tui">
      <FlowBoard.TracePicker label="Observed behaviour" />
      <FlowBoard.Layout>
        <div>
          <figure className="fp-project-exhibit">
            <div className="fp-project-exhibit-bar">
              <span>Plate 3 · Crate map</span>
              <span>Source: docs/architecture.md</span>
            </div>
            <FlowBoard.Canvas label="Crate map" />
            <FlowBoard.Toolbar label="Crate map view" />
            <figcaption>
              <b>Select a crate for its responsibility.</b> Only <code>grammers</code> is drawn
              among external libraries; the others are listed per crate.
            </figcaption>
          </figure>
          <FlowBoard.NodeInspector emptyLabel="Select a crate for its responsibility." />
        </div>
        <FlowBoard.Sidebar>
          <FlowBoard.TraceSteps />
          <p className="fb-mono fb-muted">
            Solid tag: stated in the docs. Dashed tag: inferred, and says from what. File links open
            the files the docs name, not a function.
          </p>
        </FlowBoard.Sidebar>
      </FlowBoard.Layout>
    </FlowBoard.Root>
  )
}

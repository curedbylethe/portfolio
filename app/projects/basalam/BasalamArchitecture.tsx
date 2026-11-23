'use client'

import { FlowBoard } from '@/components/flow-board'
import { basalamArchitecture } from '@/data/projects/basalam/architecture'

export default function BasalamArchitecture() {
  return (
    <FlowBoard.Root data={basalamArchitecture} defaultTraceId="key" defaultSelectedNodeId="screen">
      <FlowBoard.TracePicker label="Choose an event trace" />
      <FlowBoard.Layout>
        <div>
          <figure className="fp-project-exhibit">
            <div className="fp-project-exhibit-bar">
              <span>Plate 01 · Event to frame</span>
              <span>Conceptual diagram / not a call graph</span>
            </div>
            <FlowBoard.Canvas label="Terminal rendering stages" />
            <FlowBoard.Toolbar label="Event to frame view" />
            <figcaption>
              Based on the{' '}
              <a href="https://github.com/curedbylethe/basalam/blob/main/concepts/architecture.mdx">
                architecture
              </a>{' '}
              and{' '}
              <a href="https://github.com/curedbylethe/basalam/blob/main/concepts/event-loop.mdx">
                event-loop
              </a>{' '}
              docs. Arrows show responsibilities, not calls.
            </figcaption>
          </figure>
          <FlowBoard.NodeInspector />
        </div>
        <FlowBoard.Sidebar>
          <FlowBoard.TraceSteps />
        </FlowBoard.Sidebar>
      </FlowBoard.Layout>
    </FlowBoard.Root>
  )
}

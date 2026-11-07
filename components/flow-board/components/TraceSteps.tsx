'use client'

import { useBoardActions, useBoardData, useBoardSelection, useBoardTrace } from '../hooks/useBoard'
import { cx } from '../styles'
import { Evidence } from './Evidence'

export interface TraceStepsProps {
  className?: string
  /** Shown when the board has traces but none is active. */
  emptyLabel?: string
}

/**
 * The active trace as an ordered list: the text alternative to the drawing.
 * Selecting a step selects its node; the list stays readable without the canvas.
 */
export function TraceSteps({
  className,
  emptyLabel = 'Select a trace to follow it step by step.',
}: TraceStepsProps) {
  const { index } = useBoardData()
  const { activeTrace } = useBoardTrace()
  const { activeStepId } = useBoardSelection()
  const { selectStep } = useBoardActions()

  if (!index.data.traces?.length) return null
  if (!activeTrace) return <p className={cx('fb-empty', className)}>{emptyLabel}</p>

  return (
    <div className={cx('fb-steps', className)}>
      <h3>{activeTrace.title ?? activeTrace.label}</h3>
      {activeTrace.description && <p className="fb-steps-description">{activeTrace.description}</p>}
      <ol className="fb-step-list">
        {activeTrace.steps.map((step, i) => {
          const node = index.nodes.get(step.nodeId)
          const active = step.id === activeStepId
          return (
            <li
              key={step.id}
              className={cx('fb-step', active && 'is-active')}
              aria-current={active ? 'step' : undefined}
            >
              <span className="fb-step-n" aria-hidden="true">
                {i + 1}
              </span>
              <div>
                <p className="fb-step-where">
                  <button
                    type="button"
                    className="fb-step-select"
                    onClick={() => selectStep(step.id)}
                  >
                    <span className="fb-sr">Step {i + 1}: </span>
                    <code>{node?.label ?? step.nodeId}</code>
                    {step.title && <span className="fb-step-title">{step.title}</span>}
                  </button>
                  {step.evidence?.map((evidence, k) => (
                    <Evidence key={k} evidence={evidence} />
                  ))}
                </p>
                <div className="fb-step-description">{step.description}</div>
              </div>
            </li>
          )
        })}
      </ol>
      {activeTrace.constraint && (
        <div className="fb-trace-note">
          <span className="fb-mono">{activeTrace.constraint.label}</span>
          <div>{activeTrace.constraint.content}</div>
        </div>
      )}
    </div>
  )
}

'use client'

import { useEffect, useRef } from 'react'
import CaseStudy from '@/components/CaseStudy'
import { before, after, panels } from './content'
import BasalamArchitecture from './BasalamArchitecture'

export default function Dossier() {
  const root = useRef<HTMLDivElement>(null)
  const [beforeDiagram, afterDiagram] = before.split('<!-- BASALAM_FLOW_BOARD -->')
  useEffect(() => {
    const element = root.current
    if (!element) return
    const click = async (event: MouseEvent) => {
      const button = (event.target as Element).closest<HTMLButtonElement>('button')
      if (!button || !element.contains(button)) return
      if (button.dataset.copy) {
        try {
          await navigator.clipboard.writeText(button.dataset.copy)
          button.textContent = 'Copied'
        } catch {
          button.textContent = 'Select text below'
        }
        window.setTimeout(() => {
          button.textContent = 'Copy'
        }, 1800)
      }
    }
    element.addEventListener('click', click)
    return () => element.removeEventListener('click', click)
  }, [])

  return (
    <div className="basalam-dossier" ref={root}>
      <div className="container">
        <div dangerouslySetInnerHTML={{ __html: beforeDiagram }} />
        <BasalamArchitecture />
        <div dangerouslySetInnerHTML={{ __html: afterDiagram }} />
        <CaseStudy
          id="signal-case"
          label="Case study / Signal"
          title="Listening without a polling loop"
          sources="original Signal design"
          status="event-driven resize"
          stations={['Problem', 'Contract', 'Platforms', 'Trade-off', 'Outcome'].map(
            (title, index) => ({
              title,
              content: <div dangerouslySetInnerHTML={{ __html: panels[index] }} />,
            })
          )}
        />
        <div dangerouslySetInnerHTML={{ __html: after }} />
      </div>
    </div>
  )
}

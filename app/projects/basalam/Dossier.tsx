import CaseStudy from '@/components/CaseStudy'
import { before, after, panels } from './content'
import BasalamArchitecture from './BasalamArchitecture'

export default function Dossier() {
  const [beforeDiagram, afterDiagram] = before.split('<!-- BASALAM_FLOW_BOARD -->')

  return (
    <div className="basalam-dossier">
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
          stations={['Problem', 'Design', 'Platforms', 'Alternatives', 'Outcome'].map(
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

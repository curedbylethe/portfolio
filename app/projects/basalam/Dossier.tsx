import CaseStudy from '@/components/CaseStudy'
import { top, flowHead, flowLedgers, resizeHead, after, panels } from './content'
import BasalamArchitecture from './BasalamArchitecture'

const html = (__html: string) => <div dangerouslySetInnerHTML={{ __html }} />

export default function Dossier() {
  return (
    <div className="basalam-dossier">
      <div className="container">
        {html(top)}
        <section aria-labelledby="s02-h" className="section" id="s02">
          {html(flowHead)}
          <BasalamArchitecture />
          {html(flowLedgers)}
        </section>
        <section aria-labelledby="s03-h" className="section" id="s03">
          {html(resizeHead)}
          <CaseStudy
            id="signal-case"
            label="Case study / Signal"
            title="Listening without a polling loop"
            sources="original Signal design"
            status="event-driven resize"
            stations={['Problem', 'Design', 'Platforms', 'Alternatives', 'Outcome'].map(
              (title, index) => ({
                title,
                content: html(panels[index]),
              })
            )}
          />
        </section>
        {html(after)}
      </div>
    </div>
  )
}

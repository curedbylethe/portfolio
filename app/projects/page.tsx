import projectsData from '@/data/projectsData'
import Card from '@/components/Card'
import { genPageMetadata } from 'app/seo'

export const metadata = genPageMetadata({ title: 'Projects' })

export default function Projects() {
  return (
    <>
      <div className="fp-list">
        <div className="fp-section-head">
          <span className="fp-section-ghost" aria-hidden="true">
            01
          </span>
          <span className="fp-section-num">01</span>
          <h1 className="fp-page-title">Projects</h1>
        </div>
        <div className="fp-project-catalog">
          <ol className="fp-projects" aria-label="Project dossiers">
            {projectsData.map((project, index) => (
              <Card key={project.title} project={project} index={index + 1} />
            ))}
          </ol>
        </div>
      </div>
    </>
  )
}

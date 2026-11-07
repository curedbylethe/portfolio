import Image from './Image'
import Link from './Link'
import type { Project } from '@/data/projectsData'

interface CardProps {
  project: Project
  index: number
}

const Card = ({ project, index }: CardProps) => (
  <li className="fp-project-card">
    <span className="fp-project-index" aria-hidden="true">
      {String(index).padStart(2, '0')}
    </span>
    <figure className="fp-project-plate">
      <div className="fp-project-image">
        <Link href={project.href} tabIndex={-1} aria-hidden="true">
          <Image src={project.image.src} alt={project.image.alt} width={1362} height={761} />
        </Link>
      </div>
      <figcaption>{project.image.caption}</figcaption>
    </figure>
    <div className="fp-project-info">
      <span className="fp-meta">{project.eyebrow}</span>
      <h2>
        <Link href={project.href}>{project.title}</Link>
      </h2>
      <p className="fp-project-purpose">{project.purpose}</p>
      <p className="fp-project-description">{project.description}</p>
      <dl>
        {project.info.flatMap(({ label, value }) => [
          <dt key={`${label}-label`}>{label}</dt>,
          <dd key={`${label}-value`}>{value}</dd>,
        ])}
      </dl>
      <ul className="fp-project-tags" aria-label="Project tags">
        {project.tags.map((tag) => (
          <li key={tag} className="fp-tag">
            {tag}
          </li>
        ))}
      </ul>
    </div>
  </li>
)

export default Card

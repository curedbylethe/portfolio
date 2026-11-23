import Image from './Image'
import Link from './Link'
import type { Project } from '@/data/projectsData'

interface CardProps {
  project: Project
  index: number
}

const Card = ({ project, index }: CardProps) => {
  const { src, alt, caption, width = 1362, height = 761 } = project.image

  return (
    <li className="project-item">
      <span className="project-num" aria-hidden="true">
        {String(index).padStart(2, '0')}
      </span>
      <figure className="project-art">
        <div className={`frame frame-${project.href.split('/').pop()}`}>
          <Link href={project.href} className="art-link" tabIndex={-1} aria-hidden="true">
            <Image src={src} alt={alt} width={width} height={height} />
          </Link>
        </div>
        <figcaption>{caption}</figcaption>
      </figure>
      <div className="project-info">
        <span className="project-kicker micro muted">{project.eyebrow}</span>
        <h3>
          <Link href={project.href}>{project.title}</Link>
        </h3>
        <p className="project-purpose">{project.purpose}</p>
        <p className="project-summary">{project.description}</p>
        <dl className="project-facts">
          {project.info.flatMap(({ label, value }) => [
            <dt key={`${label}-label`}>{label}</dt>,
            <dd key={`${label}-value`}>{value}</dd>,
          ])}
        </dl>
        <ul className="tags" aria-label="Project tags">
          {project.tags.map((tag) => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>
        <Link
          className="cta-link"
          href={project.href}
          aria-label={`Explore ${project.title} dossier`}
        >
          Explore dossier <span aria-hidden="true">↗</span>
        </Link>
      </div>
    </li>
  )
}

export default Card

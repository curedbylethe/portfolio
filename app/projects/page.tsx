import Link from 'next/link'
import projectsData from '@/data/projectsData'
import Card from '@/components/Card'
import { genPageMetadata } from '../seo'
import './projects.css'

export const metadata = genPageMetadata({
  title: 'Projects',
  description: 'Selected professional engineering and independent software dossiers.',
})

export default function Projects() {
  return (
    <div className="projects-index">
      <section className="index-hero" aria-labelledby="page-title">
        <div>
          <span className="eyebrow">Selected work / Index 01</span>
          <h1 id="page-title">Projects</h1>
          <p className="index-deck">
            Three years engineering financial software in production. <em>Independent products</em>{' '}
            built with the freedom to explore every layer.
          </p>
        </div>
        <div className="hero-stats" aria-label="Work summary">
          <div className="hero-stat">
            <span className="micro muted">Professional experience</span>
            <b>2023—2026</b>
          </div>
          <div className="hero-stat">
            <span className="micro muted">Independent dossiers</span>
            <b>03 published</b>
          </div>
        </div>
      </section>
      <nav className="index-jump" aria-label="Page sections">
        <div>
          <a href="#professional">
            <span>01</span>Professional engineering ↓
          </a>
          <a href="#independent">
            <span>02</span>Independent engineering ↓
          </a>
        </div>
        <span className="micro muted">Portfolio / 2026</span>
      </nav>

      <section
        id="professional"
        className="professional-index"
        aria-labelledby="professional-heading"
      >
        <div className="section-heading">
          <span className="index">01 /</span>
          <div>
            <span className="micro muted">The work that shipped</span>
            <h2 id="professional-heading">
              Professional
              <br /> engineering
            </h2>
          </div>
          <span className="micro muted note">
            One role
            <br />
            Multiple production systems
          </span>
        </div>
        <article className="featured" aria-labelledby="soorin-title">
          <div className="featured-copy">
            <div className="feature-top">
              <span className="eyebrow">Soorin / Financial technology</span>
              <span className="pill">Commercial work</span>
            </div>
            <h3 id="soorin-title">Soorin</h3>
            <p className="feature-claim">Financial markets are unforgiving of slow interfaces.</p>
            <p className="feature-detail">
              As a front-end engineer, I worked with product, backend and design teams on B2B
              financial software at three stages: improving a trading platform, taking over a mobile
              app, and starting a fund platform from an empty repository.
            </p>
            <p className="feature-meta">Front-End Engineer &nbsp; / &nbsp; Aug 2023—Sep 2026</p>
            <Link
              href="/projects/soorin"
              className="cta-link"
              aria-label="Read the Soorin engineering dossier"
            >
              Read the engineering dossier <span aria-hidden="true">↗</span>
            </Link>
          </div>
          <div
            className="feature-visual"
            role="img"
            aria-label="Conceptual diagram showing trading interfaces, the scripting runtime, and the fund platform as three focus areas of the Soorin work. Not an actual system architecture diagram."
          >
            <div className="visual-head">
              <span className="micro">A / Technical contribution map</span>
              <span className="micro">Conceptual study</span>
            </div>
            <div className="diagram-stack">
              <div className="diag-pair">
                <div className="diag-box">
                  <span className="micro">01 / Trading UX</span>
                  <b>Contract filtering</b>
                </div>
                <div className="diagram-arrow">→</div>
                <div className="diag-box focus">
                  <span className="micro">Outcome</span>
                  <b>Configurable workspace</b>
                </div>
              </div>
              <div className="diag-pair">
                <div className="diag-box">
                  <span className="micro">02 / Runtime</span>
                  <b>Script execution</b>
                </div>
                <div className="diagram-arrow">→</div>
                <div className="diag-box focus">
                  <span className="micro">Constraint</span>
                  <b>Within security policy</b>
                </div>
              </div>
              <div className="diag-pair">
                <div className="diag-box">
                  <span className="micro">03 / Delivery</span>
                  <b>Fund platform</b>
                </div>
                <div className="diagram-arrow">→</div>
                <div className="diag-box focus">
                  <span className="micro">Ownership</span>
                  <b>Built from scratch</b>
                </div>
              </div>
            </div>
            <div className="visual-footer">
              <span className="micro">Architecture · Performance · Delivery</span>
              <span className="micro">Not a product screenshot</span>
            </div>
          </div>
        </article>
      </section>

      <section id="independent" className="independent-index" aria-labelledby="independent-heading">
        <div className="section-heading">
          <span className="index">02 /</span>
          <div>
            <span className="micro muted">Where I own the entire stack</span>
            <h2 id="independent-heading">
              Independent
              <br /> engineering
            </h2>
          </div>
          <span className="micro muted note">
            03 dossiers
            <br />
            Open implementation
          </span>
        </div>
        <p className="independent-intro">
          Independent software lets me make the architecture visible: source, decisions, performance
          budgets, mistakes, and the work required to operate what I ship.
        </p>
        <ol className="project-list" aria-label="Independent dossiers">
          {projectsData.map((project, index) => (
            <Card key={project.href} project={project} index={index + 1} />
          ))}
        </ol>
      </section>
      <aside className="endnote">
        <div>
          <h2>Engineering, documented.</h2>
          <p>
            Each dossier is a record of decisions and trade-offs, not just a finished interface.
          </p>
        </div>
        <Link href="/projects/soorin">Start with Soorin ↗</Link>
      </aside>
    </div>
  )
}

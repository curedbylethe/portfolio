import Link from 'next/link'
import { genPageMetadata } from 'app/seo'
import InstallCommand from '@/components/InstallCommand'

export const metadata = genPageMetadata({
  title: 'Televim',
  description:
    'A keyboard-first Telegram client for the terminal, built in Rust with private conversations and a strict memory budget.',
})

export default function TelevimPage() {
  return (
    <article className="fp-article fp-detail fp-project-dossier">
      <Link href="/projects" className="fp-detail-back fp-project-back">
        ← Catalogue
      </Link>

      <section className="fp-project-hero">
        <div className="fp-project-hero-text">
          <p className="fp-meta fp-project-kicker">Dossier 01 / Terminal application</p>
          <h1 id="d-title" className="fp-project-title">
            Televim
          </h1>
          <p className="fp-project-headline">Telegram, without leaving your terminal.</p>
          <p className="fp-project-lede">
            Read and answer your Telegram messages in a terminal window, using only the keyboard.
            Televim borrows Vim’s modes, so a handful of keys move, write and search. It shows
            one-to-one chats and nothing else.
          </p>
          <div className="fp-project-actions">
            <a
              className="fp-project-button fp-project-button-primary"
              href="https://github.com/curedbylethe/televim/releases"
            >
              Download v0.9.0
            </a>
            <a
              className="fp-project-button fp-project-button-secondary"
              href="https://github.com/curedbylethe/televim"
            >
              Source on GitHub
            </a>
          </div>
        </div>
        <aside className="fp-project-hero-side" aria-label="Project information">
          <InstallCommand />
          <dl className="fp-project-meta">
            <div>
              <dt>Language</dt>
              <dd>Rust</dd>
            </div>
            <div>
              <dt>Platform</dt>
              <dd>macOS, Linux; Windows experimental</dd>
            </div>
            <div>
              <dt>Status</dt>
              <dd>Pre-1.0 · v0.9.0</dd>
            </div>
            <div>
              <dt>Focus</dt>
              <dd>Three-act workflow, keyboard trace, and right-to-left text</dd>
            </div>
          </dl>
        </aside>
      </section>

      <nav className="fp-project-toc" aria-label="Dossier contents">
        <div>
          <h2>Act I · Discover · 1 min</h2>
          <ol>
            <li>
              <a href="#d-title">
                <span>The object</span>
                <span className="fp-project-toc-lead" aria-hidden="true" />
                <span className="fp-project-toc-number">01</span>
              </a>
            </li>
            <li>
              <a href="#s02">
                <span>Origin</span>
                <span className="fp-project-toc-lead" aria-hidden="true" />
                <span className="fp-project-toc-number">02</span>
              </a>
            </li>
          </ol>
        </div>
        <div>
          <h2>Act II · Dissect · 6 min</h2>
          <ol>
            <li>
              <a href="#s03">
                <span>The brief</span>
                <span className="fp-project-toc-lead" aria-hidden="true" />
                <span className="fp-project-toc-number">03</span>
              </a>
            </li>
            <li>
              <a href="#s04">
                <span>A keystroke, layer by layer</span>
                <span className="fp-project-toc-lead" aria-hidden="true" />
                <span className="fp-project-toc-number">04</span>
              </a>
            </li>
            <li>
              <a href="#s05">
                <span>Featured challenge</span>
                <span className="fp-project-toc-lead" aria-hidden="true" />
                <span className="fp-project-toc-number">05</span>
              </a>
            </li>
            <li>
              <a href="#s06">
                <span>Decision records</span>
                <span className="fp-project-toc-lead" aria-hidden="true" />
                <span className="fp-project-toc-number">06</span>
              </a>
            </li>
          </ol>
        </div>
        <div>
          <h2>Act III · Reflect · 3 min</h2>
          <ol>
            <li>
              <a href="#s07">
                <span>Evidence</span>
                <span className="fp-project-toc-lead" aria-hidden="true" />
                <span className="fp-project-toc-number">07</span>
              </a>
            </li>
            <li>
              <a href="#s08">
                <span>Retrospective</span>
                <span className="fp-project-toc-lead" aria-hidden="true" />
                <span className="fp-project-toc-number">08</span>
              </a>
            </li>
          </ol>
        </div>
      </nav>

      <section id="s02" className="fp-project-origin" aria-labelledby="s02-h">
        <header className="fp-project-section-head">
          <span className="fp-project-section-number" aria-hidden="true">
            02
          </span>
          <div className="fp-project-section-title">
            <span className="fp-project-section-act">Act I · Origin</span>
            <h2 id="s02-h">Why it exists</h2>
          </div>
          <p className="fp-project-section-read">30 s</p>
        </header>
        <div className="fp-project-origin-grid">
          <blockquote className="fp-project-origin-quote">
            “Every action must be reachable from the home row.”
            <br />
            <span className="fp-project-origin-source">Product goal 2, docs/product.md</span>
          </blockquote>
          <div className="fp-project-origin-prose">
            <div className="fp-project-author-note">
              <span>WHY I BUILT IT</span>
              <p>
                Telegram was always open for work conversations and notes. With Docker containers,
                browser tabs, and AI agents already running, its GUI felt like unnecessary overhead
                and another distraction. Since I worked in the terminal with Helix, bringing
                Telegram there was a natural choice.
              </p>
              <p>
                I missed Vim&apos;s editing model, too. Fixing a typo three lines up or replacing a
                word throughout a message shouldn&apos;t require a series of clicks. I wanted the same
                speed and control over my conversations that I had over my code.
              </p>
              <h4>Design constraints</h4>
              <ul>
                <li>
                  <strong>Keyboard first.</strong> Navigation and editing should remain usable
                  without a mouse.
                </li>
                <li>
                  <strong>Keep the client small.</strong> Avoid competing with the development
                  environment for resources.
                </li>
                <li>
                  <strong>Delegate, don&apos;t duplicate.</strong> Let dedicated applications handle
                  media playback and viewing.
                </li>
                <li>
                  <strong>Scope follows actual use.</strong> Features earn their place through
                  practical needs, not parity with Telegram&apos;s desktop client.
                </li>
              </ul>
              <h4>Early trade-offs</h4>
              <ul>
                <li>
                  <strong>Private chats first.</strong> Groups and channels were initially excluded
                  as distractions. Open-source collaboration has since made group support necessary.
                </li>
                <li>
                  <strong>Media stays external.</strong> Stickers render in supported terminals, but
                  images, GIFs, and videos are handed to dedicated viewers.
                </li>
              </ul>
            </div>
          </div>
          <aside className="fp-project-origin-side" aria-label="Artifacts from the record">
            <div className="fp-project-artifact-card">
              <span className="fp-project-artifact-label">Artifact · repository</span>
              <p>Created 26 Sep 2026. v0.9.0 released 6 Nov 2026.</p>
            </div>
            <div className="fp-project-artifact-card">
              <span className="fp-project-artifact-label">Artifact · sketch</span>
              <p>
                Lightweight, distraction free Telegram client; right where I&apos;m at home with the
                Vim commands I&apos;m used to.
              </p>
            </div>
          </aside>
        </div>
      </section>

      <header id="act-2" className="fp-project-act">
        <span className="fp-project-act-number">Act II</span>
        <h2 className="fp-project-act-title">Dissect</h2>
        <p className="fp-project-act-lede">
          What the program had to do, how one keystroke moves through it, and the hardest problem it
          met.
        </p>
      </header>

      <section className="mt-12 border-t border-[var(--line)] pt-8">
        <p className="fp-meta">01 · Hardest problem</p>
        <h2 className="mt-3 text-2xl font-medium">Right-to-left text in a terminal</h2>
        <p className="mt-4">
          Arabic and Persian text must stay readable inside a keyboard-driven interface. Televim
          treats bidirectional text as a core layout constraint, so message content and terminal
          navigation remain usable together.
        </p>
      </section>

      <section className="mt-12 border-t border-[var(--line)] pt-8">
        <p className="fp-meta">02 · Design constraints</p>
        <ul className="mt-4 list-disc space-y-2 pl-5">
          <li>Keep conversation data private and local.</li>
          <li>Make message reading and replies work from the keyboard.</li>
          <li>Keep the domain crate independent of terminal and network details.</li>
          <li>Enforce a memory budget in continuous integration.</li>
        </ul>
      </section>
    </article>
  )
}

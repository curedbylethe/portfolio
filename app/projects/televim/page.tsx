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
          <h1 className="fp-project-title">Televim</h1>
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

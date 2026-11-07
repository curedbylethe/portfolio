import Link from 'next/link'
import { genPageMetadata } from 'app/seo'

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

      <header className="mt-8 border-b border-[var(--line)] pb-8">
        <p className="fp-meta">Dossier 01 · Terminal application · 2026</p>
        <h1 className="mt-4">Televim</h1>
        <p className="mt-4 text-2xl font-medium">Telegram, without leaving your terminal.</p>
        <p className="mt-4 text-[var(--text-muted)]">
          Read and answer Telegram messages with a keyboard-first interface. Televim keeps private
          conversations local, separates its pure domain crate, and enforces a memory budget in CI.
        </p>
      </header>

      <dl className="fp-facts mt-8">
        <dt>Language</dt>
        <dd>Rust</dd>
        <dt>Platform</dt>
        <dd>macOS, Linux; Windows experimental</dd>
        <dt>Status</dt>
        <dd>Pre-1.0 · v0.9.0</dd>
        <dt>Focus</dt>
        <dd>Three-act workflow, keyboard trace, and right-to-left text</dd>
      </dl>

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

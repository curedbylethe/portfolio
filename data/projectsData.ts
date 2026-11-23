export interface Project {
  title: string
  purpose: string
  description: string
  eyebrow: string
  href: string
  image: {
    src: string
    alt: string
    caption: string
    width?: number
    height?: number
  }
  info: { label: string; value: string }[]
  tags: string[]
}

const projectsData: Project[] = [
  {
    title: 'Catlog',
    purpose: 'A music diary you can listen to together.',
    description:
      'Log what you play, build a collection, and host synchronized radio rooms in a Telegram Mini App. I built the player, API, worker, and the infrastructure that runs them.',
    eyebrow: 'Dossier 01 · Full-stack application · 2026',
    href: '/projects/catlog',
    image: {
      src: '/static/images/catlog/shelf.webp',
      alt: 'Catlog’s pinned shelf with illustrated album covers and an artist portrait',
      caption: 'Plate 1 · Pinned shelf, captured from the running app',
      width: 770,
      height: 1748,
    },
    info: [
      { label: 'Role', value: 'Sole developer and operator' },
      { label: 'Platform', value: 'Telegram Mini App' },
      { label: 'Dossier', value: 'Synchronized radio, media delivery, and self-hosted operations' },
    ],
    tags: ['TypeScript', 'PostgreSQL', 'Redis', 'Docker'],
  },
  {
    title: 'Televim',
    purpose: 'Telegram, without leaving your terminal.',
    description:
      'Read and answer Telegram messages from a terminal, keyboard only. Private conversations, a pure domain crate, and a memory budget that CI enforces.',
    eyebrow: 'Dossier 02 · Terminal application · 2026',
    href: '/projects/televim',
    image: {
      src: '/static/images/televim.png',
      alt: 'Televim terminal interface showing chats and a conversation',
      caption: 'Plate 2 · Screenshot, from the README',
    },
    info: [
      { label: 'Language', value: 'Rust' },
      { label: 'Platform', value: 'macOS, Linux; Windows experimental' },
      { label: 'Status', value: 'Pre-1.0 · v0.17.0' },
      {
        label: 'Dossier',
        value: 'Full: three acts, a keystroke trace, a case study on right-to-left text',
      },
    ],
    tags: ['Rust', 'Telegram', 'Terminal'],
  },

  {
    title: 'Basalam',
    purpose: 'A terminal UI framework built for a language, not one application.',
    description:
      'Retained widgets, event routing and cell-aware rendering for Salam, with a separate library for safe signal handling. Both became part of the standard library.',
    eyebrow: 'Dossier 03 · Language infrastructure · 2026',
    href: '/projects/basalam',
    image: {
      src: '/static/images/basalam.svg',
      alt: 'Illustration of Basalam and Signal imports in Salam',
      caption: 'Plate 3 · Illustrative imports',
    },
    info: [
      { label: 'Language', value: 'Salam' },
      { label: 'Platform', value: 'POSIX; Windows-safe signal stubs' },
      { label: 'Status', value: 'Adopted into Salam standard library' },
      { label: 'Dossier', value: 'Framework design, resize handling and upstream adoption' },
    ],
    tags: ['Salam', 'Terminal', 'Systems'],
  },
]

export default projectsData

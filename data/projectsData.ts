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
  }
  info: { label: string; value: string }[]
  tags: string[]
}

const projectsData: Project[] = [
  {
    title: 'Televim',
    purpose: 'Telegram, without leaving your terminal.',
    description:
      'Read and answer Telegram messages from a terminal, keyboard only. Private conversations, a pure domain crate, and a memory budget that CI enforces.',
    eyebrow: 'Dossier 01 · Terminal application · 2026',
    href: '/projects/televim',
    image: {
      src: '/static/images/televim.png',
      alt: 'Televim terminal interface showing chats and a conversation',
      caption: 'Plate 1 · Screenshot, from the README',
    },
    info: [
      { label: 'Language', value: 'Rust' },
      { label: 'Platform', value: 'macOS, Linux; Windows experimental' },
      { label: 'Status', value: 'Pre-1.0 · v0.9.0' },
      { label: 'Dossier', value: 'Full: three acts, a keystroke trace, a case study on right-to-left text' },
    ],
    tags: ['Rust', 'Telegram', 'Terminal'],
  },
]

export default projectsData

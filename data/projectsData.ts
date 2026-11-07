interface Project {
  title: string
  description: string
  href?: string
  imgSrc?: string
}

const projectsData: Project[] = [
  {
    title: 'Televim',
    description:
      'Telegram, without leaving your terminal. Read and answer messages by keyboard, with private conversations and a CI-enforced memory budget.',
    href: '/projects/televim',
  },
]

export default projectsData

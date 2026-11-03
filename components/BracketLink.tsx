import type { AnchorHTMLAttributes, ReactNode } from 'react'

type Props = AnchorHTMLAttributes & {
  children: ReactNode
  href: string
}

export default function BracketLink({ children, className = '', ...props }: Props) {
  return (
    <a className={`fp-bracket-link ${className}`.trim()} {...props}>
      {children}
    </a>
  )
}

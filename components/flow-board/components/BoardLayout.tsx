import type { ReactNode } from 'react'
import { cx } from '../styles'

interface SlotProps {
  className?: string
  children?: ReactNode
}

/** Two columns on wide screens: the first child is the main column, then `<FlowBoard.Sidebar>`. One column below 1024px. */
export function BoardLayout({ className, children }: SlotProps) {
  return <div className={cx('fb-layout', className)}>{children}</div>
}

export function BoardSidebar({ className, children }: SlotProps) {
  return <div className={cx('fb-sidebar', className)}>{children}</div>
}

import type { EdgeEmphasis, EvidenceStatus } from './types'

/**
 * Board styling contract. Concrete rules live in css/tailwind.css under the `fb-` prefix
 * and use the portfolio tokens (--text, --line, --accent, ...); this file only names them.
 */
export const FIT_VIEW_OPTIONS = { padding: 0.04 } as const
export const ZOOM = { min: 0.25, max: 2.5 } as const

export const evidenceClass: Record<EvidenceStatus, string> = {
  documented: 'fb-prov',
  inferred: 'fb-prov fb-prov--inferred',
  illustrative: 'fb-prov fb-prov--illustrative',
}

export const evidenceLabel: Record<EvidenceStatus, string> = {
  documented: 'Documented',
  inferred: 'Inferred',
  illustrative: 'Illustrative',
}

export const edgeClass = (emphasis: EdgeEmphasis, inferred: boolean) =>
  ['fb-edge', `fb-edge--${emphasis}`, inferred ? 'fb-edge--inferred' : ''].filter(Boolean).join(' ')

export const cx = (...names: (string | false | null | undefined)[]) =>
  names.filter(Boolean).join(' ')

/** Animation length for viewport moves; zero when the visitor asks for reduced motion. */
export function motionDuration(ms = 200): number {
  if (typeof window === 'undefined') return 0
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : ms
}

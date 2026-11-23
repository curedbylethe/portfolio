import { fireEvent, render, screen } from '@testing-library/react'
import { expect, it } from 'vitest'
import CaseStudy from '../CaseStudy'

it('shows one station and supports tab clicks and keyboard navigation', () => {
  render(
    <CaseStudy
      id="test"
      label="Case study"
      title="Example"
      sources="Source"
      status="Done"
      stations={[
        { title: 'Problem', content: <p>First content</p> },
        { title: 'Outcome', content: <p>Second content</p> },
      ]}
    />
  )
  const first = screen.getByRole('tab', { name: /Problem/ })
  const second = screen.getByRole('tab', { name: /Outcome/ })
  expect(first.getAttribute('aria-selected')).toBe('true')
  expect(screen.getByText('First content').closest<HTMLElement>('[role="tabpanel"]')?.hidden).toBe(false)
  expect(screen.getByText('Second content').closest<HTMLElement>('[role="tabpanel"]')?.hidden).toBe(true)
  fireEvent.click(second)
  expect(second.getAttribute('aria-selected')).toBe('true')
  expect(screen.getByText('First content').closest<HTMLElement>('[role="tabpanel"]')?.hidden).toBe(true)
  expect(screen.getByText('Second content').closest<HTMLElement>('[role="tabpanel"]')?.hidden).toBe(false)
  fireEvent.keyDown(second, { key: 'ArrowRight' })
  expect(first.getAttribute('aria-selected')).toBe('true')
  expect(document.activeElement).toBe(first)
})

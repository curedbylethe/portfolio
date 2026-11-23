import { fireEvent, render, screen } from '@testing-library/react'
import { expect, it } from 'vitest'
import TelevimDemo, { DEMO_URL } from '../../app/projects/televim/TelevimDemo'

it('creates the demo frame only after the visitor opens it, and removes it on close', () => {
  const { container } = render(<TelevimDemo />)
  expect(container.querySelector('iframe')).toBeNull()
  expect(screen.getByText(/fictional conversations · offline/)).toBeTruthy()

  const toggle = screen.getByRole('button', { name: 'Open interactive demo' })
  fireEvent.click(toggle)

  const frame = screen.getByTitle('Televim interactive demo')
  expect(frame.getAttribute('src')).toBe(DEMO_URL)
  expect(frame.getAttribute('sandbox')).toBe('allow-scripts allow-same-origin allow-downloads')
  expect(document.activeElement).toBe(frame)
  expect(toggle.textContent).toBe('Close demo')
  expect(toggle.getAttribute('aria-expanded')).toBe('true')
  expect(screen.getByText(/fictional conversations · offline/)).toBeTruthy()

  fireEvent.click(toggle)
  expect(container.querySelector('iframe')).toBeNull()
  expect(screen.getByLabelText('Static frame from Televim')).toBeTruthy()
  expect(toggle.textContent).toBe('Open interactive demo')
})

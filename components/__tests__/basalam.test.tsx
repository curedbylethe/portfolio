import { fireEvent, render, screen } from '@testing-library/react'
import { expect, it } from 'vitest'
import BasalamPage from '../../app/projects/basalam/Dossier'

it('preserves the event-to-frame paths and changes the selected trace', () => {
  render(<BasalamPage />)
  expect(document.querySelector('#s02')?.textContent).toContain(
    'Producing an event, changing UI state and drawing the result are separate steps.'
  )
  expect(screen.getByRole('button', { name: /Step 1:/ })).toBeTruthy()
  fireEvent.click(screen.getByRole('button', { name: /Window resize/ }))
  expect(screen.getByText('The signal stays outside the widget tree')).toBeTruthy()
  expect(screen.getByRole('button', { name: /Window resize/ }).getAttribute('aria-pressed')).toBe(
    'true'
  )
  fireEvent.click(screen.getByRole('button', { name: /Present frame/ }))
  expect(screen.getByText('Rendering remains a testable operation')).toBeTruthy()
})

it('defines valid graph references for all event paths', async () => {
  const { validateBoard } = await import('../flow-board')
  const { basalamArchitecture } = await import('../../data/projects/basalam/architecture')
  expect(validateBoard(basalamArchitecture)).toEqual([])
})

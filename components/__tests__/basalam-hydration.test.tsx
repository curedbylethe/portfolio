import { act } from '@testing-library/react'
import { hydrateRoot } from 'react-dom/client'
import { renderToString } from 'react-dom/server'
import { expect, it, vi } from 'vitest'
import Dossier from '../../app/projects/basalam/Dossier'

it('hydrates server-rendered Basalam without errors', async () => {
  const container = document.createElement('div')
  container.innerHTML = renderToString(<Dossier />)
  document.body.appendChild(container)
  const errors: unknown[] = []
  const consoleError = vi.spyOn(console, 'error').mockImplementation((...args) => errors.push(args))
  let root: ReturnType<typeof hydrateRoot>
  await act(async () => {
    root = hydrateRoot(container, <Dossier />, {
      onRecoverableError: (error) => errors.push(error),
    })
  })
  await act(async () => {
    root.unmount()
  })
  consoleError.mockRestore()
  container.remove()
  expect(errors).toEqual([])
})

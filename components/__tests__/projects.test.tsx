import { render, screen, within } from '@testing-library/react'
import { expect, it } from 'vitest'
import Projects from '../../app/projects/page'
import Soorin from '../../app/projects/soorin/page'
import projectsData from '@/data/projectsData'

it('features Soorin above the existing independent dossiers', () => {
  render(<Projects />)
  const professional = screen.getByRole('region', { name: /professional engineering/i })
  const independent = screen.getByRole('region', { name: /independent engineering/i })

  expect(
    within(professional)
      .getByRole('link', { name: /read the soorin/i })
      .getAttribute('href')
  ).toBe('/projects/soorin')
  for (const project of projectsData) {
    expect(
      within(independent).getByRole('link', { name: project.title }).getAttribute('href')
    ).toBe(project.href)
    expect(within(independent).getByText(project.description)).toBeTruthy()
  }
})

it('links all six Soorin sections from the grouped dossier contents', () => {
  render(<Soorin />)
  const contents = screen.getByRole('navigation', { name: 'Dossier contents' })
  expect(within(contents).getAllByRole('list')).toHaveLength(3)

  const links = within(contents).getAllByRole('link')
  expect(links.map((link) => link.getAttribute('href'))).toEqual([
    '#execution',
    '#trading',
    '#mobile',
    '#fund',
    '#shipping',
    '#forward',
  ])
  for (const link of links) {
    const section = document.getElementById(link.getAttribute('href')?.slice(1) ?? '')
    expect(section?.tagName).toBe('SECTION')
  }
})

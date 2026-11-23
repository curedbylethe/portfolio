import { genPageMetadata } from 'app/seo'
import Dossier from './Dossier'
import './dossier.css'

export const metadata = genPageMetadata({
  title: 'Basalam',
  description:
    'How I designed Basalam, a retained-mode TUI framework for Salam, built Signal for portable terminal resize notifications, and saw both adopted into the Salam standard library.',
})

export default function BasalamPage() {
  return <Dossier />
}

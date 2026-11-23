import { genPageMetadata } from 'app/seo'
import Dossier from './Dossier'
import './dossier.css'

export const metadata = genPageMetadata({
  title: 'Basalam',
  description:
    'Basalam, a terminal UI framework for the Salam language, and Signal, a safe terminal-resize library. Both were merged into Salam’s standard library.',
})

export default function BasalamPage() {
  return <Dossier />
}

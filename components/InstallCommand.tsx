'use client'

import { useState } from 'react'

const command =
  'curl -fsSL https://raw.githubusercontent.com/curedbylethe/televim/main/scripts/install.sh | sh'

export default function InstallCommand() {
  const [copyLabel, setCopyLabel] = useState('Copy')

  const copyCommand = async () => {
    try {
      await navigator.clipboard.writeText(command)
      setCopyLabel('Copied')
    } catch {
      setCopyLabel('Copy failed')
    }

    window.setTimeout(() => setCopyLabel('Copy'), 2000)
  }

  return (
    <figure className="fp-install-window">
      <figcaption className="fp-install-window-bar">
        <span className="fp-install-lamps" aria-hidden="true">
          <span className="fp-install-lamp fp-install-lamp-live" />
          <span className="fp-install-lamp" />
          <span className="fp-install-lamp" />
        </span>
        <span className="fp-install-file">Install · macOS and Linux</span>
        <span className="fp-install-lang">sh</span>
        <button
          className="fp-install-copy"
          type="button"
          onClick={copyCommand}
          data-copied={copyLabel === 'Copied'}
        >
          <span aria-live="polite">{copyLabel}</span>
        </button>
      </figcaption>
      {/* eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex -- focus enables keyboard scrolling */}
      <div className="fp-install-scroll" tabIndex={0} aria-label="Install command">
        <pre>
          <code>
            <span className="fp-install-prompt">$ </span>
            {command}
          </code>
        </pre>
      </div>
    </figure>
  )
}

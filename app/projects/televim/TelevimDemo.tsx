'use client'

import { useEffect, useRef, useState } from 'react'

// Embed contract: televim docs/web-demo-embed.md. The shell loads WASM only after its own button.
export const DEMO_URL = 'https://curedbylethe.github.io/televim/'

// Frame from televim crates/web-demo/poster.txt.
const poster = `┌ Chats (5) ───────────┐┌ Conversation (10/10) ────────────────────────────────┐
│📌 Juniper Reed       ││─────────────────── Oct 27, 2024 ──────────────────── │
│Rowan Hale (4)        ││ [them] Did the trail map come through?         03:20 │
│Ibis North            ││ [you] Got it. The ridge loop looks perfect.    03:21 │
│Cedar Vale            ││ [them] Saturday, then?                               │
│Moss Bell             ││        Meet at the old station at eight.       03:22 │
│                      ││ [you] Eight works. I'll check the forecast.    03:24 │
│                      ││ [them] Clear skies until noon, then wind.            │
│                      ││        Pack a jacket for the summit.           03:25 │
│                      ││ [you] Packed. Want me to bring the stove?      03:27 │
│                      ││ [them] Yes please. I have the tea.             03:28 │
│                      ││ [you] Deal. See you at the station!            03:30 │
│                      ││                                                      │
│                      ││                                                      │
│                      ││                                                      │
│                      ││                                                      │
│                      ││                                                      │
│                      ││                                                      │
│                      ││                                                      │
└──────────────────────┘└──────────────────────────────────────────────────────┘
┌ Input ───────────────────────────────────────────────────────────────────────┐
│                                                                              │
└──────────────────────────────────────────────────────────────────────────────┘
 NORMAL  ●  i:ins  r:rep  e:edit  v:vis  /:find  ::cmd  +:react  P:pin  t:trans`

// The terminal gives the pin emoji two cells; browsers draw it wider, so it gets a 2ch box.
const [beforePin, afterPin] = poster.split('📌')

export default function TelevimDemo() {
  const [open, setOpen] = useState(false)
  const frame = useRef<HTMLIFrameElement>(null)

  // Hand focus to the frame on open so keyboard users land in it; on close the toggle keeps focus.
  useEffect(() => {
    if (open) frame.current?.focus()
  }, [open])

  return (
    <figure className="fp-project-demo">
      <figcaption className="fp-project-demo-head">
        <span className="fp-project-demo-label">
          Interactive Rust/WASM demo · fictional conversations · offline
        </span>
        <p>
          Runs Televim’s real Rust interface with fictional data. It does not connect to Telegram.
        </p>
      </figcaption>
      <div className="fp-project-actions">
        <button
          type="button"
          className="fp-project-button fp-project-button-primary"
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          {open ? 'Close demo' : 'Open interactive demo'}
        </button>
        <a
          className="fp-project-button fp-project-button-secondary"
          href={DEMO_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          Demo page ↗
        </a>
      </div>
      {open ? (
        <iframe
          ref={frame}
          className="fp-project-demo-frame"
          src={DEMO_URL}
          title="Televim interactive demo"
          allow="clipboard-write"
          referrerPolicy="no-referrer"
          sandbox="allow-scripts allow-same-origin allow-downloads"
        />
      ) : (
        <div className="fp-install-window">
          <div className="fp-install-window-bar">
            <span className="fp-install-lamps" aria-hidden="true">
              <span className="fp-install-lamp fp-install-lamp-live" />
              <span className="fp-install-lamp" />
              <span className="fp-install-lamp" />
            </span>
            <span className="fp-install-file">
              Frame from the real Televim TUI · fictional data
            </span>
          </div>
          <div className="fp-install-scroll" tabIndex={0} aria-label="Static frame from Televim">
            <pre>
              {beforePin}
              <span className="fp-project-demo-wide">📌</span>
              {afterPin}
            </pre>
          </div>
        </div>
      )}
    </figure>
  )
}

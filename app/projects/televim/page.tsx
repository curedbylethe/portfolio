import Link from 'next/link'
import { genPageMetadata } from 'app/seo'
import InstallCommand from '@/components/InstallCommand'
import Progress, { type ProgressItem } from '@/components/Progress'
import CaseStudy from '@/components/CaseStudy'
import DecisionRecord from '@/components/DecisionRecord'
import TelevimArchitecture from './TelevimArchitecture'
import TelevimDemo from './TelevimDemo'

const evidence: ProgressItem[] = [
  {
    label: 'Idle memory',
    detail:
      'Shipped binary, 60-chat archive of 6,400 messages loaded offline; 125-sample median, raw 1.89–10.78 MB',
    value: '8.06 MB',
    context: 'of 50 MB',
    progress: 16.124,
  },
  {
    label: 'Archive write peak',
    detail:
      'Worst case: a full archive saved in one transaction; four runs, 47.9–48.0 MB. Includes a 19 MiB key derivation the shipped client skips',
    value: '48.0 MB',
    context: 'of 50 MB',
    progress: 96,
  },
  {
    label: 'Startup',
    detail: 'Launch to the empty sign-in frame; run medians 1.32–13.52 ms',
    value: '2.234 ms',
    context: 'of 500 ms',
    progress: 0.4468,
  },
  {
    label: 'Input latency',
    detail: 'Key to drawn frame, shipped binary',
    value: '0.175 ms',
    context: 'of 16 ms',
    progress: 1.09375,
  },
  {
    label: 'Binary size',
    detail: 'Stripped release, 9,560,960 bytes, SQLite bundled in',
    value: '9.56 MB',
    context: 'of 15 MB',
    progress: 63.7397,
  },
  {
    label: 'Vim fidelity',
    detail: 'Target: 95% of common motions. PTY tests reach a subset.',
    value: 'Subset tested',
    context: 'no percentage yet',
  },
  {
    label: 'Protocol',
    detail: 'Target: sign in, list chats, send and receive against a test datacenter',
    value: 'Exercised',
    context: 'no pass record here',
  },
]

export const metadata = genPageMetadata({
  title: 'Televim',
  description:
    'A keyboard-first Telegram client for the terminal, built in Rust with private conversations and a strict memory budget.',
})

export default function TelevimPage() {
  return (
    <article className="fp-article fp-detail fp-project-dossier">
      <Link href="/projects" className="fp-detail-back fp-project-back">
        ← Catalogue
      </Link>

      <section className="fp-project-hero">
        <div className="fp-project-hero-text">
          <p className="fp-meta fp-project-kicker">Dossier 01 / Terminal application</p>
          <h1 id="d-title" className="fp-project-title">
            Televim
          </h1>
          <p className="fp-project-headline">Telegram, without leaving your terminal.</p>
          <p className="fp-project-lede">
            Read and answer your Telegram messages in a terminal window, using only the keyboard.
            Televim borrows Vim’s modes, so a handful of keys move, write and search. It shows
            one-to-one chats and nothing else.
          </p>
          <p className="fp-project-lede">
            I designed and built it alone in Rust. Measured on v0.17.0, it idles at 8.1&nbsp;MB with
            60 chats loaded, about a sixth of its 50&nbsp;MB budget, and draws its first screen in
            about 2&nbsp;ms. Your login stays encrypted on disk.
          </p>
          <div className="fp-project-actions">
            <a
              className="fp-project-button fp-project-button-primary"
              href="https://github.com/curedbylethe/televim/releases"
            >
              Download latest release
            </a>
            <a
              className="fp-project-button fp-project-button-secondary"
              href="https://github.com/curedbylethe/televim"
            >
              Source on GitHub
            </a>
          </div>
        </div>
        <aside className="fp-project-hero-side" aria-label="Project information">
          <InstallCommand />
          <dl className="fp-project-meta">
            <div>
              <dt>Language</dt>
              <dd>Rust</dd>
            </div>
            <div>
              <dt>Platform</dt>
              <dd>macOS, Linux; Windows experimental</dd>
            </div>
            <div>
              <dt>Status</dt>
              <dd>Pre-1.0 · v0.17.0, 21 releases since Sep 2026</dd>
            </div>
            <div>
              <dt>Role</dt>
              <dd>Sole author: product, Rust code, tests and release pipeline</dd>
            </div>
          </dl>
        </aside>
      </section>

      <section id="demo" aria-label="Interactive demo">
        <TelevimDemo />
      </section>

      <nav className="fp-project-toc" aria-label="Dossier contents">
        <div>
          <h2>Overview · 1 min</h2>
          <ol>
            <li>
              <a href="#s01">
                <span>What it does</span>
                <span className="fp-project-toc-lead" aria-hidden="true" />
                <span className="fp-project-toc-number">01</span>
              </a>
            </li>
            <li>
              <a href="#s02">
                <span>Why I built it</span>
                <span className="fp-project-toc-lead" aria-hidden="true" />
                <span className="fp-project-toc-number">02</span>
              </a>
            </li>
          </ol>
        </div>
        <div>
          <h2>Engineering · 7 min</h2>
          <ol>
            <li>
              <a href="#s03">
                <span>A keystroke, layer by layer</span>
                <span className="fp-project-toc-lead" aria-hidden="true" />
                <span className="fp-project-toc-number">03</span>
              </a>
            </li>
            <li>
              <a href="#s04">
                <span>Right-to-left text</span>
                <span className="fp-project-toc-lead" aria-hidden="true" />
                <span className="fp-project-toc-number">04</span>
              </a>
            </li>
            <li>
              <a href="#s05">
                <span>Key decisions</span>
                <span className="fp-project-toc-lead" aria-hidden="true" />
                <span className="fp-project-toc-number">05</span>
              </a>
            </li>
          </ol>
        </div>
        <div>
          <h2>Results · 2 min</h2>
          <ol>
            <li>
              <a href="#s06">
                <span>Evidence</span>
                <span className="fp-project-toc-lead" aria-hidden="true" />
                <span className="fp-project-toc-number">06</span>
              </a>
            </li>
            <li>
              <a href="#s07">
                <span>What held, what is open</span>
                <span className="fp-project-toc-lead" aria-hidden="true" />
                <span className="fp-project-toc-number">07</span>
              </a>
            </li>
          </ol>
        </div>
      </nav>

      <section id="s01" className="fp-project-dsec" aria-labelledby="s01-h">
        <header className="fp-project-section-head">
          <span className="fp-project-section-number" aria-hidden="true">
            01
          </span>
          <div className="fp-project-section-title">
            <span className="fp-project-section-act">Overview</span>
            <h2 id="s01-h">What it does</h2>
          </div>
          <p className="fp-project-section-read">30 s</p>
        </header>
        <div className="fp-project-brief">
          <div className="fp-project-brief-col">
            <h3>
              <span>Keyboard first</span>
              <span>A</span>
            </h3>
            <ul>
              <li>
                <b>Modal editing</b>Normal, Insert and Visual modes. Fix a typo three lines up
                without touching the mouse.
              </li>
              <li>
                <b>Conversation tools</b>Reactions, pinned messages, a local edit history and
                on-demand translation.
              </li>
            </ul>
          </div>
          <div className="fp-project-brief-col">
            <h3>
              <span>Reliable and private</span>
              <span>B</span>
            </h3>
            <ul>
              <li>
                <b>Offline history</b>Downloaded messages stay readable offline, in an encrypted
                local archive.
              </li>
              <li>
                <b>Sends survive outages</b>Text queued on disk goes out when the connection
                returns.
              </li>
              <li>
                <b>Read receipts on your terms</b>Sent when you open a chat, when you reply, or
                never.
              </li>
            </ul>
          </div>
          <div className="fp-project-brief-col">
            <h3>
              <span>Media and languages</span>
              <span>C</span>
            </h3>
            <ul>
              <li>
                <b>Voice notes in place</b>Playback with a progress bar, no external player.
              </li>
              <li>
                <b>Right-to-left text</b>Persian, Arabic and Hebrew, with the reading mode picked
                for kitty automatically.
              </li>
              <li>
                <b>Images and video</b>Opened in your own viewer; stickers draw inline where the
                terminal supports it.
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section id="s02" className="fp-project-dsec" aria-labelledby="s02-h">
        <header className="fp-project-section-head">
          <span className="fp-project-section-number" aria-hidden="true">
            02
          </span>
          <div className="fp-project-section-title">
            <span className="fp-project-section-act">Overview</span>
            <h2 id="s02-h">Why I built it</h2>
          </div>
          <p className="fp-project-section-read">30 s</p>
        </header>
        <div className="fp-project-origin-grid">
          <blockquote className="fp-project-origin-quote">
            “Every action must be reachable from the home row.”
            <br />
            <span className="fp-project-origin-source">Product goal 2, docs/product.md</span>
          </blockquote>
          <div className="fp-project-origin-prose">
            <p>
              Telegram stayed open all day for work and notes. Next to Docker, browser tabs and AI
              agents, its desktop app was one more heavy window and one more distraction. I already
              worked in the terminal with Helix, so I brought Telegram there, with the Vim editing I
              missed.
            </p>
            <p>
              Three rules set the scope: every action on the keyboard; small enough not to compete
              with the development environment, under a 50&nbsp;MB memory budget checked in CI; and
              features only for real use, not parity with the desktop app. Groups, channels and bots
              stay out.
            </p>
          </div>
        </div>
      </section>

      <section id="s03" className="fp-project-dsec" aria-labelledby="s03-h">
        <header className="fp-project-section-head">
          <span className="fp-project-section-number" aria-hidden="true">
            03
          </span>
          <div className="fp-project-section-title">
            <span className="fp-project-section-act">Engineering · Architecture</span>
            <h2 id="s03-h">A keystroke, layer by layer</h2>
          </div>
          <p className="fp-project-section-read">2 min</p>
        </header>
        <p className="fp-project-dsec-intro">
          Three rules shape the code. Pick an action below to follow it through the crates (Rust
          packages) in order. Arrows are dependencies, not calls.
        </p>
        <div className="fp-project-brief fp-project-rules">
          <div className="fp-project-brief-col">
            <h3>
              <span>Pure core</span>
              <span>1</span>
            </h3>
            <ul>
              <li>
                <code>domain</code> holds the logic and never imports <code>tokio</code> or{' '}
                <code>ratatui</code>. Its one dependency is <code>thiserror</code>.
              </li>
            </ul>
          </div>
          <div className="fp-project-brief-col">
            <h3>
              <span>One door to Telegram</span>
              <span>2</span>
            </h3>
            <ul>
              <li>
                Only <code>telegram-framework</code> touches <code>grammers</code>, the Telegram
                library underneath. <code>make boundary</code> fails CI otherwise.
              </li>
            </ul>
          </div>
          <div className="fp-project-brief-col">
            <h3>
              <span>Sealed at rest</span>
              <span>3</span>
            </h3>
            <ul>
              <li>
                The login and the message archive are encrypted on every write; neither keeps a
                plaintext copy.
              </li>
            </ul>
          </div>
        </div>
        <TelevimArchitecture />
      </section>

      <section id="s04" className="fp-project-dsec" aria-labelledby="s04-h">
        <header className="fp-project-section-head">
          <span className="fp-project-section-number" aria-hidden="true">
            04
          </span>
          <div className="fp-project-section-title">
            <span className="fp-project-section-act">Engineering · Featured challenge</span>
            <h2 id="s04-h">The hardest problem</h2>
          </div>
          <p className="fp-project-section-read">3 min</p>
        </header>
        <CaseStudy
          id="rtl-case"
          label="Case study · text"
          title="Right-to-left text in a terminal"
          sources="decisions.md, known-gaps.md"
          status="Shipped, with named limits"
          stations={[
            {
              title: 'Problem',
              content: (
                <>
                  <p className="fp-project-case-lede">
                    Arabic, Hebrew and Persian read right to left. In a terminal, nobody agrees who
                    should reverse them.
                  </p>
                  <p>
                    No mainstream terminal applies the Unicode Bidirectional Algorithm by default.
                    Yet terminals that draw these scripts run a shaper, the font engine that joins
                    letters, and kitty’s shaper reverses each right-to-left run on its own. A
                    two-word message comes out with each word right and the words swapped.
                  </p>
                  <figure className="fp-project-case-exhibit">
                    <div className="fp-project-exhibit-bar">
                      <span>Plate 4 · Reading order</span>
                      <span>Conceptual drawing</span>
                    </div>
                    <div className="fp-project-wordlines">
                      <div>
                        <span>A reader expects</span>
                        <b>
                          word 2 <i>←</i>
                        </b>
                        <b>
                          word 1 <i>←</i>
                        </b>
                      </div>
                      <div>
                        <span>kitty shows</span>
                        <b>
                          word 1 <i>←</i>
                        </b>
                        <b>
                          word 2 <i>←</i>
                        </b>
                      </div>
                    </div>
                    <figcaption>
                      <b>Drawn, not captured.</b> A space ends a run, so each word is reversed on
                      its own and the first word lands on the left.
                    </figcaption>
                  </figure>
                </>
              ),
            },
            {
              title: 'Constraints',
              content: (
                <ul>
                  <li>
                    <b>The shaper is outside the program.</b> HarfBuzz, CoreText, DirectWrite and
                    Pango reverse runs whatever Televim emits.
                  </li>
                  <li>
                    <b>Terminals rarely say who they are.</b> Bidi and shaping are settings, not
                    identity. Only kitty names itself, through <code>KITTY_WINDOW_ID</code>,{' '}
                    <code>TERM</code> or <code>TERM_PROGRAM</code>.
                  </li>
                  <li>
                    <b>Tests cannot see the result.</b> <code>ratatui</code>’s test backend has no
                    shaper: it proves which cells were written, not how they were drawn.
                  </li>
                </ul>
              ),
            },
            {
              title: 'Options',
              content: (
                <>
                  <p>Three ways to emit a line, on two kinds of terminal.</p>
                  <div
                    className="fp-project-case-matrix"
                    role="table"
                    aria-label="Emission mode against terminal kind"
                  >
                    <div role="row" className="fp-project-case-matrix-head">
                      <span role="columnheader">Mode</span>
                      <span role="columnheader">
                        Shaping terminals
                        <br />
                        kitty, wezterm, foot, iTerm2, VTE
                      </span>
                      <span role="columnheader">
                        Non-shaping terminals
                        <br />
                        xterm, alacritty
                      </span>
                    </div>
                    <div role="row">
                      <span
                        role="rowheader"
                        className="fp-project-case-mode fp-project-case-chosen"
                      >
                        Terminal<small>logical order · default off kitty</small>
                      </span>
                      <span
                        role="cell"
                        data-col="Shaping terminals"
                        className="fp-project-case-verdict is-part"
                      >
                        <b>Partly</b>One word reads right; on kitty, several words come out swapped.
                      </span>
                      <span
                        role="cell"
                        data-col="Non-shaping terminals"
                        className="fp-project-case-verdict is-no"
                      >
                        <b>Wrong</b>Nothing reverses the run.
                      </span>
                    </div>
                    <div role="row">
                      <span role="rowheader" className="fp-project-case-mode">
                        Visual<small>Televim reorders · opt-in</small>
                      </span>
                      <span
                        role="cell"
                        data-col="Shaping terminals"
                        className="fp-project-case-verdict is-no"
                      >
                        <b>Wrong</b>Reversed twice, once by Televim and once by the shaper.
                      </span>
                      <span
                        role="cell"
                        data-col="Non-shaping terminals"
                        className="fp-project-case-verdict is-yes"
                      >
                        <b>Reads right</b>Correct order; Arabic and Persian letters are not joined.
                      </span>
                    </div>
                    <div role="row">
                      <span
                        role="rowheader"
                        className="fp-project-case-mode fp-project-case-chosen"
                      >
                        Words<small>word order only · default on kitty</small>
                      </span>
                      <span
                        role="cell"
                        data-col="Shaping terminals"
                        className="fp-project-case-verdict is-yes"
                      >
                        <b>Reads right</b>On kitty: Televim swaps the words, the shaper the letters.
                      </span>
                      <span
                        role="cell"
                        data-col="Non-shaping terminals"
                        className="fp-project-case-verdict is-none"
                      >
                        <b>Not recorded</b>The docs do not state this case.
                      </span>
                    </div>
                  </div>
                  <p>
                    Words is only safe where the terminal reverses each word. On one that reverses
                    the whole line, the words would be reversed twice, so Televim picks it only
                    where it can name the terminal.
                  </p>
                </>
              ),
            },
            {
              title: 'What shipped',
              content: (
                <>
                  <p>
                    The default, <code>bidi = "auto"</code>, resolves to Words on kitty and to
                    Terminal elsewhere. On xterm or alacritty, one key opts into Visual for the
                    whole machine, so an ssh hop keeps the setting it was launched with.
                  </p>
                  <figure className="fp-project-case-code">
                    <figcaption>
                      <span>televim.toml · on xterm or alacritty</span>
                      <span>toml</span>
                    </figcaption>
                    <pre>
                      <code>
                        bidi = "visual" <span># or TELEVIM_BIDI=visual</span>
                      </code>
                    </pre>
                  </figure>
                  <ul className="fp-project-case-evidence">
                    <li>
                      <span>Exception</span>
                      <span>
                        The focused input bar draws spaces as <code>·</code>, which kitty does not
                        treat as a run break, so the bar hands its row over as stored.
                      </span>
                    </li>
                    <li>
                      <span>Wrapping</span>
                      <span>
                        A zero-width non-joiner counts as a word break, so a Persian compound such
                        as <bdi lang="fa">کتاب‌ها</bdi> wraps where a reader hears two words.
                      </span>
                    </li>
                    <li>
                      <span>Checked</span>
                      <span>
                        On kitty 0.50.0 with scripted screenshots (
                        <code>scripts/rtl/kitty_shots.py</code>); <code>make test</code> pins the
                        cell widths it rests on.
                      </span>
                    </li>
                  </ul>
                </>
              ),
            },
            {
              title: 'Still open',
              content: (
                <>
                  <ul>
                    <li>
                      xterm and alacritty render right-to-left text wrong in the default mode.
                    </li>
                    <li>
                      In Visual mode, Arabic and Persian letters are not joined. That needs a
                      shaping library.
                    </li>
                    <li>Brackets are not mirrored inside a right-to-left run.</li>
                    <li>No test in the repository can prove how a real terminal draws the text.</li>
                  </ul>
                  <a
                    className="fp-project-case-link"
                    href="https://github.com/curedbylethe/televim/blob/main/docs/known-gaps.md"
                  >
                    known-gaps.md ↗
                  </a>
                </>
              ),
            },
          ]}
        />
      </section>

      <section id="s05" className="fp-project-dsec" aria-labelledby="s05-h">
        <header className="fp-project-section-head">
          <span className="fp-project-section-number" aria-hidden="true">
            05
          </span>
          <div className="fp-project-section-title">
            <span className="fp-project-section-act">Engineering · Decision records</span>
            <h2 id="s05-h">Six choices and their costs</h2>
          </div>
          <p className="fp-project-section-read">2–5 min</p>
        </header>
        <p className="fp-project-dsec-intro">
          Each line is a choice and what it cost. Open one for the problem and the outcome.
        </p>
        <div className="fp-project-records">
          <DecisionRecord
            id="D-01"
            title="One crate is the only door to the protocol"
            choice="a first-party wrapper."
            cost="code to own and keep current."
          >
            <dl className="fp-project-decision-body">
              <dt>Problem</dt>
              <dd>
                Once a protocol type reaches the UI, every library release becomes a UI change, on
                someone else’s schedule.
              </dd>
              <dt>Considered</dt>
              <dd>
                <ol className="fp-project-options">
                  <li>
                    <code>ferogram</code>, an existing wrapper with a small contributor base that
                    pins <code>grammers</code> revisions.
                  </li>
                  <li className="is-chosen">
                    A first-party wrapper, <code>telegram-framework</code>.
                  </li>
                </ol>
              </dd>
              <dt>Outcome</dt>
              <dd>
                <code>proto</code>, <code>domain</code> and <code>tui</code> never see a{' '}
                <code>grammers</code> type, and <code>make boundary</code> proves it on every CI
                run.
              </dd>
            </dl>
            <a
              className="fp-project-record-source"
              href="https://github.com/curedbylethe/televim/blob/main/docs/decisions.md"
            >
              decisions.md ↗
            </a>
          </DecisionRecord>
          <DecisionRecord
            id="D-02"
            title="The login stays sealed, and the key moved to a file"
            choice="a random key in a 0600 file beside the session."
            cost="a process running as you, or a backup of both files, can read it."
          >
            <dl className="fp-project-decision-body">
              <dt>Problem</dt>
              <dd>
                The key first lived in the macOS keychain. Unsigned builds asked for the keychain
                password on every launch.
              </dd>
              <dt>Considered</dt>
              <dd>
                <ol className="fp-project-options">
                  <li>
                    Keep the keychain and make fewer calls to it. Unsigned rebuilds still prompted.
                  </li>
                  <li className="is-chosen">
                    A 32-byte random key in a <code>0600</code> file. A passphrase or a configured
                    key file still takes precedence.
                  </li>
                </ol>
              </dd>
              <dt>Outcome</dt>
              <dd>
                No keychain prompt on launch. Older keychain sessions migrate once and the keychain
                entry is kept, so nothing becomes unrecoverable. Every write is still sealed, with
                no plaintext fallback.
              </dd>
            </dl>
            <blockquote className="fp-project-record-quote">
              “The tradeoff is deliberate: the key sits beside the ciphertext, protected by{' '}
              <code>0600</code> and full-disk encryption rather than the OS credential store.”{' '}
              <span>product.md</span>
            </blockquote>
          </DecisionRecord>
          <DecisionRecord
            id="D-03"
            title="History is an encrypted archive, not a cache"
            choice="a per-account SQLite archive, each message sealed on its own."
            cost="SQLite and the store add about 1.8 MB to the binary."
          >
            <dl className="fp-project-decision-body">
              <dt>Problem</dt>
              <dd>
                The old history cache evicted messages, so conversations were downloaded again, and
                every save rewrote one encrypted file.
              </dd>
              <dt>Outcome</dt>
              <dd>
                Each record carries its own address inside the seal, so a record written in
                plaintext, moved to another chat or replayed is refused on read. A size limit (1 GiB
                by default) stops older history instead of deleting any. When the open conversation
                came from the archive, a restart or reconnect asks only for newer messages.
              </dd>
            </dl>
            <a
              className="fp-project-record-source"
              href="https://github.com/curedbylethe/televim/pull/215"
            >
              PR #215 ↗
            </a>
          </DecisionRecord>
          <DecisionRecord
            id="D-04"
            title="Text survives a lost connection"
            choice="a durable outbox on disk, one send at a time."
            cost="retrying a timed-out send can post it twice."
          >
            <dl className="fp-project-decision-body">
              <dt>Problem</dt>
              <dd>
                Text typed offline was lost. And a send can time out after Telegram has already
                accepted it.
              </dd>
              <dt>Outcome</dt>
              <dd>
                Queued and failed text is written atomically to a <code>0600</code> file and
                survives restarts. A send with no answer in 15 seconds is marked failed and never
                retried on its own; <code>:retry</code> sends it again when you choose. Media
                uploads still live in memory only.
              </dd>
            </dl>
            <blockquote className="fp-project-record-quote">
              “Telegram may accept the request before its reply is lost, so sending timed-out text
              again can duplicate it.” <span>decisions.md</span>
            </blockquote>
          </DecisionRecord>
          <DecisionRecord
            id="D-05"
            title="A read receipt waits for the reader"
            choice="three modes: on open (default), on reply, off."
            cost="terminal focus is only a proxy for attention."
          >
            <dl className="fp-project-decision-body">
              <dt>Problem</dt>
              <dd>
                Opening a chat sent a read receipt, even in a terminal window hidden behind other
                work.
              </dd>
              <dt>Outcome</dt>
              <dd>
                While the terminal reports it is unfocused, the receipt is held, not dropped, and
                goes out when focus returns. A send confirmation that arrives after you switch chats
                still marks the chat it came from. Terminals that never report focus behave as
                before.
              </dd>
            </dl>
            <a
              className="fp-project-record-source"
              href="https://github.com/curedbylethe/televim/pull/212"
            >
              PR #212 ↗
            </a>
          </DecisionRecord>
          <DecisionRecord
            id="D-06"
            title="Private conversations, and nothing else"
            choice="one-to-one chats only."
            cost="people whose Telegram lives in groups are not served."
          >
            <dl className="fp-project-decision-body">
              <dt>Problem</dt>
              <dd>
                Groups, channels and bots multiply the state a terminal client has to hold, filter
                and draw.
              </dd>
              <dt>Outcome</dt>
              <dd>
                The filter sits in the protocol wrapper, so nothing else reaches the domain or the
                screen.
              </dd>
            </dl>
            <blockquote className="fp-project-record-quote">
              “This scope drastically reduces the state surface and memory footprint.”{' '}
              <span>product.md, goal 3</span>
            </blockquote>
          </DecisionRecord>
        </div>
      </section>

      <section id="s06" className="fp-project-dsec" aria-labelledby="s06-h">
        <header className="fp-project-section-head">
          <span className="fp-project-section-number" aria-hidden="true">
            06
          </span>
          <div className="fp-project-section-title">
            <span className="fp-project-section-act">Results · Evidence</span>
            <h2 id="s06-h">Measured on v0.17.0</h2>
          </div>
          <p className="fp-project-section-read">1–2 min</p>
        </header>
        <p className="fp-project-dsec-intro">
          Each target from <code>product.md</code> against its measurement, drawn to scale. Every
          figure sits inside its budget; only the brief archive write peak comes close.
        </p>
        <div className="fp-project-evidence">
          <Progress items={evidence} />
          <aside className="fp-project-evidence-side" aria-label="Measurement context and limits">
            <dl className="fp-project-evidence-context">
              <dt>Taken</dt>
              <dd>
                23 Nov 2026, on v0.17.0 code (<code>e7131d6</code>); write peak from PR #230
              </dd>
              <dt>Host</dt>
              <dd>Darwin arm64, one machine</dd>
              <dt>Method</dt>
              <dd>
                Median of five <code>make measure</code> reports, each a median of five launches.
                Write peak: an archive stress test, four runs
              </dd>
              <dt>Record</dt>
              <dd>
                <a href="https://github.com/curedbylethe/televim/blob/main/docs/memory.md">
                  memory.md ↗
                </a>
              </dd>
            </dl>
            <div className="fp-project-evidence-limits">
              <span>What these figures do not show</span>
              <ul>
                <li>A connected session with fetched history.</li>
                <li>
                  A real session’s chat list, up to about 6&nbsp;MB, on top of the write peak.
                </li>
                <li>End-to-end latency: the terminal’s read and paint sit outside the probe.</li>
                <li>Linux or Windows.</li>
              </ul>
            </div>
          </aside>
        </div>
      </section>

      <section id="s07" className="fp-project-dsec" aria-labelledby="s07-h">
        <header className="fp-project-section-head">
          <span className="fp-project-section-number" aria-hidden="true">
            07
          </span>
          <div className="fp-project-section-title">
            <span className="fp-project-section-act">Results · Retrospective</span>
            <h2 id="s07-h">What held, what is open</h2>
          </div>
          <p className="fp-project-section-read">30 s</p>
        </header>
        <div className="fp-project-retro">
          <div className="fp-project-retro-col">
            <h3>From the record</h3>
            <div className="fp-project-retro-item">
              <h4>What held</h4>
              <p>
                The architecture rules are mechanical: a build fails when one breaks. Goals were
                tested, not assumed. The arena allocator in the original plan was dropped once
                measurement showed memory sits in data, not in per-frame allocations.
              </p>
            </div>
            <div className="fp-project-retro-item">
              <h4>What stayed hard</h4>
              <p>Right-to-left text. Four of the open gaps are bidi; see the featured challenge.</p>
            </div>
            <div className="fp-project-retro-item">
              <h4>Not yet known</h4>
              <p>How much memory a connected session holds after fetching real history.</p>
            </div>
          </div>
          <ul className="fp-project-retro-open" aria-label="Unfinished, from known-gaps.md">
            <li>
              <span>Open · </span>Global search has no sender filter.
            </li>
            <li>
              <span>Open · </span>Several accounts can be stored, but one is open at a time.
            </li>
            <li>
              <span>Open · </span>Release binaries are unsigned and not notarized.
            </li>
            <li>
              <span>Deferred · </span>Sending stickers, and the sticker picker.
            </li>
          </ul>
        </div>
      </section>

      <nav className="fp-project-pager fp-project-pager--pair" aria-label="Dossiers">
        <Link href="/projects">
          <span>← Back to</span>
          <span className="fp-project-pager-title">Catalogue</span>
        </Link>
        <Link href="/projects/basalam">
          <span>Next dossier →</span>
          <span className="fp-project-pager-title">Basalam</span>
        </Link>
      </nav>
    </article>
  )
}

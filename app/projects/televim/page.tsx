import Link from 'next/link'
import { genPageMetadata } from 'app/seo'
import InstallCommand from '@/components/InstallCommand'
import Progress, { type ProgressItem } from '@/components/Progress'
import CaseStudy from '@/components/CaseStudy'
import TelevimArchitecture from './TelevimArchitecture'

const evidence: ProgressItem[] = [
  {
    label: 'Idle memory',
    detail: 'Shipped binary, sealed 60-chat cache drawn offline; 125 samples, 4.23–9.34 MB',
    value: '7.55 MB',
    context: 'of 50 MB',
    progress: 15.1,
  },
  {
    label: 'Startup',
    detail: 'Launch to the empty sign-in frame; run medians 1.58–9.59 ms',
    value: '2.577 ms',
    context: 'of 500 ms',
    progress: 0.5154,
  },
  {
    label: 'Input latency',
    detail: 'Key to drawn frame, shipped binary',
    value: '0.132 ms',
    context: 'of 16 ms',
    progress: 0.825,
  },
  {
    label: 'Binary size',
    detail: 'Stripped release, 6,488,432 bytes',
    value: '6.49 MB',
    context: 'of 15 MB',
    progress: 43.2667,
  },
  {
    label: 'Vim fidelity',
    detail: 'Target: 95% of common motions. PTY tests reach a subset.',
    value: 'Partly covered',
    context: 'no figure',
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
          <div className="fp-project-actions">
            <a
              className="fp-project-button fp-project-button-primary"
              href="https://github.com/curedbylethe/televim/releases"
            >
              Download v0.9.0
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
              <dd>Pre-1.0 · v0.9.0</dd>
            </div>
            <div>
              <dt>Focus</dt>
              <dd>Three-act workflow, keyboard trace, and right-to-left text</dd>
            </div>
          </dl>
        </aside>
      </section>

      <nav className="fp-project-toc" aria-label="Dossier contents">
        <div>
          <h2>Act I · Discover · 1 min</h2>
          <ol>
            <li>
              <a href="#d-title">
                <span>The object</span>
                <span className="fp-project-toc-lead" aria-hidden="true" />
                <span className="fp-project-toc-number">01</span>
              </a>
            </li>
            <li>
              <a href="#s02">
                <span>Origin</span>
                <span className="fp-project-toc-lead" aria-hidden="true" />
                <span className="fp-project-toc-number">02</span>
              </a>
            </li>
          </ol>
        </div>
        <div>
          <h2>Act II · Dissect · 6 min</h2>
          <ol>
            <li>
              <a href="#s03">
                <span>The brief</span>
                <span className="fp-project-toc-lead" aria-hidden="true" />
                <span className="fp-project-toc-number">03</span>
              </a>
            </li>
            <li>
              <a href="#s04">
                <span>A keystroke, layer by layer</span>
                <span className="fp-project-toc-lead" aria-hidden="true" />
                <span className="fp-project-toc-number">04</span>
              </a>
            </li>
            <li>
              <a href="#s05">
                <span>Featured challenge</span>
                <span className="fp-project-toc-lead" aria-hidden="true" />
                <span className="fp-project-toc-number">05</span>
              </a>
            </li>
            <li>
              <a href="#s06">
                <span>Decision records</span>
                <span className="fp-project-toc-lead" aria-hidden="true" />
                <span className="fp-project-toc-number">06</span>
              </a>
            </li>
          </ol>
        </div>
        <div>
          <h2>Act III · Reflect · 3 min</h2>
          <ol>
            <li>
              <a href="#s07">
                <span>Evidence</span>
                <span className="fp-project-toc-lead" aria-hidden="true" />
                <span className="fp-project-toc-number">07</span>
              </a>
            </li>
            <li>
              <a href="#s08">
                <span>Retrospective</span>
                <span className="fp-project-toc-lead" aria-hidden="true" />
                <span className="fp-project-toc-number">08</span>
              </a>
            </li>
          </ol>
        </div>
      </nav>

      <section id="s02" className="fp-project-origin" aria-labelledby="s02-h">
        <header className="fp-project-section-head">
          <span className="fp-project-section-number" aria-hidden="true">
            02
          </span>
          <div className="fp-project-section-title">
            <span className="fp-project-section-act">Act I · Origin</span>
            <h2 id="s02-h">Why it exists</h2>
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
            <div className="fp-project-author-note">
              <span>WHY I BUILT IT</span>
              <p>
                Telegram was always open for work conversations and notes. With Docker containers,
                browser tabs, and AI agents already running, its GUI felt like unnecessary overhead
                and another distraction. Since I worked in the terminal with Helix, bringing
                Telegram there was a natural choice.
              </p>
              <p>
                I missed Vim&apos;s editing model, too. Fixing a typo three lines up or replacing a
                word throughout a message shouldn&apos;t require a series of clicks. I wanted the
                same speed and control over my conversations that I had over my code.
              </p>
              <h4>Design constraints</h4>
              <ul>
                <li>
                  <strong>Keyboard first.</strong> Navigation and editing should remain usable
                  without a mouse.
                </li>
                <li>
                  <strong>Keep the client small.</strong> Avoid competing with the development
                  environment for resources.
                </li>
                <li>
                  <strong>Delegate, don&apos;t duplicate.</strong> Let dedicated applications handle
                  media playback and viewing.
                </li>
                <li>
                  <strong>Scope follows actual use.</strong> Features earn their place through
                  practical needs, not parity with Telegram&apos;s desktop client.
                </li>
              </ul>
              <h4>Early trade-offs</h4>
              <ul>
                <li>
                  <strong>Private chats first.</strong> Groups and channels were initially excluded
                  as distractions. Open-source collaboration has since made group support necessary.
                </li>
                <li>
                  <strong>Media stays external.</strong> Stickers render in supported terminals, but
                  images, GIFs, and videos are handed to dedicated viewers.
                </li>
              </ul>
            </div>
          </div>
          <aside className="fp-project-origin-side" aria-label="Artifacts from the record">
            <div className="fp-project-artifact-card">
              <span className="fp-project-artifact-label">Artifact · repository</span>
              <p>Created 26 Sep 2026. v0.9.0 released 6 Nov 2026.</p>
            </div>
            <div className="fp-project-artifact-card">
              <span className="fp-project-artifact-label">Artifact · sketch</span>
              <p>
                Lightweight, distraction free Telegram client; right where I&apos;m at home with the
                Vim commands I&apos;m used to.
              </p>
            </div>
          </aside>
        </div>
      </section>

      <header id="act-2" className="fp-project-act">
        <span className="fp-project-act-number">Act II</span>
        <h2 className="fp-project-act-title">Dissect</h2>
        <p className="fp-project-act-lede">
          What the program had to do, how one keystroke moves through it, and the hardest problem it
          met.
        </p>
      </header>

      <section id="s03" className="fp-project-dsec" aria-labelledby="s03-h">
        <header className="fp-project-section-head">
          <span className="fp-project-section-number" aria-hidden="true">
            03
          </span>
          <div className="fp-project-section-title">
            <span className="fp-project-section-act">Act II · The brief</span>
            <h2 id="s03-h">Goals, rules, exclusions</h2>
          </div>
          <p className="fp-project-section-read">1 min</p>
        </header>
        <div className="fp-project-brief">
          <div className="fp-project-brief-col">
            <h3>
              <span>Had to achieve</span>
              <span>A</span>
            </h3>
            <ul>
              <li>
                <b>Modal editing</b>Normal, Insert and Visual modes for moving, writing and
                searching.
              </li>
              <li>
                <b>A small process</b>Under 50 MB of RAM, measured on every change to the code.
              </li>
              <li>
                <b>A working protocol</b>Sign in, fetch the private chat list, send and receive over
                MTProto.
              </li>
            </ul>
          </div>
          <div className="fp-project-brief-col">
            <h3>
              <span>Had to respect</span>
              <span>B</span>
            </h3>
            <ul>
              <li>
                <b>A pure domain</b>
                <code>domain</code> knows nothing of <code>tokio</code> or <code>ratatui</code>; its
                one dependency is <code>thiserror</code>.
              </li>
              <li>
                <b>One door to the protocol</b>Only <code>telegram-framework</code> may name a{' '}
                <code>grammers</code> type.
              </li>
              <li>
                <b>No plaintext session</b>The OS credential store, or an encrypted file.
              </li>
            </ul>
          </div>
          <div className="fp-project-brief-col fp-project-brief-col-excluded">
            <h3>
              <span>Left out on purpose</span>
              <span>C</span>
            </h3>
            <ul>
              <li>
                <b>Channels</b>Unwanted clutter.
              </li>
              <li>
                <b>An arena allocator</b>Named in the goals, dropped after measurement. See D-04.
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section id="s04" className="fp-project-dsec" aria-labelledby="s04-h">
        <header className="fp-project-section-head">
          <span className="fp-project-section-number" aria-hidden="true">
            04
          </span>
          <div className="fp-project-section-title">
            <span className="fp-project-section-act">Act II · Under the hood</span>
            <h2 id="s04-h">A keystroke, layer by layer</h2>
          </div>
          <p className="fp-project-section-read">2 min</p>
        </header>
        <p className="fp-project-dsec-intro">
          Pick something you can see the program do. The map numbers the crates it passes through,
          in order; the list says what each one does with it. Arrows on the map are dependencies,
          not calls.
        </p>
        <TelevimArchitecture />
      </section>

      <section id="s05" className="fp-project-dsec" aria-labelledby="s05-h">
        <header className="fp-project-section-head">
          <span className="fp-project-section-number" aria-hidden="true">
            05
          </span>
          <div className="fp-project-section-title">
            <span className="fp-project-section-act">Act II · Featured challenge</span>
            <h2 id="s05-h">The hardest problem</h2>
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
                    Yet every terminal that draws these scripts at all runs a shaper, and shaping
                    reverses right-to-left runs on its own.
                  </p>
                </>
              ),
            },
            {
              title: 'What you see',
              content: (
                <>
                  <p>
                    A two-word Arabic draft, sent to kitty 0.49.2 in logical order. Each word reads
                    correctly. The words are in the wrong order.
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
                      <b>Drawn, not captured.</b> The shaper reverses each right-to-left run
                      separately, and a space ends a run, so the first word lands on the left.
                      Arrows show the direction the letters read.
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
                    <b>The terminal cannot be detected.</b> Bidi and shaping are settings, not
                    identity, and no probe of the far end survives tmux or ssh.
                  </li>
                  <li>
                    <b>Tests cannot see the result.</b> <code>ratatui</code>’s test backend has no
                    bidi and no shaper: it proves which cells were written, not how they were drawn.
                  </li>
                </ul>
              ),
            },
            {
              title: 'Alternatives',
              content: (
                <>
                  <p>
                    Three ways to emit a line, on two kinds of terminal. Each verdict carries a word
                    as well as a fill.
                  </p>
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
                        Terminal<small>logical order · default</small>
                      </span>
                      <span
                        role="cell"
                        data-col="Shaping terminals"
                        className="fp-project-case-verdict is-part"
                      >
                        <b>Partly</b>One word reads right; on kitty, several words come out in the
                        wrong order.
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
                      <span role="rowheader" className="fp-project-case-mode">
                        Words<small>word order only · opt-in</small>
                      </span>
                      <span
                        role="cell"
                        data-col="Shaping terminals"
                        className="fp-project-case-verdict is-yes"
                      >
                        <b>Reads right</b>On kitty: words reversed, letters left to the shaper.
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
                    A fourth option, detecting the terminal and choosing for it, was rejected for
                    the reason in station 3.
                  </p>
                </>
              ),
            },
            {
              title: 'Implementation',
              content: (
                <>
                  <p>
                    The default stays logical order, byte for byte what the binary already emitted,
                    because it is right on every terminal that shapes. The other two modes are one
                    configuration key for the whole machine, not per terminal, so an ssh hop keeps
                    the setting it was launched with.
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
                  <p>
                    Underneath, <code>tui/src/bidi.rs</code> decides which way a message reads and
                    which logical ranges each wrapped row draws. A zero-width non-joiner counts as a
                    word break and a row break, so a Persian compound such as{' '}
                    <bdi lang="fa">کتاب‌ها</bdi> wraps where a reader hears two words.
                  </p>
                </>
              ),
            },
            {
              title: 'Evidence',
              content: (
                <ul className="fp-project-case-evidence">
                  <li>
                    <span>Observed</span>
                    <span>
                      kitty 0.49.2, captured by <code>scripts/rtl/kitty_shots.py</code>: the per-run
                      reversal behind station 2.
                    </span>
                  </li>
                  <li>
                    <span>Automated</span>
                    <span>
                      <code>make test</code> pins the width it rests on: <code>columns("لا")</code>{' '}
                      is 1, <code>drawn_cells("لا")</code> is 2.
                    </span>
                  </li>
                  <li>
                    <span>Automated</span>
                    <span>
                      A wrap property, “a row is never cut inside a cluster”, runs with zero-width
                      non-joiner texts in its loop.
                    </span>
                  </li>
                  <li>
                    <span>Manual</span>
                    <span>
                      <code>make rtl-shots</code>, outside <code>make ci</code> and without
                      assertions: a person reads a scene for the last letter and the clock beside
                      it.
                    </span>
                  </li>
                </ul>
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
                      In Visual mode, Arabic and Persian letters are not contextually joined. That
                      needs a shaping library.
                    </li>
                    <li>Brackets are not mirrored inside a right-to-left run.</li>
                    <li>The default mode’s correctness cannot be proved inside the repository.</li>
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

      <header id="act-3" className="fp-project-act">
        <span className="fp-project-act-number">Act III</span>
        <h2 className="fp-project-act-title">Reflect</h2>
        <p className="fp-project-act-lede">
          What has been measured, what has not, and what is still open.
        </p>
      </header>

      <section id="s07" className="fp-project-dsec" aria-labelledby="s07-h">
        <header className="fp-project-section-head">
          <span className="fp-project-section-number" aria-hidden="true">
            07
          </span>
          <div className="fp-project-section-title">
            <span className="fp-project-section-act">Act III · Evidence</span>
            <h2 id="s07-h">Against the brief</h2>
          </div>
          <p className="fp-project-section-read">1–5 min</p>
        </header>
        <p className="fp-project-dsec-intro">
          The acceptance criteria from <code>product.md</code>, each against what was measured,
          drawn to scale. None is a connected session under load.
        </p>
        <div className="fp-project-evidence">
          <Progress items={evidence} />
          <aside className="fp-project-evidence-side" aria-label="Measurement context and limits">
            <dl className="fp-project-evidence-context">
              <dt>Taken</dt>
              <dd>
                16 Oct 2026, on the <code>0.5.0</code> tree
              </dd>
              <dt>Host</dt>
              <dd>Darwin arm64, one machine</dd>
              <dt>Method</dt>
              <dd>Median of five make measure reports, each a median of five launches</dd>
              <dt>Record</dt>
              <dd>memory.md ↗</dd>
            </dl>
            <div className="fp-project-evidence-limits">
              <span>What these figures do not show</span>
              <ul>
                <li>A connected session with fetched history.</li>
                <li>End-to-end latency: the terminal’s read and paint sit outside the probe.</li>
                <li>Linux or Windows.</li>
                <li>
                  The 20–30 MB stretch band: not attempted. Falling below it is not meeting it.
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </section>
    </article>
  )
}

export const before = `
<a class="back" href="/projects">← Catalogue</a>

<section aria-labelledby="d-title" class="hero">
<div class="hero-main">
<p class="eyebrow kicker"><span aria-hidden="true" class="star"></span>Dossier 02 / Language infrastructure</p>
<h1 class="display" id="d-title">Basalam</h1>
<p class="headline">A terminal UI framework for the Salam programming language.</p>
<p class="merged"><span aria-hidden="true">✓</span> Merged into Salam's standard library · 12 Nov 2026</p>
<p class="lede">Salam is a general-purpose systems language you can write in Persian (Farsi). Basalam gives it what it needs to build full-screen terminal apps: widgets, layouts, keyboard focus and flicker-free rendering. I wrote it, plus <strong>Signal</strong>, a companion library for safe terminal-resize handling. Both started as standalone libraries; Salam's maintainers reviewed and merged them.</p>
<div class="actions">
<a class="button primary" href="https://github.com/SalamLang/Salam/pull/3147" rel="noopener noreferrer" target="_blank">See the upstream merge <span>↗</span></a>
<a class="button" href="https://github.com/curedbylethe/basalam" rel="noopener noreferrer" target="_blank">Basalam source <span>↗</span></a>
<a class="button" href="https://github.com/curedbylethe/signal" rel="noopener noreferrer" target="_blank">Signal source <span>↗</span></a>
</div>
</div>
<aside aria-label="Project information" class="hero-side">
<div aria-label="Illustrative Salam standard-library imports" class="terminal">
<div class="terminal-top"><span>From standalone / to std</span><span aria-hidden="true" class="dots"><i></i><i></i><i></i></span></div>
<div class="terminal-code"><span class="dim">01</span> <span class="red">import</span> <span class="soft">tui</span><br/><span class="dim">02</span> <span class="red">import</span> <span class="soft">os.signal</span><br/><span class="dim">03</span><br/><span class="dim">04 // originally basalam + signal</span><br/><span class="dim">05</span> <span class="ok">// now included with Salam ✓</span></div>
<div class="term-foot"><span>Illustrative imports</span><span>Merged / Nov 2026</span></div>
</div>
<dl class="project-meta">
<div><dt>Role</dt><dd>Original author</dd></div>
<div><dt>Language</dt><dd>Salam</dd></div>
<div><dt>Scope</dt><dd>Retained-mode TUI, POSIX signals</dd></div>
<div><dt>Outcome</dt><dd>Merged as <code>std/tui</code> and <code>std/os/signal</code></dd></div>
</dl>
</aside>
</section>
<nav aria-label="Contents" class="toc">
<div class="toc-group"><h2>Overview</h2><ol>
<li><a href="#s01"><span>Summary</span><span class="dots"></span><span class="n">01</span></a></li>
</ol></div>
<div class="toc-group"><h2>Engineering</h2><ol>
<li><a href="#s02"><span>How it works</span><span class="dots"></span><span class="n">02</span></a></li>
<li><a href="#s03"><span>Resize handling</span><span class="dots"></span><span class="n">03</span></a></li>
<li><a href="#s04"><span>Key decisions</span><span class="dots"></span><span class="n">04</span></a></li>
</ol></div>
<div class="toc-group"><h2>Results</h2><ol>
<li><a href="#s05"><span>Evidence</span><span class="dots"></span><span class="n">05</span></a></li>
</ol></div>
</nav>
<section aria-labelledby="s01-h" class="section" id="s01">
<header class="section-head"><span class="section-num">01</span><div class="section-title"><h2 id="s01-h">Summary</h2></div></header>
<div class="evidence-top">
<div class="metric"><span>Source modules</span><strong>26</strong><small>TUI framework</small></div>
<div class="metric"><span>Test programs</span><strong>34</strong><small>29 TUI, 5 Signal</small></div>
<div class="metric"><span>Merged upstream</span><strong>#3147</strong><small>Salam PR, 12 Nov 2026</small></div>
<div class="metric"><span>Platforms</span><strong>3</strong><small>Linux, macOS, Windows stubs</small></div>
</div>
<div class="brief">
<div class="brief-col"><h3><span>What I built</span><span>A</span></h3><ul>
<li><b>Widgets and layout</b>Panels, tables, text input, lists and modals, arranged by rows, columns, grids and stacks.</li>
<li><b>Input handling</b>Keyboard focus, key maps, event bubbling and mouse hit-testing.</li>
<li><b>Renderer</b>Draws to a cell buffer and writes only the cells that changed.</li>
</ul></div>
<div class="brief-col"><h3><span>Hard parts</span><span>B</span></h3><ul>
<li><b>Threading</b>Background input and resize watchers feed one thread that owns all UI state.</li>
<li><b>Text</b>Cell-aware rendering for wide Unicode characters and Persian text.</li>
<li><b>OS boundary</b>Resize signals handled safely and kept out of the widget code.</li>
</ul></div>
<div class="brief-col"><h3><span>Result</span><span>C</span></h3><ul>
<li><b>Adopted upstream</b>Both libraries became part of Salam's standard library, with my authorship preserved.</li>
<li><b>Testable</b>Rendering and events can be tested without a real terminal.</li>
<li><b>Documented</b>Guides, API references and a checked English-Persian glossary.</li>
</ul></div>
</div>
</section>
<section aria-labelledby="s02-h" class="section" id="s02">
<header class="section-head"><span class="section-num">02</span><div class="section-title"><h2 id="s02-h">How it works</h2></div></header>
<p class="intro">Producing an event, changing UI state and drawing the result are separate steps. Pick a path to follow a keypress, a resize or a redraw through the framework.</p>
<!-- BASALAM_FLOW_BOARD -->
<div class="two-col"><div class="ledger"><h3>Basalam / now <code>tui</code></h3><ul><li><code>Screen</code>, <code>Event</code> and focus dispatch</li><li><code>Row</code>, <code>Column</code>, <code>Grid</code>, <code>Stack</code> layouts</li><li><code>Text</code>, <code>Input</code>, <code>Button</code>, <code>TableView</code>, <code>Panel</code>, <code>Modal</code> and more</li><li>Cell measurement, styles and frame diffs</li></ul><p><a class="inline-link" href="https://github.com/curedbylethe/basalam/tree/main/basalam">Original source ↗</a></p></div><div class="ledger"><h3>Signal / now <code>os.signal</code></h3><ul><li>Signal sets and per-thread masks</li><li>Shared handler install and restore</li><li>Blocking and bounded waits</li><li><code>SIGWINCH</code> support, Windows-safe stubs</li></ul><p><a class="inline-link" href="https://github.com/curedbylethe/signal/blob/main/signal.salam">Original source ↗</a></p></div></div>
</section>
<section aria-labelledby="s03-h" class="section" id="s03"><header class="section-head"><span class="section-num">03</span><div class="section-title"><span class="section-act">Featured challenge</span><h2 id="s03-h">Making resize an event</h2></div></header>
`

export const after = `</section>
<section aria-labelledby="s04-h" class="section" id="s04">
<header class="section-head"><span class="section-num">04</span><div class="section-title"><h2 id="s04-h">Key decisions</h2></div></header>
<div class="decisions">
<div class="decision"><div class="tag">D-01 / Concurrency</div><h3>One thread owns the UI.</h3><p>Input and resize watchers post events to one channel. Handlers and drawing run on the main thread, so widget code needs no locks.</p><p class="cost"><b>Trade-off:</b> A slow handler delays the next frame. <a class="inline-link" href="https://github.com/curedbylethe/basalam/blob/main/concepts/event-loop.mdx">Event loop ↗</a></p></div>
<div class="decision"><div class="tag">D-02 / Rendering</div><h3>Draw cells, not escape codes.</h3><p>Widgets draw into clipped buffers. The screen diffs back and front grids and flushes the changes once.</p><p class="cost"><b>Trade-off:</b> The framework must track invalidation and cell widths. <a class="inline-link" href="https://github.com/curedbylethe/basalam/blob/main/concepts/architecture.mdx">Architecture ↗</a></p></div>
<div class="decision"><div class="tag">D-03 / System boundary</div><h3>Extract Signal as its own library.</h3><p>Handler ownership and bounded waits are OS concerns, not UI concerns. A separate package is reusable outside Basalam.</p><p class="cost"><b>Trade-off:</b> Two packages to version until upstream adoption. <a class="inline-link" href="https://github.com/curedbylethe/signal/blob/main/docs/design.md">Signal design ↗</a></p></div>
<div class="decision"><div class="tag">D-04 / Developer experience</div><h3>Ship docs with the API.</h3><p>Examples, guides and API references, plus a checked Persian glossary for Salam's bilingual users.</p><p class="cost"><b>Trade-off:</b> Naming and docs checks are part of each release. <a class="inline-link" href="https://github.com/curedbylethe/basalam/blob/main/basalam-api-glossary-fa.md">Glossary ↗</a></p></div>
</div>
</section>
<section aria-labelledby="s05-h" class="section" id="s05">
<header class="section-head"><span class="section-num">05</span><div class="section-title"><h2 id="s05-h">Evidence</h2></div></header>
<p class="intro">Everything here can be checked in the source. Counts come from the original standalone repositories, not later standard-library changes.</p>
<div class="evidence-grid">
<div class="verification">
<div class="verify-row"><b>Testing</b><p>Widgets run against synthetic events and render into buffers, with no terminal needed. Also included: rendering snapshots, lifecycle cases and an opt-in PTY resize test. <a class="inline-link" href="https://github.com/curedbylethe/basalam/tree/main/tests">Tests ↗</a></p></div>
<div class="verify-row"><b>Portability</b><p>Signal documents its contract for Linux, Darwin, other POSIX targets and Windows-safe stubs, with an ABI layout check in CI. <a class="inline-link" href="https://github.com/curedbylethe/signal/tree/main/ci">ABI checks ↗</a></p></div>
<div class="verify-row"><b>Documentation</b><p>Guides cover architecture, the event loop, focus, widget authoring and key maps, with runnable examples. <a class="inline-link" href="https://github.com/curedbylethe/basalam/tree/main/guides">Guides ↗</a></p></div>
<div class="verify-row"><b>Adoption</b><p>Salam accepted both libraries on <strong>12 Nov 2026</strong>. The import commit preserves my authorship; later integration work belongs to the maintainers. <a class="inline-link" href="https://github.com/SalamLang/Salam/pull/3147">PR #3147 ↗</a></p></div>
</div>
<aside class="evidence-side">
<div class="caveat"><h3>Current source</h3><p><a class="inline-link" href="https://github.com/SalamLang/Salam/tree/main/std/tui"><code>std/tui</code> ↗</a><br/><a class="inline-link" href="https://github.com/SalamLang/Salam/tree/main/std/os/signal"><code>std/os/signal</code> ↗</a></p></div>
</aside>
</div>
<div class="timeline">
<div class="milestone"><time datetime="2026-10-28">28 Oct 2026</time><h3>Signal split out</h3><p>Basalam v0.4.0 hands resize primitives to Signal. <a class="inline-link" href="https://github.com/curedbylethe/basalam/blob/main/CHANGELOG.md">Changelog ↗</a></p></div>
<div class="milestone"><time datetime="2026-11-10">10 Nov 2026</time><h3>Basalam v0.5.0</h3><p>TableView, Unicode width measurement, input editing and the Persian glossary.</p></div>
<div class="milestone"><time datetime="2026-11-12">12 Nov 2026</time><h3>Adopted by Salam</h3><p>Both libraries become <code>tui</code> and <code>os.signal</code>. <a class="inline-link" href="https://github.com/SalamLang/Salam/pull/3147">Merge ↗</a></p></div>
</div>
</section>
<div class="sources"><p>Diagrams are illustrative. No performance figures are claimed.</p><div class="sources-nav"><a href="https://github.com/curedbylethe/basalam">Basalam ↗</a><a href="https://github.com/curedbylethe/signal">Signal ↗</a><a href="https://github.com/SalamLang/Salam/pull/3147">Merge PR ↗</a><a href="#d-title">Back to top ↑</a></div></div>
`

export const panels = [
  `<h4>A resize is a notification, not a new size</h4><p>After a terminal resizes, the OS sends <code>SIGWINCH</code>. The app should wake, read the new size and repaint. Repeated signals can merge into one, so counting them is wrong.</p><div class="case-note">Goal: a reliable resize path without polling <code>term.Size()</code> in a loop.</div>`,
  `<h4>Shared handlers, single waiter</h4><p>The first install saves the old handler and thread mask. Later installs of the same handler share ownership, and the last restore puts the original state back. An incompatible handler is rejected, not replaced.</p><p>Only one thread may wait at a time. A second waiter gets <code>WaitBusy</code>, because a pending signal reaches one waiter, not all.</p>`,
  `<h4>One API, different operating systems</h4><div class="mini-compare"><div><span>Linux</span><strong><code>sigtimedwait</code></strong><p>Bounded wait over a signal set, using libc with no allocation on the wait path.</p></div><div><span>macOS / Darwin</span><strong><code>kqueue</code> + <code>sigwait</code></strong><p>A <code>kqueue</code> filter bounds the wait. <code>sigwait</code> consumes the signal.</p></div></div><p>Other POSIX targets get unbounded waits. Windows gets safe stubs.</p>`,
  `<h4>Why not a signal handler that redraws?</h4><p>Handlers run at arbitrary points and cannot safely allocate, lock, print or call the runtime. Instead, Signal blocks the signal and waits for it on a controlled thread, so the resize check is ordinary application code.</p><p>A self-pipe or a process-wide <code>SIGALRM</code> timeout would claim even more global state.</p>`,
  `<h4>A reusable layer, not a TUI special case</h4><p>Basalam first owned the <code>SIGWINCH</code> code. In v0.4.0 I moved it into Signal. The UI still reads the new size and repaints; Signal handles handlers, signal sets and safe waiting.</p><div class="case-note">Both libraries later became separate standard-library packages, <code>tui</code> and <code>os.signal</code>. <a class="inline-link" href="https://github.com/curedbylethe/basalam/blob/main/CHANGELOG.md">Release history ↗</a></div>`,
]

import type { CSSProperties, ReactNode } from 'react'
import CaseStudy from '@/components/CaseStudy'

const problems = [
  [
    '01',
    'Changing schema',
    'Columns are inferred from the returned rows rather than prescribed by every host.',
  ],
  ['02', 'Personal workspace', 'Saved layouts and temporary edits need distinct lifetimes.'],
  [
    '03',
    'Changing data',
    'Polling and manual actions may overlap while the user continues to interact.',
  ],
]

const decisions = [
  [
    '01 / Schema',
    'Infer, then reconcile.',
    'The incoming data defines the columns; preferences describe how to present them.',
  ],
  [
    '02 / State',
    'Separate lifetimes.',
    "Persist the saved view, the current tab's draft and transient interaction independently.",
  ],
  [
    '03 / Requests',
    'Keep the view current.',
    "Coordinate refreshes, reject superseded responses and reapply the user's transformations.",
  ],
]

const schemaColumns = [
  {
    tag: 'Saved view',
    title: 'Previous fields',
    fields: [
      ['Name', 'pinned', ''],
      ['Value', 'wide', ''],
      ['Category', 'hidden', 'old'],
    ],
  },
  {
    tag: 'New response',
    title: 'Current fields',
    fields: [
      ['Name', '', ''],
      ['Value', '', ''],
      ['Status', 'new', 'new'],
    ],
  },
  {
    tag: 'Reconciled view',
    title: 'Current + intent',
    fields: [
      ['Name', 'pinned', ''],
      ['Value', 'wide', ''],
      ['Status', 'default', 'new'],
    ],
  },
]

const stages = [
  ['Fetch & normalise', 'Raw rows and inferred columns', 'Server filters, refreshes'],
  ['Saved view', 'Column filters and preset sort', 'Rows, column settings'],
  [
    'Current interaction',
    'Search, header sort, pinned rows, numbering',
    'Filtered rows, search, sort',
  ],
  ['Render window', 'Visible rows and columns', 'View, widths, viewport'],
]

const tiers = [
  [
    'Account settings',
    'Named presets and table refresh configuration; the durable source of saved preferences.',
    'Across sessions',
  ],
  [
    'Browser tab',
    'Active preset and unsaved column configuration in session storage.',
    'Tab lifetime',
  ],
  [
    'Host screen',
    'Search text, ad-hoc sort and transient refresh state restored when the grid remounts.',
    'Screen lifetime',
  ],
]

const outcomes = [
  [
    'Schema flexibility',
    'The grid can adapt to compatible changes in the returned fields while preserving settings associated with matching keys.',
  ],
  [
    'Continuity of interaction',
    'Current filters, search and ordering are reapplied when fresh rows arrive.',
  ],
  [
    'Independent views',
    'Account-level presets coexist with per-tab drafts and screen-level interaction state.',
  ],
  [
    'Bounded DOM work',
    'Virtualised rows and reference-preserving configuration updates limit particular sources of rendering work.',
  ],
]

function TradeOff({ children }: { children: ReactNode }) {
  return (
    <div className="state-principle">
      <span className="eyebrow">Trade-off</span>
      <p>{children}</p>
    </div>
  )
}

function Cards({ items }: { items: string[][] }) {
  return (
    <div className="state-problems">
      {items.map(([tag, title, text]) => (
        <article key={tag}>
          <span className="micro">{tag}</span>
          <h4>{title}</h4>
          <p>{text}</p>
        </article>
      ))}
    </div>
  )
}

function Exhibit({ title, kind }: { title: string; kind: string }) {
  return (
    <div className="fp-project-exhibit-bar">
      <span>{title}</span>
      <span>{kind}</span>
    </div>
  )
}

// [label, lane (1 = tick header), first tick, last tick + 1, class]. Ticks t0..t4 map to grid
// lines 2..7. The CSS lays time out horizontally, or vertically on phones.
const timeline: [string, number, number, number, string][] = [
  ...['t0', 't1', 't2', 't3', 't4'].map((tick, index): [string, number, number, number, string] => [
    tick,
    1,
    index + 2,
    index + 3,
    'tick',
  ]),
  ['Poll A', 2, 1, 2, 'lane'],
  ['Fetching', 2, 2, 4, 'bar'],
  ['Abort', 2, 4, 5, 'bar em'],
  ['Filter B', 3, 1, 2, 'lane'],
  ['Fetching', 3, 4, 6, 'bar'],
  ['Accept', 3, 6, 7, 'bar em'],
  ['View', 4, 1, 2, 'lane'],
  ['Existing rows', 4, 2, 4, 'bar'],
  ['Loading', 4, 4, 6, 'bar'],
  ['New rows', 4, 6, 7, 'bar'],
]

function RequestTimeline() {
  return (
    <div
      className="table-timeline"
      role="img"
      aria-label="A background poll begins, a filter change starts and aborts the poll, and the new filter response is accepted."
    >
      {timeline.map(([label, lane, from, to, kind]) => (
        <div
          key={`${lane}-${from}`}
          className={kind}
          style={{ '--lane': lane, '--from': from, '--to': to } as CSSProperties}
        >
          {label}
        </div>
      ))}
    </div>
  )
}

function MockRows({ cells }: { cells: number }) {
  return (
    <>
      {[0, 1, 2, 3].map((row) => (
        <div key={row} className="table-mock-row">
          {Array.from({ length: cells }, (_, cell) => (
            <i key={cell} />
          ))}
        </div>
      ))}
    </>
  )
}

export default function TableCaseStudy() {
  return (
    <CaseStudy
      id="table-case"
      label="Case study · data interfaces"
      title="A workspace that survives its data"
      sources="Private codebase"
      status="Shared component"
      outcome={
        <>
          A configurable, server-driven grid that preserves the user&apos;s view as data, schema and
          requests change around it.
        </>
      }
      stations={[
        {
          title: 'Problem',
          content: (
            <>
              <p className="fp-project-case-lede">The view is not the data.</p>
              <p>
                A grid used for ongoing work has to do more than render the latest response. It has
                to preserve the view a user has built around that response.
              </p>
              <p>
                In an established financial platform, I worked on a shared data grid used by
                multiple screens. Their datasets differed, and the returned fields could change over
                time. Users could arrange, filter, sort and resize the columns, save different
                configurations, and continue working as fresh data arrived.
              </p>
              <p>
                A conventional fixed column definition would put the burden of adapting to each
                dataset on its host. Persisting the entire column model would introduce another
                problem: an old saved configuration could hide new fields or keep references to
                fields that no longer exist.
              </p>
              <blockquote className="state-pull">
                The data changes. The user&apos;s intent should survive wherever it still applies.
              </blockquote>
              <Cards items={problems} />
              <h4>Three decisions</h4>
              <Cards items={decisions} />
              <p className="figcap">
                All examples are synthetic. Diagrams describe general mechanisms, not the original
                application&apos;s data or internal interfaces.
              </p>
            </>
          ),
        },
        {
          title: 'Schema',
          content: (
            <>
              <p className="fp-project-case-lede">Let the data define the columns.</p>
              <p>
                The grid derives its column model from the keys and values in the returned rows.
                Value types and observed categorical values help determine the appropriate filter
                controls. Labels and known behaviour hints enrich the model without requiring a
                complete column definition from every host.
              </p>
              <p>
                The presentation settings are a separate concern: visibility, order, pinning, width,
                colour, filters and sorting. The grid reconciles these settings with the current
                schema by field key.
              </p>
              <figure className="state-figure">
                <Exhibit title="When the schema changes" kind="Illustrative" />
                <div className="table-schema">
                  {schemaColumns.map(({ tag, title, fields }) => (
                    <div key={tag}>
                      <span className="micro">{tag}</span>
                      <h4>{title}</h4>
                      {fields.map(([name, note, state]) => (
                        <div key={name} className={`table-field ${state}`}>
                          {name} {note && <small>{note}</small>}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
                <div className="table-merge-rule">
                  Matching key: session draft → saved preset → inferred defaults
                </div>
                <figcaption className="figcap">
                  Figure 02.1 / A removed field is omitted, a new field receives defaults, and
                  matching fields retain applicable preferences. A renamed field is a new identity
                  unless an explicit migration exists.
                </figcaption>
              </figure>
              <p>
                This lets compatible additions and removals in the response reach the grid without a
                dedicated frontend column-definition change. It does not make arbitrary schema
                changes transparent: renamed keys, incompatible value types and new domain-specific
                behaviour can still require work.
              </p>
              <TradeOff>
                <strong>
                  Runtime flexibility in exchange for weaker compile-time knowledge of the data.
                </strong>{' '}
                Inference must handle missing values, heterogeneous rows and ambiguous types. A key
                is a useful identity only while its meaning stays compatible.
              </TradeOff>
            </>
          ),
        },
        {
          title: 'Pipeline',
          content: (
            <>
              <p className="fp-project-case-lede">Refresh the rows, not the workspace.</p>
              <p>
                Data acquisition, saved transformations, temporary interactions and rendering are
                separate stages. A newly accepted response enters the same pipeline as the previous
                one; refresh code does not need to implement the user&apos;s filters and sorts
                itself.
              </p>
              <figure className="state-figure">
                <Exhibit title="Four stages, different inputs" kind="Conceptual pipeline" />
                <ol className="table-pipeline">
                  {stages.map(([title, output, inputs], index) => (
                    <li key={title}>
                      <span className="micro">{String(index + 1).padStart(2, '0')}</span>
                      <strong>{title}</strong>
                      <p>{output}</p>
                      <span className="table-input">{inputs}</span>
                    </li>
                  ))}
                </ol>
                <figcaption className="figcap">
                  Figure 02.2 / The stages are expressed as separate pieces of state. Changes can be
                  handled at the stage they affect rather than by rebuilding every part of the
                  workspace.
                </figcaption>
              </figure>
              <p>
                Server-side filters determine which records are requested. Local column filters
                refine that result: categorical selections are combined within a column, while
                active filters on different columns are combined with AND. Numeric and date filters
                use comparison operators. Free-text search adds a temporary refinement.
              </p>
              <p>
                Sorting also distinguishes durable intent from the current interaction. A header
                click establishes the primary ordering, the saved preset provides a secondary
                ordering, and pinned rows take precedence as a final partition. Row numbering
                follows the displayed order.
              </p>
              <p>
                Filter values are normalised into a fingerprint before they trigger a new request.
                This reduces unnecessary fetches caused by changes in object identity rather than
                changes in filter values.
              </p>
              <TradeOff>
                Keeping intermediate stages makes their dependencies easier to reason about, but it
                also requires disciplined invalidation, comparison and update ordering.
                Runtime-derived filters need explicit semantics for dates, missing values and
                changing field types.
              </TradeOff>
            </>
          ),
        },
        {
          title: 'Persistence',
          content: (
            <>
              <p className="fp-project-case-lede">Save intent at the right lifetime.</p>
              <p>
                A saved view should follow the user across sessions. A temporary variation should
                not necessarily follow them into another browser tab. A search term may only need to
                survive while the surrounding screen remains mounted.
              </p>
              <figure className="state-figure">
                <Exhibit title="Three scopes of preference" kind="Conceptual" />
                <div className="table-tiers">
                  {tiers.map(([title, text, lifetime]) => (
                    <div key={title}>
                      <b>{title}</b>
                      <p>{text}</p>
                      <span className="micro">{lifetime}</span>
                    </div>
                  ))}
                </div>
                <figcaption className="figcap">
                  Figure 02.3 / Different kinds of intent are stored according to how long they
                  should survive, rather than treating all UI state as either global or local.
                </figcaption>
              </figure>
              <p>
                The configuration editor works on a draft. Users can cancel, apply changes for the
                current session, or save a named preset. The active preset is held per browser tab,
                so independent tabs can maintain different selected views.
              </p>
              <p>
                Saving settings uses a read-merge-write cycle: retrieve the current settings, merge
                the intended change and write the result. Renaming a preset replaces the old entry
                with the new one in a single write.
              </p>
              <p>
                This reduces the risk of overwriting unrelated changes made elsewhere. It is not a
                transactional protocol: fully concurrent writers would need server-side version
                checks or equivalent coordination.
              </p>
            </>
          ),
        },
        {
          title: 'Requests',
          content: (
            <>
              <p className="fp-project-case-lede">Not every refresh deserves the same response.</p>
              <p>
                Requests can originate from a changed filter, a preset selection, a manual refresh
                or an automatic poll. These events have different user-facing meanings. A changed
                query may justify a blocking load, while routine polling should leave the existing
                rows visible.
              </p>
              <p>
                Each admitted request carries its own controller and identity. A higher-priority
                incoming request can cancel a lower-priority request through its abort signal. A
                request that is no longer current cannot publish its response or clear the current
                request&apos;s loading state.
              </p>
              <figure className="state-figure">
                <Exhibit title="A filter change interrupts a poll" kind="Illustrative sequence" />
                <RequestTimeline />
                <figcaption className="figcap">
                  Figure 02.4 / Higher-priority cancellation and current-request acceptance are
                  separate mechanisms. Cancellation is not relied upon as the sole protection
                  against out-of-order responses.
                </figcaption>
              </figure>
              <p>
                Automatic refresh follows request completion rather than blindly starting requests
                at fixed wall-clock intervals. The progress indicator pauses during loading and
                restarts afterward, limiting repeated polling while the current fetch is busy.
              </p>
              <p>
                Priorities govern cancellation of lower-priority work, while the most recent
                admitted request owns the response. That is not the same as a strict priority
                scheduler.
              </p>
              <TradeOff>
                Aborting an HTTP request does not guarantee the server stopped its work. Superseded
                responses still require an identity check, and loading, unmount and cancellation
                paths need consistent cleanup.
              </TradeOff>
            </>
          ),
        },
        {
          title: 'Rendering',
          content: (
            <>
              <p className="fp-project-case-lede">Make the changing view stable to use.</p>
              <p>
                The row window is virtualised so the DOM contains the visible rows and an overscan
                buffer rather than the entire result set. The grid still processes its loaded rows
                for local filtering and sorting; virtualisation reduces rendering work, not all
                data-processing cost.
              </p>
              <p>
                Column geometry is shared between the header and body. Pinned columns use a separate
                strip, horizontal scroll offsets are synchronised, and measured header widths are
                retained until new measurements become available.
              </p>
              <figure className="state-figure">
                <Exhibit title="A pinned region and a scrollable window" kind="Conceptual layout" />
                <div
                  className="table-viewport"
                  role="img"
                  aria-label="A fixed column strip and scrollable columns share the same row geometry."
                >
                  <div className="table-pinned">
                    <span className="micro">Pinned</span>
                    <MockRows cells={1} />
                  </div>
                  <div>
                    <span className="micro">Scrollable columns ↔</span>
                    <MockRows cells={4} />
                  </div>
                </div>
                <figcaption className="figcap">
                  Figure 02.5 / Conceptual arrangement of pinned and scrolling regions. Only a
                  window of rows is mounted.
                </figcaption>
              </figure>
              <p>
                During resizing, a lightweight preview follows the pointer and the final width is
                committed on release. During polling, structurally unchanged column configuration
                retains its existing references, avoiding some unnecessary column-dependent
                recalculations. Row data is replaced on an accepted poll instead of performing an
                expensive deep comparison of values expected to change.
              </p>
              <p>
                The grid also accommodates right-to-left interaction: column resizing follows the
                layout direction, the header and body maintain a shared scroll position, and search
                can match text typed using the wrong Persian or Latin keyboard layout.
              </p>
              <p>
                Host-specific cell actions are dispatched through named handlers rather than
                importing host screens into the grid. That keeps the reusable component independent
                of its hosts, at the cost of a naming convention both sides must respect.
              </p>
            </>
          ),
        },
        {
          title: 'Outcome',
          content: (
            <>
              <p className="fp-project-case-lede">
                A reusable workspace, not just a reusable table.
              </p>
              <div className="table-outcomes">
                {outcomes.map(([title, text]) => (
                  <article key={title}>
                    <h4>{title}</h4>
                    <p>{text}</p>
                  </article>
                ))}
              </div>
              <p>
                The abstraction evolved as new requirements appeared: persistent views, independent
                tab state, request cancellation, rendering refinements and more stable polling
                updates. Its scope grew because the grid had to coordinate data, user intent and
                interface geometry at the same time.
              </p>
              <div className="state-lesson">
                <span className="micro">Engineering lesson</span>
                <h4>Preserve the user&apos;s intent, not a snapshot of the interface.</h4>
                <p>
                  Separating the current data model, the saved view and the transient interaction
                  made it possible for the workspace to evolve without treating every incoming
                  response as a fresh interface.
                </p>
                <p>
                  The design is most useful when the schema and data change independently of how the
                  user chooses to work with them.
                </p>
                <p className="state-lesson-note">
                  These are descriptions of implemented mechanisms, not published performance
                  benchmarks or guarantees of correctness under every possible interleaving. The
                  original source and production measurements are private.
                </p>
              </div>
            </>
          ),
        },
      ]}
    />
  )
}

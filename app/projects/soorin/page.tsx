import Link from 'next/link'
import CaseStudy from '@/components/CaseStudy'
import DecisionRecord from '@/components/DecisionRecord'
import { genPageMetadata } from '../../seo'
import StateCaseStudy from './StateCaseStudy'
import './soorin.css'

export const metadata = genPageMetadata({
  title: 'Soorin',
  description:
    'Three financial products at three stages: improving a trading platform, taking over a mobile app, and starting a fund platform from an empty repository.',
})

const contents = [
  {
    label: 'Contribute',
    sections: [
      ['execution', 'Scripting runtime', '01'],
      ['trading', 'Trading workspace', '02'],
    ],
  },
  {
    label: 'Take over, then start',
    sections: [
      ['mobile', 'Mobile app', '03'],
      ['fund', 'Fund platform', '04'],
    ],
  },
  {
    label: 'Around the code',
    sections: [
      ['shipping', 'Shipping with others', '05'],
      ['forward', 'What carries forward', '06'],
    ],
  },
]

const arc = [
  [
    'Contribute',
    'Trading platform',
    'An established system, improved alongside another core engineer.',
  ],
  ['Take over', 'Mobile advisory app', 'An app already in users’ hands, inherited and extended.'],
  ['Start', 'Fund platform', 'A new product, built from an empty repository.'],
]

export default function SoorinPage() {
  return (
    <article className="soorin-dossier">
      <div className="crumbs micro">
        <span>
          <Link href="/projects">Projects</Link> <span className="crumb-divider">/</span>{' '}
          Professional engineering <span className="crumb-divider">/</span> Soorin
        </span>
        <span className="muted">Dossier / Commercial</span>
      </div>
      <section className="soorin-hero" aria-labelledby="soorin-title">
        <div className="hero-copy">
          <span className="eyebrow">01 / Professional engineering · 2023—2026</span>
          <h1 id="soorin-title">Soorin</h1>
          <p className="lead">Engineering financial systems under real production constraints.</p>
          <p className="lede">
            I worked on three financial products, each at a different stage. I improved an
            established trading platform, took over a mobile app that was already in use, and
            started a fund platform from an empty repository. This dossier follows the decisions
            each one asked for.
          </p>
        </div>
        <div className="hero-aside">
          <dl>
            <div>
              <dt>Organization</dt>
              <dd>
                <a
                  className="external"
                  href="https://soorin.capital/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Soorin, Financial Technology ↗
                </a>
              </dd>
            </div>
            <div>
              <dt>Position</dt>
              <dd>Front-End Engineer</dd>
            </div>
            <div>
              <dt>Employment</dt>
              <dd>Aug 2023 — Sep 2026</dd>
            </div>
            <div>
              <dt>Collaboration</dt>
              <dd>Product · Design · Backend</dd>
            </div>
          </dl>
        </div>
      </section>
      <ol className="arc" aria-label="Three products, three kinds of responsibility">
        {arc.map(([verb, product, line]) => (
          <li key={verb}>
            <strong>{verb}</strong>
            <span className="arc-product">{product}</span>
            <span className="arc-line">{line}</span>
          </li>
        ))}
      </ol>
      <aside className="dossier-note">
        <span className="eyebrow">On confidentiality</span>
        <p>
          The products are private. This dossier describes problems, constraints, and decisions. It
          leaves out source code, internal names, customer identities, financial logic, and figures.
          The diagrams are original and conceptual.
        </p>
      </aside>
      <nav className="fp-project-toc" aria-label="Dossier contents">
        {contents.map(({ label, sections }) => (
          <div key={label}>
            <h2>{label}</h2>
            <ol>
              {sections.map(([id, title, number]) => (
                <li key={id}>
                  <a href={`#${id}`}>
                    <span>{title}</span>
                    <span className="fp-project-toc-lead" aria-hidden="true" />
                    <span className="fp-project-toc-number">{number}</span>
                  </a>
                </li>
              ))}
            </ol>
          </div>
        ))}
      </nav>
      <div className="dossier-main">
        <section className="dossier-section" id="overview" aria-labelledby="overview-title">
          <div className="slabel">
            <span className="num" aria-hidden="true">
              00
            </span>
            <span className="eyebrow">Overview</span>
          </div>
          <h2 id="overview-title">Three products. Different problems.</h2>
          <p className="section-deck">
            Each codebase asked for a different kind of work: performance and dense data on the
            trading platform, reliability on the mobile app, and foundations on the fund platform.
          </p>
          <p>
            Most of my time went to the trading platform, where people run and monitor algorithmic
            strategies on stocks, bonds, and options. I worked there alongside another core frontend
            engineer and with backend, product, and design colleagues. Later I took over the
            company&apos;s mobile advisory app, and then I started the frontend of a new
            fund-operations product on my own.
          </p>
          <p className="aside-remark">
            Where a colleague built part of the work, the section says so. Nothing here claims sole
            ownership of a company platform.
          </p>
        </section>

        <section className="dossier-section" id="execution" aria-labelledby="execution-title">
          <div className="slabel">
            <span className="num" aria-hidden="true">
              01
            </span>
            <span className="eyebrow">Trading platform / Runtime</span>
          </div>
          <h2 id="execution-title">Fast enough, inside the rules.</h2>
          <p className="section-deck">
            Users write small scripts that screen and price options inside the platform. When those
            scripts became slow enough to block interactive work, making them fast was my job.
          </p>
          <p>
            The obvious answer was the fastest runtime. The right answer had to run in a browser,
            under a security policy that regulation kept fixed.
          </p>
          <CaseStudy
            id="runtime-case"
            label="Case study · runtime"
            title="Choosing a runtime for user scripts"
            sources="Private codebase"
            status="Shipped"
            outcome={
              <>
                Scripts run fast enough for interactive work, and the platform&apos;s security
                policy never had to be loosened.
              </>
            }
            stations={[
              {
                title: 'Problem',
                content: (
                  <>
                    <p className="fp-project-case-lede">
                      A script that takes seconds turns a live screen into a waiting room.
                    </p>
                    <p>
                      A colleague had integrated an interpreter that runs user scripts inside the
                      page. It was safe, but in the worst case it was slow, and traders felt it on
                      every refresh. I owned the speed problem from there.
                    </p>
                  </>
                ),
              },
              {
                title: 'Our overhead',
                content: (
                  <>
                    <p className="fp-project-case-lede">Start with the cost we added ourselves.</p>
                    <p>
                      Our integration rebuilt interpreters and helper functions around every run. I
                      reworked that lifecycle so the setup happened once and was reused. It helped,
                      but the interpreter itself was still the bottleneck. A real fix meant a
                      different runtime.
                    </p>
                  </>
                ),
              },
              {
                title: 'Options',
                content: (
                  <>
                    <p>
                      I evaluated alternatives and took the trade-offs to my senior colleague. For
                      the fastest one, a JavaScript engine compiled to WebAssembly, I built a
                      working prototype with memory and stack limits.
                    </p>
                    <div
                      className="fp-project-case-matrix"
                      role="table"
                      aria-label="Runtime candidates against speed and the security policy"
                    >
                      <div role="row" className="fp-project-case-matrix-head">
                        <span role="columnheader">Runtime</span>
                        <span role="columnheader">Worst-case speed</span>
                        <span role="columnheader">Deployed security policy</span>
                      </div>
                      <div role="row">
                        <span role="rowheader" className="fp-project-case-mode">
                          Original interpreter<small>the starting point</small>
                        </span>
                        <span
                          role="cell"
                          data-col="Worst-case speed"
                          className="fp-project-case-verdict is-no"
                        >
                          <b>Slow</b>Still blocked interactive work after our own fixes.
                        </span>
                        <span
                          role="cell"
                          data-col="Deployed security policy"
                          className="fp-project-case-verdict is-yes"
                        >
                          <b>Fits</b>Runs inside the page as it is.
                        </span>
                      </div>
                      <div role="row">
                        <span role="rowheader" className="fp-project-case-mode">
                          WebAssembly engine<small>my prototype</small>
                        </span>
                        <span
                          role="cell"
                          data-col="Worst-case speed"
                          className="fp-project-case-verdict is-yes"
                        >
                          <b>Fastest</b>The quickest candidate we tried.
                        </span>
                        <span
                          role="cell"
                          data-col="Deployed security policy"
                          className="fp-project-case-verdict is-no"
                        >
                          <b>Blocked</b>The policy does not permit compiling WebAssembly.
                        </span>
                      </div>
                      <div role="row">
                        <span
                          role="rowheader"
                          className="fp-project-case-mode fp-project-case-chosen"
                        >
                          In-page interpreter<small>chosen</small>
                        </span>
                        <span
                          role="cell"
                          data-col="Worst-case speed"
                          className="fp-project-case-verdict is-part"
                        >
                          <b>Fast enough</b>Interactive in the worst case.
                        </span>
                        <span
                          role="cell"
                          data-col="Deployed security policy"
                          className="fp-project-case-verdict is-yes"
                        >
                          <b>Fits</b>No change to the policy.
                        </span>
                      </div>
                    </div>
                  </>
                ),
              },
              {
                title: 'Decision',
                content: (
                  <>
                    <p className="fp-project-case-lede">
                      The prototype failed in the browser, not in the benchmark.
                    </p>
                    <p>
                      The deployed security policy did not permit the WebAssembly route, and
                      regulatory requirements kept that policy fixed. A faster runtime we could not
                      ship was not an option. We chose the interpreter that was fast enough under
                      the policy as it stood. My colleague integrated it, and I moved the
                      options-strategy scripts onto the new execution context.
                    </p>
                  </>
                ),
              },
              {
                title: 'Around it',
                content: (
                  <>
                    <p className="fp-project-case-lede">
                      A fast runtime still needs a good place to write code.
                    </p>
                    <ul>
                      <li>
                        An in-app editor with syntax highlighting and autocompletion for platform
                        functions. It loads only when opened.
                      </li>
                      <li>Invalid scripts are rejected at save time, before they can run.</li>
                      <li>
                        Scripts gained access to accounts and trade callbacks, so users could
                        automate more of their own workflow.
                      </li>
                      <li>The editor and the script helpers are covered by tests.</li>
                    </ul>
                  </>
                ),
              },
            ]}
          />
        </section>

        <section className="dossier-section" id="trading" aria-labelledby="trading-title">
          <div className="slabel">
            <span className="num" aria-hidden="true">
              02
            </span>
            <span className="eyebrow">Trading platform / Data and domain</span>
          </div>
          <h2 id="trading-title">Dense data. One usable interface.</h2>
          <p className="section-deck">
            A trading workspace becomes a data problem as soon as people need to filter, enrich,
            compare, and reshape a large set of live contracts.
          </p>
          <div className="chapters">
            <article>
              <h3>The information layer</h3>
              <p>
                I owned most of the configurable table that the trading and options views are built
                on. Users define their own columns, combine filters, set sort priority, resize and
                reorder headers, and save named presets to their account.
              </p>
            </article>
            <article>
              <h3>The domain layer</h3>
              <p>
                On top of it I built strategy analytics: payoff charts that span several expiry
                dates, calculators for common strategies such as covered calls, spreads, and
                butterflies, and pricing that includes trading fees and business days to maturity.
              </p>
            </article>
          </div>
          <div
            className="pipeline"
            role="img"
            aria-label="Conceptual workflow: contract data, enrichment, interactive filtering, configurable display. This is not actual Soorin architecture."
          >
            <div className="p-step">
              <span>Input</span>
              <b>Contract data</b>
              <span>Live instruments</span>
            </div>
            <div className="p-step">
              <span>Transformation</span>
              <b>Enrichment</b>
              <span>Information for decisions</span>
            </div>
            <div className="p-step">
              <span>Interaction</span>
              <b>Filtering</b>
              <span>Multiple options & criteria</span>
            </div>
            <div className="p-step">
              <span>Presentation</span>
              <b>Custom view</b>
              <span>User-defined columns</span>
            </div>
          </div>
          <p className="figcap">
            Figure 02 / Conceptual map of user-facing capabilities, not internal data flow.
          </p>
          <div className="bullet-head">
            <h3>Decisions</h3>
            <span className="micro muted">Open one for the problem and the outcome</span>
          </div>
          <div className="fp-project-records">
            <DecisionRecord
              id="T-01"
              title="Save what the user changed, not the whole table"
              choice="presets that store only the user's changes."
              cost="defaults and changes merge on every load."
            >
              <dl className="fp-project-decision-body">
                <dt>Problem</dt>
                <dd>
                  A preset saved as a full snapshot freezes the table as it was. New default columns
                  never reach users with older presets.
                </dd>
                <dt>Outcome</dt>
                <dd>
                  Saved presets keep the user&apos;s intent, and improvements to the defaults still
                  arrive.
                </dd>
              </dl>
            </DecisionRecord>
            <DecisionRecord
              id="T-02"
              title="The newest request that matters wins"
              choice="cancel lower-priority requests when a higher-priority one starts."
              cost="each request carries a priority to track."
            >
              <dl className="fp-project-decision-body">
                <dt>Problem</dt>
                <dd>
                  Filters, live refreshes, and saved settings all fetch the same data. A slow
                  response could land last and overwrite a fresher one.
                </dd>
                <dt>Outcome</dt>
                <dd>
                  Stale results no longer replace fresh ones. Later profiling passes kept
                  configuration references stable, and released observers closed a memory leak.
                </dd>
              </dl>
            </DecisionRecord>
          </div>
        </section>

        <section className="dossier-section" id="mobile" aria-labelledby="mobile-title">
          <div className="slabel">
            <span className="num" aria-hidden="true">
              03
            </span>
            <span className="eyebrow">Mobile app / Taking over</span>
          </div>
          <h2 id="mobile-title">Taking over a shipping app.</h2>
          <p className="section-deck">
            The company&apos;s investment-advisory app was already in users&apos; hands when I took
            over its frontend. The job was to extend it without making it less reliable.
          </p>
          <div className="fp-project-records">
            <DecisionRecord
              id="M-01"
              title="Keep data visible while it refreshes"
              choice="a shared query cache, using TanStack Query for server state."
              cost="migrating data access and managing cache freshness and invalidation."
            >
              <dl className="fp-project-decision-body">
                <dt>Problem</dt>
                <dd>
                  In the Ionic React app, returning to a screen could trigger another request and
                  replace its content with a loading indicator. People checking financial
                  information had to wait again for data they had already seen.
                </dd>
                <dt>Outcome</dt>
                <dd>
                  Previously fetched data could remain visible while a request refreshed it in the
                  background. Returning to a screen no longer needed to start with a blocking loader
                  when its data was still cached.
                </dd>
              </dl>
            </DecisionRecord>
          </div>
          <p>
            I added the two-factor sign-in flow, push notifications, in-app support with ticket
            attachments, a referral programme, subscription status, onboarding, and a risk
            questionnaire that suggests suitable advisers.
          </p>
        </section>

        <section className="dossier-section" id="fund" aria-labelledby="fund-title">
          <div className="slabel">
            <span className="num" aria-hidden="true">
              04
            </span>
            <span className="eyebrow">Fund platform / Greenfield</span>
          </div>
          <h2 id="fund-title">From an empty repository.</h2>
          <p className="section-deck">
            The newest product was a fund-operations platform. I started its frontend and was its
            only frontend engineer, with a colleague handling deployment.
          </p>
          <p>
            It covers the daily work of running funds: a dashboard for net asset value trends, asset
            allocation, and approval queues, per-fund pages, ticketing, user permissions, and data
            tables with export and print. It supports right-to-left layout, Persian and Gregorian
            calendars, and light and dark themes.
          </p>
          <div
            className="blackboard"
            role="img"
            aria-label="Conceptual diagram of three frontend foundations: typed client state, server data access, and reusable interface primitives. This is not an internal system map."
          >
            <div className="board-title">
              <span className="micro">Frontend foundations</span>
              <span className="micro">Conceptual separation</span>
            </div>
            <div className="architecture">
              <div className="node">
                <i>State</i>
                <b>Zustand stores</b>
                <p>Typed, with events, history, and persistence</p>
              </div>
              <div className="node">
                <i>Server data</i>
                <b>API client</b>
                <p>Caching and session refresh</p>
              </div>
              <div className="node">
                <i>Interface</i>
                <b>Component system</b>
                <p>Documented, right-to-left aware primitives</p>
              </div>
            </div>
          </div>
          <p className="figcap">
            Figure 04 / Capability groups, not the production component or dependency graph.
          </p>
          <StateCaseStudy />
          <div className="bullet-head">
            <h3>Decisions</h3>
            <span className="micro muted">Open one for the problem and the outcome</span>
          </div>
          <div className="fp-project-records">
            <DecisionRecord
              id="F-02"
              title="Pre-render the shell, keep static deployment"
              choice="pages pre-rendered at build time, with dynamic data loaded on the client."
              cost="live data requires client requests; the first client render must match the generated HTML."
            >
              <dl className="fp-project-decision-body">
                <dt>Problem</dt>
                <dd>
                  The platform was primarily data-driven, with forms, tables, and charts throughout
                  the interface. I initially considered request-time server rendering, but the
                  product needed to fit the static deployment model used by other applications.
                </dd>
                <dt>Outcome</dt>
                <dd>
                  The frontend could be served as static files without a request-time rendering
                  service. I designed the store layer with separate server snapshots to keep
                  hydration consistent when state depended on browser-only preferences.
                </dd>
              </dl>
            </DecisionRecord>
          </div>
          <p>
            Permission checks shape the interface; the backend still makes every authorization
            decision.
          </p>
          <div className="two-up">
            <article>
              <h3>Ready to hand over</h3>
              <p>
                I wrote the naming conventions, the folder structure, and the component docs, so the
                codebase does not depend on its author to explain it.
              </p>
            </article>
            <article>
              <h3>Quality from the start</h3>
              <p>
                Unit and end-to-end testing were set up early, and dependencies were patched when
                security advisories landed.
              </p>
            </article>
          </div>
        </section>

        <section className="dossier-section" id="shipping" aria-labelledby="shipping-title">
          <div className="slabel">
            <span className="num" aria-hidden="true">
              05
            </span>
            <span className="eyebrow">Collaboration / Delivery</span>
          </div>
          <h2 id="shipping-title">Shipping with other people.</h2>
          <p className="section-deck">
            Code is only part of delivery. The rest is making the work usable by the people who
            depend on it: colleagues, customers, and whoever maintains it next.
          </p>
          <ul className="small-list">
            <li>
              <span>Customer edition</span>
              <span>
                Delivered a customer-specific edition of the trading platform. I removed the modules
                outside the customer&apos;s scope, with their routes, API calls, and shared state,
                and restyled the rest from the customer&apos;s own designs.
              </span>
            </li>
            <li>
              <span>API documentation</span>
              <span>
                Wrote the API documentation that colleagues and customers worked from, published as
                a page inside the platform.
              </span>
            </li>
            <li>
              <span>Testing</span>
              <span>
                Set up the trading platform&apos;s unit-test harness and wrote tests for the script
                editor, inputs, and data-table cells.
              </span>
            </li>
            <li>
              <span>Teamwork</span>
              <span>
                Turned product requirements into modular features with backend, product, and design
                colleagues, and with a customer&apos;s design files when the work was for them.
              </span>
            </li>
          </ul>
        </section>

        <section className="dossier-section" id="forward" aria-labelledby="forward-title">
          <div className="slabel">
            <span className="num" aria-hidden="true">
              06
            </span>
            <span className="eyebrow">Retrospective</span>
          </div>
          <h2 id="forward-title">What carries forward.</h2>
          <ul className="small-list">
            <li>
              <span>Constraints first</span>
              <span>
                Check where a solution must run before measuring how fast it is. The runtime
                decision turned on policy, not speed.
              </span>
            </li>
            <li>
              <span>Store intent</span>
              <span>
                Save what the user changed, not a snapshot of everything, so defaults can improve
                without breaking saved work.
              </span>
            </li>
            <li>
              <span>Draw the boundary</span>
              <span>
                Let the interface reflect permissions, and leave authority with the backend.
              </span>
            </li>
          </ul>
        </section>
      </div>
      <aside className="dossier-next">
        <div>
          <span className="eyebrow">End of dossier / Soorin</span>
          <h2>More engineering work.</h2>
          <p>
            Independent projects with open source, public demos, and deeper implementation details.
          </p>
        </div>
        <Link href="/projects#independent">Back to projects ↗</Link>
      </aside>
    </article>
  )
}

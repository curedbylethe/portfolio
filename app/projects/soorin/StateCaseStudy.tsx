import CaseStudy from '@/components/CaseStudy'

const problems = [
  [
    'A / Contracts',
    'Types were implicit.',
    'Understanding an object’s shape could require tracing its origin across files, inspecting a network response, and checking for intermediate transformations. I added JSDoc, but documentation alone could not enforce those contracts.',
  ],
  [
    'B / Subscriptions',
    'Granularity was costly.',
    'Frequently changing values in broad contexts could trigger updates in consumers that only needed a subset. Splitting contexts narrowed the scope, but introduced more providers and more boundaries to manage.',
  ],
  [
    'C / Hierarchy',
    'Placement became a constraint.',
    'Sharing a value meant choosing a common ancestor or passing it down through intermediate components. The rendering hierarchy began to influence decisions that should have followed the domain.',
  ],
]

const storeLayer = [
  ['Typed contracts', 'A consistent store interface, with state and actions declared explicitly.'],
  [
    'Domain behaviour',
    'Feature-specific operations belong with the state they manage rather than being scattered through the components that consume it.',
  ],
  [
    'Shared capabilities',
    'Event subscriptions, state history, and persistence are available through the common foundation when needed.',
  ],
  [
    'Extension',
    'Individual stores customize the pattern to meet their own requirements without establishing a different state-management convention for every feature.',
  ],
]

const rootLifecycle = [
  [
    'Instance ownership',
    'Create a store for each mounted root, preserve its identity across renders, and take responsibility for disposing of instance-owned resources when the root unmounts.',
  ],
  [
    'Controlled state',
    'When a value is controlled by the consumer, the external value remains authoritative. The root coordinates the store with that value and its change callback.',
  ],
  [
    'Uncontrolled state',
    'Initialize from defaults when supplied, and let the instance’s store manage subsequent changes internally.',
  ],
  [
    'Stable callbacks',
    'Keep callback references current without replacing the store or unnecessarily changing action identities when callback props change.',
  ],
  [
    'Non-reactive references',
    'Keep imperative references in the store’s non-reactive context rather than treating every reference as renderable state. Changing such a reference does not itself notify state subscribers.',
  ],
  [
    'Scoped access',
    'Expose the store instance through React Context. Descendants use typed selectors and actions instead of receiving the root’s internal state through a chain of props.',
  ],
]

function Rows({ rows }: { rows: string[][] }) {
  return (
    <dl className="state-rows">
      {rows.map(([term, detail]) => (
        <div key={term}>
          <dt>{term}</dt>
          <dd>{detail}</dd>
        </div>
      ))}
    </dl>
  )
}

function Principle({ title, children }: { title: string; children: string }) {
  return (
    <div className="state-principle">
      <span className="eyebrow">Design principle</span>
      <p>
        <strong>{title}</strong> {children}
      </p>
    </div>
  )
}

function ContextDiagram() {
  return (
    <svg viewBox="10 0 320 256" role="img" aria-labelledby="state-before-title state-before-desc">
      <title id="state-before-title">Context-based sharing across distant subtrees</title>
      <desc id="state-before-desc">
        A shared context provider above two separate branches of a React tree makes the same state
        available to Component A and Component B, even though the intermediate components do not
        consume it.
      </desc>
      <path
        className="edge"
        d="M170 36 V50 M170 80 V98 H82 V115 M170 98 H258 V115 M82 145 V162 M258 145 V162 M82 192 V207 M258 192 V207"
      />
      <rect className="node" x="102" y="7" width="136" height="29" rx="3" />
      <text className="lab" x="170" y="25" textAnchor="middle">
        Common ancestor
      </text>
      <rect className="em" x="86" y="50" width="168" height="30" rx="3" />
      <text className="lab" x="170" y="63" textAnchor="middle">
        Shared state provider
      </text>
      <text className="sm" x="170" y="74" textAnchor="middle">
        Covers both branches
      </text>
      <rect className="node" x="19" y="115" width="126" height="30" rx="3" />
      <rect className="node" x="195" y="115" width="126" height="30" rx="3" />
      <text x="82" y="133" textAnchor="middle">
        Subtree A
      </text>
      <text x="258" y="133" textAnchor="middle">
        Subtree B
      </text>
      <rect className="node" x="19" y="162" width="126" height="30" rx="3" />
      <rect className="node" x="195" y="162" width="126" height="30" rx="3" />
      <text x="82" y="175" textAnchor="middle">
        Intermediate layer
      </text>
      <text className="sm" x="82" y="186" textAnchor="middle">
        Does not consume state
      </text>
      <text x="258" y="175" textAnchor="middle">
        Intermediate layer
      </text>
      <text className="sm" x="258" y="186" textAnchor="middle">
        Does not consume state
      </text>
      <rect className="em" x="19" y="207" width="126" height="34" rx="3" />
      <rect className="em" x="195" y="207" width="126" height="34" rx="3" />
      <text className="lab" x="82" y="220" textAnchor="middle">
        Component A
      </text>
      <text className="sm" x="82" y="232" textAnchor="middle">
        Updates value
      </text>
      <text className="lab" x="258" y="220" textAnchor="middle">
        Component B
      </text>
      <text className="sm" x="258" y="232" textAnchor="middle">
        Consumes value
      </text>
    </svg>
  )
}

function StoreDiagram() {
  return (
    <svg viewBox="10 0 320 256" role="img" aria-labelledby="state-after-title state-after-desc">
      <title id="state-after-title">Independent store-based sharing across distant subtrees</title>
      <desc id="state-after-desc">
        Two independent component branches keep their rendering hierarchy. Component A updates an
        external shared store and Component B subscribes to a selected value without a common state
        provider.
      </desc>
      <path className="edge" d="M82 37 V52 M258 37 V52 M82 82 V97 M258 82 V97" />
      <rect className="node" x="19" y="7" width="126" height="30" rx="3" />
      <rect className="node" x="195" y="7" width="126" height="30" rx="3" />
      <text x="82" y="25" textAnchor="middle">
        Subtree A
      </text>
      <text x="258" y="25" textAnchor="middle">
        Subtree B
      </text>
      <rect className="node" x="19" y="52" width="126" height="30" rx="3" />
      <rect className="node" x="195" y="52" width="126" height="30" rx="3" />
      <text x="82" y="70" textAnchor="middle">
        Intermediate layer
      </text>
      <text x="258" y="70" textAnchor="middle">
        Intermediate layer
      </text>
      <rect className="em" x="19" y="97" width="126" height="34" rx="3" />
      <rect className="em" x="195" y="97" width="126" height="34" rx="3" />
      <text className="lab" x="82" y="110" textAnchor="middle">
        Component A
      </text>
      <text className="sm" x="82" y="122" textAnchor="middle">
        Updates value
      </text>
      <text className="lab" x="258" y="110" textAnchor="middle">
        Component B
      </text>
      <text className="sm" x="258" y="122" textAnchor="middle">
        Consumes value
      </text>
      <path className="flow" d="M82 131 V161 H129 V184 M211 184 V161 H258 V131" />
      <text className="sm" x="72" y="150" textAnchor="end">
        Action
      </text>
      <text className="sm" x="268" y="150">
        Selector
      </text>
      <path className="arrow" d="M125 178 L129 184 L133 178 M254 137 L258 131 L262 137" />
      <rect className="em" x="83" y="184" width="174" height="37" rx="3" />
      <text className="lab" x="170" y="199" textAnchor="middle">
        Shared external store
      </text>
      <text className="sm" x="170" y="212" textAnchor="middle">
        Typed state + actions
      </text>
      <text className="sm" x="170" y="242" textAnchor="middle">
        State access independent of rendering hierarchy
      </text>
    </svg>
  )
}

function Instance({ name, note }: { name: string; note: string }) {
  return (
    <div className="state-instance">
      <div className="state-instance-head">
        <strong>Root {name}</strong>
        <span className="micro">Instance {name}</span>
      </div>
      <div className="state-store">
        <strong>Vanilla store {name}</strong>
        <small>State · actions · non-reactive refs</small>
      </div>
      <div className="state-connector">Provides store reference</div>
      <div className="state-context">
        <strong>React Context {name}</strong>
        <small>Instance-scoped access</small>
      </div>
      <div className="state-connector">Consume · select · act</div>
      <div className="state-parts">
        <span>Part A</span>
        <span>Part B</span>
        <span>Part C</span>
      </div>
      <p>{note}</p>
    </div>
  )
}

export default function StateCaseStudy() {
  return (
    <CaseStudy
      id="state-case"
      label="Case study · state architecture"
      title="State beyond the component tree"
      sources="Private codebase"
      status="App-wide"
      outcome={
        <>
          New shared state no longer needs an application-wide provider. Domain stores and
          per-instance UI stores share one typed foundation.
        </>
      }
      stations={[
        {
          title: 'Context',
          content: (
            <>
              <p className="fp-project-case-lede">Related state, unrelated component trees.</p>
              <p>
                As the trading platform grew, more components needed to read and update shared
                state, even when they belonged to entirely different branches of the interface.
              </p>
              <p>
                Consider two components in distant subtrees. An interaction in one changes a value
                that the other depends on. Neither component owns the other, and the components
                between them have no reason to know about that value. With props, state must be
                lifted to a common ancestor and passed through the intervening layers; with Context,
                a provider must cover both consumers. Either approach can make the placement of
                shared state depend on the structure of the interface rather than the responsibility
                of the state itself.
              </p>
              <p>
                React Context carried much of the shared state. As the product grew, so did the work
                required to decide where that state belonged and how it should reach the components
                that needed it. Our central provider file grew to hundreds of lines.
              </p>
              <blockquote className="state-pull">
                The relationship between two features in a product is not always a relationship
                between two components in its rendering tree.
              </blockquote>
            </>
          ),
        },
        {
          title: 'Problem',
          content: (
            <>
              <p className="fp-project-case-lede">Three problems, reinforcing each other.</p>
              <p>
                Introducing a new feature meant working out which existing context to extend,
                whether to introduce another provider, and where it needed to sit in the tree. The
                costs were not just in runtime performance, but in the decisions required to change
                the code.
              </p>
              <div className="state-problems">
                {problems.map(([tag, title, text]) => (
                  <article key={tag}>
                    <span className="micro">{tag}</span>
                    <h4>{title}</h4>
                    <p>{text}</p>
                  </article>
                ))}
              </div>
            </>
          ),
        },
        {
          title: 'Decision',
          content: (
            <>
              <p className="fp-project-case-lede">Let the domain determine where state lives.</p>
              <p>
                When I started the frontend of the fund platform, I chose TypeScript and
                Zustand&apos;s vanilla core. The aim was to address the problems we had encountered
                on the trading platform, rather than carry the same patterns into a new product.
              </p>
              <p>
                TypeScript made the shape of state and its operations explicit at development time.
                Zustand allowed stores to exist independently of React, with components subscribing
                to the state they actually needed. A shared feature no longer required a new
                application-wide provider simply to make its state accessible. For state that did
                belong to a particular UI instance, Context still had a useful role: supplying that
                instance’s store, rather than carrying its changing state.
              </p>
              <figure className="state-figure">
                <div className="fp-project-exhibit-bar">
                  <span>Two approaches to shared state</span>
                  <span>Conceptual</span>
                </div>
                <div className="state-compare">
                  <div>
                    <span className="micro">A / Context-based sharing</span>
                    <ContextDiagram />
                    <p>
                      Context avoids passing props through intermediate components, but both
                      consumers must belong to a suitable provider&apos;s subtree. Sharing across
                      distant branches can push providers higher in the hierarchy.
                    </p>
                  </div>
                  <div>
                    <span className="micro">B / Store-based sharing</span>
                    <StoreDiagram />
                    <p>
                      Both components can access the same external store instance regardless of
                      their position in the tree. The component that reads state can subscribe to
                      the specific value it needs.
                    </p>
                  </div>
                </div>
                <figcaption className="figcap">
                  Figure 04.1 / A generic comparison of two components in distant subtrees sharing a
                  value. Neither diagram represents production architecture. The fund platform was a
                  separate product, not a migration of the trading platform.
                </figcaption>
              </figure>
              <Principle title="Choose state scope according to its responsibility and lifetime.">
                A feature can own a shared store, while a reusable UI primitive can own a separate
                store for each mounted instance. The scope follows the responsibility and lifetime
                of the state, not the convenience of placing a provider.
              </Principle>
            </>
          ),
        },
        {
          title: 'Store layer',
          content: (
            <>
              <p className="fp-project-case-lede">
                The library was a mechanism, not the architecture.
              </p>
              <p>
                Zustand gave me the state management mechanism. I built a typed abstraction over its
                vanilla core to establish the conventions the fund platform needed, rather than
                making each feature reinvent them.
              </p>
              <p>
                Financial workflows have their own rules and operations. I wanted stores to hold not
                only their state, but also the actions that act on that state. A store&apos;s
                consumers could work with its domain-specific interface instead of reproducing the
                same logic in different components. I used an object-oriented approach to make the
                common store pattern extensible while allowing individual stores to define their own
                behaviour.
              </p>
              <Rows rows={storeLayer} />
              <p>
                I documented the store layer as part of the frontend foundations, so a future
                contributor would have a pattern to follow rather than another provider hierarchy to
                reverse-engineer.
              </p>
            </>
          ),
        },
        {
          title: 'Primitives',
          content: (
            <>
              <p className="fp-project-case-lede">Context for identity, stores for state.</p>
              <p>
                The same architecture informed the reusable UI library. Shared application state and
                the state of a single component instance had different lifetimes, but did not need
                different state-management mechanisms.
              </p>
              <p>
                I designed the stateful primitives as composable component families, with a{' '}
                <code>Root</code> responsible for their behaviour. Rather than distributing internal
                state across individual subcomponents, the root creates and owns a vanilla store
                instance. Each mounted root has its own store, so two instances of the same
                primitive can operate independently.
              </p>
              <p>
                React Context remained part of the design. Its purpose changed: instead of passing a
                changing object of state and callbacks, the root supplies the store instance through
                Context. Descendants retrieve that instance and subscribe to the state they need.
                The provider can retain the same identity as state changes; Context establishes the
                scope, while the store handles reactive subscriptions.
              </p>
              <figure className="state-figure">
                <div className="fp-project-exhibit-bar">
                  <span>One component family, two independent instances</span>
                  <span>Conceptual</span>
                </div>
                <div
                  className="state-instances"
                  role="img"
                  aria-label="Two independent roots, each owning its own vanilla store and exposing it through context to three composable children"
                >
                  <Instance
                    name="A"
                    note="The root owns initialization, synchronization and cleanup."
                  />
                  <Instance
                    name="B"
                    note="The same component API, with a separate state lifetime."
                  />
                </div>
                <figcaption className="figcap">
                  Figure 04.2 / Generic illustration of the instance-scoped pattern. Context carries
                  a store reference, not a changing state snapshot. State is not shared between
                  these two roots unless explicitly coordinated by their consumers.
                </figcaption>
              </figure>
              <h4>The root owns the lifecycle.</h4>
              <p>
                The root translates the public component API into the internal store contract. The
                subcomponents do not need to know how the component was configured, whether its
                state is controlled, or where a callback came from.
              </p>
              <Rows rows={rootLifecycle} />
            </>
          ),
        },
        {
          title: 'Public API',
          content: (
            <>
              <p className="fp-project-case-lede">Composition without a closed styling API.</p>
              <p>
                The public API followed a Radix-like compound-component pattern: consumers assemble
                a root and its constituent parts rather than configure one monolithic component.
                Each part exposes the applicable native element attributes, including accessibility
                attributes, inline styles and class names, while retaining its own behavioural
                contract.
              </p>
              <p>
                For state-dependent styling, <code>className</code> can be either a string or a
                function that receives the subcomponent&apos;s typed state. Consumers can express
                visual variations directly, without needing the root to expose another styling prop
                or having to infer state from the DOM.
              </p>
              <figure className="fp-project-case-code">
                <figcaption>
                  <span>Illustrative API · not production code</span>
                  <span>tsx</span>
                </figcaption>
                <pre>
                  <code>
                    <span>{'<Primitive.Root>'}</span>
                    {`
  <Primitive.Trigger aria-label="Toggle panel" />
  <Primitive.Content
    className={(state) =>
      state.open ? 'panel panel-open' : 'panel'
    }
    style={{ maxWidth: 320 }}
  />
`}
                    <span>{'</Primitive.Root>'}</span>
                  </code>
                </pre>
              </figure>
              <p className="figcap">
                A fictional primitive and state shape illustrate the public contract. The actual
                native attributes and typed state depend on the subcomponent.
              </p>
              <p>
                Strict TypeScript types make that extension point discoverable: the consumer can see
                which state the styling function receives and which attributes the underlying
                element accepts. Internal coordination remains behind the component family’s API.
                Native attributes still need to coexist with the primitive&apos;s accessibility and
                event-handling invariants.
              </p>
              <Principle title="Encapsulate behaviour, not the consumer’s ability to compose.">
                The root manages the state contract and lifetime; parts own their rendering and
                interaction surfaces. Context scopes the instance, selectors determine which state
                changes a part observes, and the public API remains customizable.
              </Principle>
            </>
          ),
        },
        {
          title: 'Outcome',
          content: (
            <>
              <p className="fp-project-case-lede">
                Less incidental coupling. Clearer responsibilities.
              </p>
              <p>
                New shared state could be introduced without adding another application-wide
                provider. Components could access the relevant store directly and subscribe to a
                selected part of its state. Store types and actions gave the frontend an explicit
                place to look for the shape and behaviour of a feature&apos;s state.
              </p>
              <p>
                The improvement was architectural: fewer decisions about application-wide provider
                placement, more consistent store interfaces, and a reusable way to implement common
                state-management concerns. In the UI library, the same mechanism provided isolated
                component instances, centralized behaviour and a typed, composable public API
                without extensive internal prop threading.
              </p>
              <div className="state-cost">
                <span className="eyebrow">What this costs</span>
                <h4>The complexity does not disappear.</h4>
                <p>
                  Independent stores still require deliberate ownership, lifetime management, and
                  care around dependencies between stores. Instance-scoped stores also add
                  initialization, controlled-value synchronization, callback freshness and cleanup
                  responsibilities. The custom abstraction is another layer to document and
                  maintain. Selective subscriptions limit updates from unrelated store values; they
                  do not prevent all React re-renders. React Context remains useful for scoped
                  dependencies, and simple local component state is still appropriate where an
                  external store would add unnecessary machinery. TypeScript improves
                  development-time contracts, but it does not validate untrusted API data or
                  guarantee financial correctness at runtime.
                </p>
              </div>
              <div className="state-lesson">
                <span className="micro">Retrospective / The transferable lesson</span>
                <h4>Start with the constraints you already know.</h4>
                <p>
                  Maintaining the trading platform showed me where our state architecture made
                  change expensive. Starting the fund platform gave me the opportunity to choose a
                  different foundation. The decision was not to replace React Context everywhere. It
                  was to distinguish shared application state from instance-owned UI state, and to
                  use the rendering hierarchy where it expressed a meaningful ownership boundary
                  rather than as the default organizing principle for every shared value.
                </p>
                <p className="state-lesson-note">
                  This case study describes the architectural outcome. It does not claim a measured
                  rendering-speed improvement or a comparative benchmark between the two products.
                </p>
              </div>
            </>
          ),
        },
      ]}
    />
  )
}

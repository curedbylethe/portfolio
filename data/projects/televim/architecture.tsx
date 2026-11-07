import type { BoardEvidence, FlowBoardData } from '@/components/flow-board'

const BLOB = 'https://github.com/curedbylethe/televim/blob/main/crates'

const documented = (label?: string, url?: string): BoardEvidence[] => [
  { status: 'documented', label, url },
]
const inferred = (label?: string, url?: string): BoardEvidence[] => [
  { status: 'inferred', label, url },
]
const fromArchitectureDoc = documented('docs/architecture.md')

/**
 * Televim crate map and four observed behaviours.
 * Edges are crate dependencies, not calls. A step names an edge only when it crosses that
 * dependency between two crates; the board never derives edges from step order.
 */
export const televimArchitecture: FlowBoardData = {
  id: 'televim-crates',
  title: 'Televim crate map',
  source: { label: 'docs/architecture.md' },

  nodeKinds: {
    crate: { label: 'Crate' },
    external: { label: 'External', stroke: 'dashed' },
  },
  edgeKinds: {
    'depends-on': {
      label: 'Depends on',
      description: 'Points from a crate to a crate it depends on. Not a call.',
    },
  },

  // Positions and routes reproduce the 1000 × 600 drawing from the dossier design.
  nodes: [
    {
      id: 'app',
      kind: 'crate',
      label: 'app',
      subtitle: 'composition root',
      position: { x: 380, y: 30 },
      size: { width: 240, height: 64 },
      details: [
        {
          label: 'Responsibility',
          content: (
            <>
              Wires the async runtime, the protocol client, the domain state and the TUI event loop.
              Binary only; returns <code>anyhow::Result</code>.
            </>
          ),
        },
        {
          label: 'Depends on',
          content: (
            <>
              <code>proto</code>, <code>telegram-framework</code>, <code>domain</code>,{' '}
              <code>tui</code>, plus <code>tokio</code>, <code>clap</code>, <code>config</code>,{' '}
              <code>tracing</code>.
            </>
          ),
        },
        {
          label: 'Why here',
          content: (
            <>
              It is the only crate that can hold a framework client and a <code>ProtoClient</code>{' '}
              at once, so the integration tests live in it.
            </>
          ),
        },
      ],
    },
    {
      id: 'tui',
      kind: 'crate',
      label: 'tui',
      subtitle: 'terminal UI',
      position: { x: 80, y: 200 },
      size: { width: 240, height: 64 },
      details: [
        {
          label: 'Responsibility',
          content: (
            <>
              <code>ratatui</code> widgets and <code>crossterm</code> input. Owns text wrapping and
              row layout, including bidi and grapheme handling.
            </>
          ),
        },
        {
          label: 'Depends on',
          content: (
            <>
              <code>domain</code>, <code>ratatui</code>, <code>crossterm</code>,{' '}
              <code>vim-line</code>, the <code>unicode-*</code> crates. Not <code>proto</code>, not{' '}
              <code>telegram-framework</code>.
            </>
          ),
        },
        {
          label: 'Why here',
          content: (
            <>
              The screen can be tested with <code>TestBackend</code> and golden frames without a
              network or a protocol type in sight.
            </>
          ),
        },
      ],
    },
    {
      id: 'proto',
      kind: 'crate',
      label: 'proto',
      subtitle: 'adapter',
      position: { x: 680, y: 200 },
      size: { width: 240, height: 64 },
      details: [
        {
          label: 'Responsibility',
          content: (
            <>
              A thin translation layer: maps <code>telegram-framework</code> types into{' '}
              <code>domain</code> types.
            </>
          ),
        },
        {
          label: 'Depends on',
          content: (
            <>
              <code>domain</code>, <code>telegram-framework</code>, <code>thiserror</code>,{' '}
              <code>tracing</code>.
            </>
          ),
        },
        {
          label: 'Why here',
          content: (
            <>
              It must not expose a <code>grammers</code> or framework type to <code>domain</code> or{' '}
              <code>tui</code>; translation happens once, in one place.
            </>
          ),
        },
      ],
    },
    {
      id: 'domain',
      kind: 'crate',
      label: 'domain',
      subtitle: 'pure logic',
      note: 'no tokio · no ratatui · no grammers',
      position: { x: 80, y: 380 },
      size: { width: 240, height: 64 },
      details: [
        {
          label: 'Responsibility',
          content:
            'Chats, messages, sessions. The real rules: the conversation window, search, the update vocabulary, Vim motions.',
        },
        {
          label: 'Depends on',
          content: (
            <>
              <code>thiserror</code>. Nothing else.
            </>
          ),
        },
        {
          label: 'Why here',
          content:
            'No async, no UI, no protocol, so its rules are testable as plain functions, with property tests over the window.',
        },
      ],
    },
    {
      id: 'telegram-framework',
      kind: 'crate',
      label: 'telegram-framework',
      subtitle: 'protocol wrapper',
      groupId: 'boundary',
      position: { x: 680, y: 380 },
      size: { width: 240, height: 64 },
      details: [
        {
          label: 'Responsibility',
          content: (
            <>
              A first-party wrapper over <code>grammers-client</code>: login (phone, code, 2FA),
              pluggable session stores, and an update stream filtered to private conversations.
            </>
          ),
        },
        {
          label: 'Depends on',
          content: (
            <>
              <code>tokio</code>, <code>serde</code>, <code>keyring</code>, <code>aes-gcm-siv</code>
              , <code>argon2</code>; the <code>grammers-*</code> crates behind the <code>live</code>{' '}
              feature.
            </>
          ),
        },
        {
          label: 'Why here',
          content:
            'Groups, channels and bots are filtered out before an update reaches the caller. See D-01 and D-03.',
        },
      ],
    },
    {
      id: 'grammers',
      kind: 'external',
      label: 'grammers',
      subtitle: 'external',
      eyebrow: 'External · crates.io',
      groupId: 'boundary',
      position: { x: 720, y: 510 },
      size: { width: 160, height: 52 },
      details: [
        { label: 'Responsibility', content: 'The MTProto client library Televim builds on.' },
        {
          label: 'Seen by',
          content: (
            <>
              <code>telegram-framework</code> only. <code>make boundary</code> fails the build if
              any other crate names it.
            </>
          ),
        },
      ],
    },
  ],

  groups: [
    { id: 'boundary', label: 'boundary · make boundary', description: 'Checked by make boundary.' },
  ],

  edges: [
    {
      id: 'app-tui',
      source: 'app',
      target: 'tui',
      kind: 'depends-on',
      points: [
        { x: 440, y: 94 },
        { x: 250, y: 196 },
      ],
      evidence: fromArchitectureDoc,
    },
    {
      id: 'app-proto',
      source: 'app',
      target: 'proto',
      kind: 'depends-on',
      points: [
        { x: 560, y: 94 },
        { x: 750, y: 196 },
      ],
      evidence: fromArchitectureDoc,
    },
    {
      id: 'app-domain',
      source: 'app',
      target: 'domain',
      kind: 'depends-on',
      points: [
        { x: 380, y: 62 },
        { x: 40, y: 62 },
        { x: 40, y: 412 },
        { x: 76, y: 412 },
      ],
      evidence: fromArchitectureDoc,
    },
    {
      id: 'app-telegram-framework',
      source: 'app',
      target: 'telegram-framework',
      kind: 'depends-on',
      points: [
        { x: 620, y: 62 },
        { x: 985, y: 62 },
        { x: 985, y: 412 },
        { x: 924, y: 412 },
      ],
      evidence: fromArchitectureDoc,
    },
    {
      id: 'tui-domain',
      source: 'tui',
      target: 'domain',
      kind: 'depends-on',
      points: [
        { x: 200, y: 264 },
        { x: 200, y: 376 },
      ],
      evidence: fromArchitectureDoc,
    },
    {
      id: 'proto-domain',
      source: 'proto',
      target: 'domain',
      kind: 'depends-on',
      points: [
        { x: 700, y: 264 },
        { x: 324, y: 384 },
      ],
      evidence: fromArchitectureDoc,
    },
    {
      id: 'proto-telegram-framework',
      source: 'proto',
      target: 'telegram-framework',
      kind: 'depends-on',
      points: [
        { x: 820, y: 264 },
        { x: 820, y: 376 },
      ],
      evidence: fromArchitectureDoc,
    },
    {
      id: 'telegram-framework-grammers',
      source: 'telegram-framework',
      target: 'grammers',
      kind: 'depends-on',
      points: [
        { x: 820, y: 444 },
        { x: 820, y: 506 },
      ],
      evidence: fromArchitectureDoc,
    },
  ],

  traces: [
    {
      id: 'move',
      label: 'Move the highlight',
      title: 'Move the highlight in the chat list',
      trigger: 'j',
      steps: [
        {
          id: 'read-key',
          nodeId: 'app',
          description:
            'The event loop. A reader thread blocks until the terminal delivers the key.',
          evidence: documented('runtime.rs', `${BLOB}/app/src/runtime.rs`),
        },
        {
          id: 'map-key',
          nodeId: 'tui',
          edgeIds: ['app-tui'],
          description: (
            <>
              Maps the key event to an action, for context-free keys only. <kbd>Ctrl-C</kbd> is
              answered here, before anything else.
            </>
          ),
          evidence: documented('event.rs', `${BLOB}/tui/src/event.rs`),
        },
        {
          id: 'dispatch',
          nodeId: 'tui',
          description: (
            <>
              <code>handle_key</code> dispatches by focus first, then mode.
            </>
          ),
          evidence: documented('state/coordinate.rs', `${BLOB}/tui/src/state/coordinate.rs`),
        },
        {
          id: 'cursor',
          nodeId: 'tui',
          description: 'The chat list owns its selection cursor. The highlight moves.',
          evidence: documented('state/chat_list.rs', `${BLOB}/tui/src/state/chat_list.rs`),
        },
        {
          id: 'profile-card',
          nodeId: 'app',
          edgeIds: ['app-tui'],
          description: (
            <>
              When the highlight settles, <code>net::drive</code> opens the chat’s profile card in
              the conversation’s rectangle and restores focus.
            </>
          ),
          evidence: documented('net.rs', `${BLOB}/app/src/net.rs`),
        },
      ],
      constraint: {
        label: 'Constraint',
        content:
          'Key to drawn frame within 16 ms. Measured: 0.132 ms on the shipped binary, with the terminal’s own read and paint outside the probe.',
      },
    },
    {
      id: 'send',
      label: 'Send a message',
      trigger: 'Enter',
      steps: [
        {
          id: 'read-key',
          nodeId: 'app',
          description: (
            <>
              The event loop receives <kbd>Enter</kbd>.
            </>
          ),
          evidence: documented('runtime.rs', `${BLOB}/app/src/runtime.rs`),
        },
        {
          id: 'input-line',
          nodeId: 'tui',
          edgeIds: ['app-tui'],
          description: (
            <>
              The input line owns the text and wraps <code>vim-line</code>, which never stores a
              buffer of its own.
            </>
          ),
          evidence: documented('line.rs', `${BLOB}/tui/src/line.rs`),
        },
        {
          id: 'outbox',
          nodeId: 'tui',
          description:
            'The send is queued as an action. The docs describe this seam for attachments and say media commands use “the same” one.',
          evidence: inferred('state/outbox.rs', `${BLOB}/tui/src/state/outbox.rs`),
        },
        {
          id: 'hand-off',
          nodeId: 'app',
          edgeIds: ['app-tui'],
          description:
            'The composition root hands the action to the protocol client. Which function does this is not named in the docs.',
          evidence: inferred(),
        },
        {
          id: 'translate',
          nodeId: 'proto',
          edgeIds: ['app-proto'],
          description:
            'Translates between domain types and the framework’s, so neither side sees the other.',
          evidence: documented(
            'src/',
            'https://github.com/curedbylethe/televim/tree/main/crates/proto/src'
          ),
        },
        {
          id: 'send-message',
          nodeId: 'telegram-framework',
          edgeIds: ['proto-telegram-framework'],
          description: (
            <>
              <code>send_message</code> is one of its typed paths. It refuses a person whose address
              it has not cached.
            </>
          ),
          evidence: documented(),
        },
        {
          id: 'mtproto',
          nodeId: 'grammers',
          edgeIds: ['telegram-framework-grammers'],
          description: 'MTProto, to Telegram.',
          evidence: documented(),
        },
      ],
      constraint: {
        label: 'Constraint',
        content: (
          <>
            Only <code>telegram-framework</code> may name a <code>grammers</code> type.{' '}
            <code>make boundary</code> fails the build otherwise.
          </>
        ),
      },
    },
    {
      id: 'search',
      label: 'Search this chat',
      trigger: '/',
      steps: [
        {
          id: 'read-key',
          nodeId: 'app',
          description: (
            <>
              The event loop receives <kbd>/</kbd> and the query.
            </>
          ),
          evidence: documented('runtime.rs', `${BLOB}/app/src/runtime.rs`),
        },
        {
          id: 'conversation',
          nodeId: 'tui',
          edgeIds: ['app-tui'],
          description: 'The open conversation holds its view, its registers and its searches.',
          evidence: documented('state/conversation.rs', `${BLOB}/tui/src/state/conversation.rs`),
        },
        {
          id: 'search',
          nodeId: 'domain',
          edgeIds: ['tui-domain'],
          description:
            'Query parsing, match scoring and local scanning, as plain functions with no async and no UI.',
          evidence: documented('search.rs', `${BLOB}/domain/src/search.rs`),
        },
        {
          id: 'draw-matches',
          nodeId: 'tui',
          edgeIds: ['tui-domain'],
          description:
            'Draws each match: a run of text that can carry a match, a selection and a caret.',
          evidence: documented('text_row.rs', `${BLOB}/tui/src/text_row.rs`),
        },
      ],
      constraint: {
        label: 'Constraint',
        content:
          'The conversation window is a flat list capped at 200 messages, so its largest allocation stays bounded under a live feed.',
      },
    },
    {
      id: 'arrive',
      label: 'A message arrives',
      trigger: 'Event',
      triggerKind: 'event',
      steps: [
        {
          id: 'update',
          nodeId: 'grammers',
          description: 'An update comes in from Telegram.',
          evidence: documented(),
        },
        {
          id: 'filter',
          nodeId: 'telegram-framework',
          edgeIds: ['telegram-framework-grammers'],
          description:
            'A typed update stream, filtered to private conversations. Groups, channels and bots stop here.',
          evidence: documented(),
        },
        {
          id: 'map-update',
          nodeId: 'proto',
          edgeIds: ['proto-telegram-framework'],
          description: 'Maps the update into the domain’s own event vocabulary.',
          evidence: documented('stream.rs', `${BLOB}/proto/src/stream.rs`),
        },
        {
          id: 'pump',
          nodeId: 'app',
          edgeIds: ['app-proto'],
          description: 'The update pump. The local history cache folds the event in as well.',
          evidence: documented('net.rs', `${BLOB}/app/src/net.rs`),
        },
        {
          id: 'feed',
          nodeId: 'tui',
          edgeIds: ['app-tui'],
          description: 'Feed events are one of the mutations this seam owns.',
          evidence: documented('state/coordinate.rs', `${BLOB}/tui/src/state/coordinate.rs`),
        },
        {
          id: 'window',
          nodeId: 'domain',
          edgeIds: ['tui-domain'],
          description:
            'The message joins the conversation window. The docs describe the window, not the call that adds to it.',
          evidence: inferred('history.rs', `${BLOB}/domain/src/history.rs`),
        },
      ],
      constraint: {
        label: 'Evidence',
        content:
          'Two PTY tests replay arrivals: one moves a view pinned to the newest message, one leaves a scrolled-back view alone.',
      },
    },
  ],
}

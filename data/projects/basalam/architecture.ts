import type { FlowBoardData } from '@/components/flow-board'

export const basalamArchitecture: FlowBoardData = {
  id: 'basalam-event-frame',
  title: 'Event to frame',
  nodeKinds: {
    stage: { label: 'Framework stage' },
    signal: { label: 'OS signal', stroke: 'dashed' },
  },
  edgeKinds: {
    flow: { label: 'Responsibility', description: 'Responsibilities, not exact function calls.' },
  },
  nodes: [
    {
      id: 'screen',
      kind: 'stage',
      label: 'Screen',
      subtitle: '01 / Entry',
      position: { x: 100, y: 95 },
      size: { width: 160, height: 60 },
      details: [{ label: 'Entry', content: 'Wait for a key, mouse event, tick or resize.' }],
    },
    {
      id: 'widgets',
      kind: 'stage',
      label: 'Widget tree',
      subtitle: '02 / Dispatch',
      position: { x: 200, y: 190 },
      size: { width: 160, height: 60 },
      details: [{ label: 'Dispatch', content: 'Focused widget first, then parents and keymap.' }],
    },
    {
      id: 'buffer',
      kind: 'stage',
      label: 'Buffer',
      subtitle: '03 / Draw',
      position: { x: 300, y: 285 },
      size: { width: 160, height: 60 },
      details: [{ label: 'Draw', content: 'Cell content, styles, widths and borders.' }],
    },
    {
      id: 'terminal',
      kind: 'stage',
      label: 'Terminal',
      subtitle: '04 / Output',
      position: { x: 400, y: 380 },
      size: { width: 160, height: 60 },
      details: [{ label: 'Output', content: 'ANSI changes, not an unconditional full repaint.' }],
    },
    {
      id: 'signal',
      kind: 'signal',
      label: 'os.signal',
      subtitle: 'SIGWINCH',
      position: { x: 0, y: 0 },
      size: { width: 160, height: 60 },
      details: [
        {
          label: 'Resize',
          content:
            'A resize wakes the watcher. Screen reads the terminal dimensions again before drawing.',
        },
      ],
    },
  ],
  edges: [
    { id: 'screen-widgets', source: 'screen', target: 'widgets', kind: 'flow' },
    { id: 'widgets-buffer', source: 'widgets', target: 'buffer', kind: 'flow' },
    { id: 'buffer-terminal', source: 'buffer', target: 'terminal', kind: 'flow' },
    { id: 'signal-screen', source: 'signal', target: 'screen', kind: 'flow' },
  ],
  traces: [
    {
      id: 'key',
      label: 'Key press',
      title: 'One event, one main-thread decision',
      description:
        'Input is decoded in the background, then posted to the event channel. The main thread dispatches it through the focused widget and ancestors before rendering into the buffer.',
      steps: [
        {
          id: 'key-screen',
          nodeId: 'screen',
          description: 'Wait for a key, mouse event, tick or resize.',
        },
        {
          id: 'key-widgets',
          nodeId: 'widgets',
          edgeIds: ['screen-widgets'],
          description: 'Focused widget first, then parents and keymap.',
        },
        {
          id: 'key-buffer',
          nodeId: 'buffer',
          edgeIds: ['widgets-buffer'],
          description: 'Cell content, styles, widths and borders.',
        },
        {
          id: 'key-terminal',
          nodeId: 'terminal',
          edgeIds: ['buffer-terminal'],
          description: 'ANSI changes, not an unconditional full repaint.',
        },
      ],
    },
    {
      id: 'resize',
      label: 'Window resize',
      title: 'The signal stays outside the widget tree',
      description:
        'A SIGWINCH wait wakes the resize watcher. It checks the actual dimensions and posts a ResizeEvent; the main thread then handles layout and drawing.',
      steps: [
        { id: 'resize-signal', nodeId: 'signal', description: 'A resize wakes the watcher.' },
        {
          id: 'resize-screen',
          nodeId: 'screen',
          edgeIds: ['signal-screen'],
          description: 'Screen reads the terminal dimensions again before drawing.',
        },
        {
          id: 'resize-widgets',
          nodeId: 'widgets',
          edgeIds: ['screen-widgets'],
          description: 'The main thread then handles layout and drawing.',
        },
        {
          id: 'resize-buffer',
          nodeId: 'buffer',
          edgeIds: ['widgets-buffer'],
          description: 'Cell content, styles, widths and borders.',
        },
        {
          id: 'resize-terminal',
          nodeId: 'terminal',
          edgeIds: ['buffer-terminal'],
          description: 'ANSI changes, not an unconditional full repaint.',
        },
      ],
    },
    {
      id: 'draw',
      label: 'Present frame',
      title: 'Rendering remains a testable operation',
      description:
        'Widgets draw into clipped buffers, never directly to stdout. The screen compares front and back cells before flushing terminal output; that same drawing can be tested headlessly.',
      steps: [
        {
          id: 'draw-buffer',
          nodeId: 'buffer',
          description: 'Cell content, styles, widths and borders.',
        },
        {
          id: 'draw-terminal',
          nodeId: 'terminal',
          edgeIds: ['buffer-terminal'],
          description: 'ANSI changes, not an unconditional full repaint.',
        },
      ],
    },
  ],
}

import type { FlowBoardData } from '../types'

/** A small order pipeline: unrelated to Televim, with a cycle and a repeated visit. */
export const orders: FlowBoardData = {
  id: 'orders',
  title: 'Order pipeline',
  nodeKinds: { service: { label: 'Service' }, store: { label: 'Datastore', stroke: 'dashed' } },
  edgeKinds: { calls: { label: 'Calls' } },
  groups: [{ id: 'backend', label: 'Backend' }],
  nodes: [
    {
      id: 'api',
      kind: 'service',
      label: 'API',
      subtitle: 'HTTP',
      details: [{ label: 'Role', content: 'Accepts orders.' }],
      evidence: [{ status: 'documented', label: 'api.md', url: 'https://example.com/api.md' }],
    },
    { id: 'worker', kind: 'service', label: 'Worker', groupId: 'backend' },
    { id: 'db', kind: 'store', label: 'Postgres', groupId: 'backend' },
  ],
  edges: [
    { id: 'api-worker', source: 'api', target: 'worker', kind: 'calls' },
    { id: 'worker-db', source: 'worker', target: 'db', kind: 'calls' },
    {
      id: 'db-api',
      source: 'db',
      target: 'api',
      kind: 'calls',
      evidence: [{ status: 'inferred' }],
    },
  ],
  traces: [
    {
      id: 'place',
      label: 'Place an order',
      trigger: 'POST /orders',
      steps: [
        { id: 'receive', nodeId: 'api', description: 'Receives the request.' },
        { id: 'enqueue', nodeId: 'worker', edgeIds: ['api-worker'], description: 'Takes the job.' },
        { id: 'store', nodeId: 'db', edgeIds: ['worker-db'], description: 'Writes the row.' },
        { id: 'reply', nodeId: 'api', description: 'Replies 201.' },
      ],
    },
    {
      id: 'audit',
      label: 'Audit',
      steps: [{ id: 'read', nodeId: 'db', description: 'Reads the log.' }],
    },
  ],
}

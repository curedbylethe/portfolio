'use client'

import type { NodeProps } from '@xyflow/react'
import { useBoardData } from '../hooks/useBoard'
import type { FlowGroupNode } from '../hooks/useGraphElements'

/** A dashed boundary around a group's members. Decorative: the inspector names each node's group. */
export function BoardGroupHost({ data }: NodeProps<FlowGroupNode>) {
  const { index } = useBoardData()
  const group = index.groups.get(data.groupId)
  if (!group) return null
  return (
    <div className="fb-group" title={group.description}>
      <span className="fb-group-label">{group.label}</span>
    </div>
  )
}

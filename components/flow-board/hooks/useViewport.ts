import { useCallback, useSyncExternalStore } from 'react'
import { useReactFlow, useStoreApi } from '@xyflow/react'
import { FIT_VIEW_OPTIONS, motionDuration } from '../styles'
import type { BoardIndex, BoardPosition } from '../types'
import { graphBounds, nodeSize } from '../utils'

/** Fits the whole drawing, including edge routes that lie outside the nodes. */
export function useFitBoard(index: BoardIndex) {
  const { fitBounds } = useReactFlow()
  return useCallback(
    (animate = true) =>
      void fitBounds(graphBounds(index), {
        padding: FIT_VIEW_OPTIONS.padding,
        duration: animate ? motionDuration() : 0,
      }),
    [fitBounds, index]
  )
}

/** Pans, without zooming, until a node is fully in view. Does nothing when it already is. */
export function useRevealNode(index: BoardIndex) {
  const { setCenter } = useReactFlow()
  const store = useStoreApi()
  return useCallback(
    (nodeId: string) => {
      const node = index.nodes.get(nodeId)
      const p = index.positions.get(nodeId)
      if (!node || !p) return
      const { width, height, transform } = store.getState()
      const [tx, ty, zoom] = transform
      const size = nodeSize(node)
      const left = p.x * zoom + tx
      const top = p.y * zoom + ty
      const inView =
        left >= 0 &&
        top >= 0 &&
        left + size.width * zoom <= width &&
        top + size.height * zoom <= height
      if (inView || width === 0) return
      const center: BoardPosition = { x: p.x + size.width / 2, y: p.y + size.height / 2 }
      void setCenter(center.x, center.y, { zoom, duration: motionDuration() })
    },
    [index, setCenter, store]
  )
}

const COARSE = '(pointer: coarse)'
const subscribe = (onChange: () => void) => {
  const query = window.matchMedia(COARSE)
  query.addEventListener('change', onChange)
  return () => query.removeEventListener('change', onChange)
}

/** True on touch-first devices, where a one-finger drag must scroll the page. */
export const useCoarsePointer = () =>
  useSyncExternalStore(
    subscribe,
    () => window.matchMedia(COARSE).matches,
    () => false
  )

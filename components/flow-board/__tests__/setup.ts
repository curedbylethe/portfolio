import { afterEach } from 'vitest'
import { cleanup } from '@testing-library/react'

// jsdom lacks the layout APIs React Flow measures with. Stubs follow React Flow's testing guide.
class ResizeObserverStub {
  observe() {}
  unobserve() {}
  disconnect() {}
}

class DOMMatrixReadOnlyStub {
  m22: number
  constructor(transform?: string) {
    const scale = transform?.match(/scale\(([1-9.])\)/)?.[1]
    this.m22 = scale !== undefined ? Number(scale) : 1
  }
}

Object.assign(globalThis, {
  ResizeObserver: ResizeObserverStub,
  DOMMatrixReadOnly: DOMMatrixReadOnlyStub,
})
Object.defineProperties(HTMLElement.prototype, {
  offsetHeight: {
    get() {
      return Number.parseFloat(this.style.height) || 1
    },
  },
  offsetWidth: {
    get() {
      return Number.parseFloat(this.style.width) || 1
    },
  },
})
;(SVGElement.prototype as unknown as { getBBox: () => DOMRect }).getBBox = () =>
  ({ x: 0, y: 0, width: 0, height: 0 }) as DOMRect
window.matchMedia = (query: string) =>
  ({
    matches: false,
    media: query,
    addEventListener: () => {},
    removeEventListener: () => {},
  }) as unknown as MediaQueryList

afterEach(cleanup)

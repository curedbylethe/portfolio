import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vitest/config'

const here = (path: string) => fileURLToPath(new URL(path, import.meta.url))

export default defineConfig({
  // tsconfig says `jsx: preserve` for Next; tests need JSX compiled.
  oxc: { jsx: { runtime: 'automatic' } },
  resolve: {
    alias: {
      '@/components': here('./components'),
      '@/data': here('./data'),
    },
  },
  test: {
    environment: 'jsdom',
    include: ['components/**/*.test.{ts,tsx}'],
    setupFiles: ['components/flow-board/__tests__/setup.ts'],
  },
})

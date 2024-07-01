import { defineConfig } from 'vitest/config'
import viteTsConfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  test: {
    globals: true,
    root: './',
    environmentMatchGlobs: [
      ['./src/http/controllers/**', './src/vitest-environments/prisma.ts'],
    ],
  },
  plugins: [viteTsConfigPaths()],
})

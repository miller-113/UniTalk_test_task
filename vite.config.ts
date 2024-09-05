import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

import tsconfigPaths from 'vite-tsconfig-paths'

import path from 'path'

export default defineConfig({
  base: '',
  plugins: [react(), tsconfigPaths()],
  server: {
    port: 3000,
    open: true,
    host: true
  },
  esbuild: {
    loader: 'tsx'
  },
  resolve: {
    alias: {
      '~': path.resolve(__dirname, 'src/')
    }
  }
})

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const rootDir = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  plugins: [react()],
  publicDir: 'public',
  resolve: {
    extensions: ['.mjs', '.js', '.mts', '.ts', '.jsx', '.tsx', '.json'],
    alias: {
      '@': path.resolve(rootDir, 'src'),
    },
  },
  server: {
    watch: {
      ignored: ['**/appcrates-website.html', '**/../appcrates-website.html'],
    },
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
})

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base: './' works for GitHub Pages (project pages & root pages alike).
// If assets break after deploy, change to '/your-repo-name/'
export default defineConfig({
  plugins: [react()],
  base: './',
})

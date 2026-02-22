import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
import { visualizer } from 'rollup-plugin-visualizer'
export default defineConfig({
  plugins: [
    react(),
    visualizer({
      filename: 'dist/stats.html',
      open: true
    }),
    tailwindcss()
  ]
})

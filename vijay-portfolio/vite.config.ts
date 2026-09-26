import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      output: {
        // Rollup moves a manual chunk's unassigned deps into it, so React must get its own
        // chunk — otherwise the entry imports React from `three` and the 3D bundle loads eagerly.
        manualChunks: (id) => {
          // Vite's dynamic-import preload helper is shared too — keep it out of `three` as well.
          if (/node_modules\/(react|react-dom|scheduler)\//.test(id) || id.includes('vite/preload-helper')) return 'react'
          if (/node_modules\/(three|@react-three)\//.test(id)) return 'three'
        },
      },
    },
    chunkSizeWarningLimit: 1200,
  },
})

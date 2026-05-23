import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.js',
    exclude: ['**/node_modules/**', '**/tests/**'],
  },
  build: {
    // Raise the warning limit slightly (portfolio is intentionally feature-rich)
    chunkSizeWarningLimit: 500,

    rollupOptions: {
      output: {
        // Split vendor chunks so browsers can cache React separately from app code
        // Note: Vite 8 (rolldown) requires manualChunks as a function
        manualChunks(id) {
          if (id.includes('node_modules/react') || id.includes('node_modules/react-dom')) {
            return 'vendor-react';
          }
          if (id.includes('node_modules/lucide-react')) {
            return 'vendor-lucide';
          }
        },
      },
    },

    // Vite 8 uses oxc minifier by default (esbuild is deprecated) — no override needed

    // Enable CSS code splitting so each lazy chunk only loads the CSS it needs
    cssCodeSplit: true,

    // Generate sourcemaps only in dev — skip in prod builds for smaller output
    sourcemap: false,
  },
})

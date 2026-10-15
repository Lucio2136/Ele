import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [react(), tailwindcss()],
    server: {
      proxy: {
        '/telegram': {
          target: 'https://api.telegram.org',
          changeOrigin: true,
          secure: true,
          rewrite: () => `/bot${env.VITE_TELEGRAM_TOKEN}/sendMessage`,
        },
      },
    },
    preview: {
      proxy: {
        '/telegram': {
          target: 'https://api.telegram.org',
          changeOrigin: true,
          secure: true,
          rewrite: () => `/bot${env.VITE_TELEGRAM_TOKEN}/sendMessage`,
        },
      },
    },
  }
})

import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'connection-check',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          if (
            req.url === '/connection-check.txt' &&
            req.method === 'HEAD'
          ) {
            res.statusCode = 204
            res.end()
            return
          }

          next()
        })
      }
    }
  ],
})

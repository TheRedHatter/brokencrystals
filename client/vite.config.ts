import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  publicDir: './public',
  plugins: [react()],
  server: {
    port: 3001,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true
      },
      '/products.ProductsService': {
        target: 'http://localhost:8081',
        changeOrigin: true
      },
      '/testimonials.TestimonialsService': {
        target: 'http://localhost:8081',
        changeOrigin: true
      },
      '/file.FileService': {
        target: 'http://localhost:8081',
        changeOrigin: true
      },
      '/os.OsService': {
        target: 'http://localhost:8081',
        changeOrigin: true
      }
    }
  },
  build: {
    chunkSizeWarningLimit: 600 * 1024
  }
});

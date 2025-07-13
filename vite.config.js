import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5173, // Default Vite port
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});

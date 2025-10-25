import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  server: {
    port: 5173,
    proxy: {
      '/auth': 'http://localhost:4000',
      '/referrals': 'http://localhost:4000',
      '/messages': 'http://localhost:4000',
      '/reports': 'http://localhost:4000'
    }
  },
  plugins: [react()]
});

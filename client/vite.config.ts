import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import {tanstackRouter} from '@tanstack/router-plugin/vite';

export default defineConfig({
  plugins: [
    tsconfigPaths(),
    tanstackRouter({
      target: 'react',
      autoCodeSplitting: true,
    }),
    react(),
  ],
  define: {global: 'window'},
  server: {
    port: 3000,
  },
});

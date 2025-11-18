// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // allow importing non-standard asset types like .mov
  assetsInclude: ['**/*.mp4', '**/*.webm', '**/*.mov', '**/*.ogv', '**/*.ogg'],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  build: {
    // never inline big assets as base64; always emit files
    assetsInlineLimit: 0,
    rollupOptions: {
      output: {
        // put videos in a dedicated folder
        assetFileNames: (assetInfo) => {
          const name = assetInfo.name?.toLowerCase() ?? '';
          if (/\.(mp4|webm|mov|ogv|ogg)$/.test(name)) {
            return 'assets/video/[name]-[hash][extname]';
          }
          return 'assets/[name]-[hash][extname]';
        },
      },
    },
    // Optional: quiet the warning for large assets
    chunkSizeWarningLimit: 2000,
  },
  // Optional (dev only): ensure byte-range is available for scrubbing
  server: {
    headers: {
      'Accept-Ranges': 'bytes',
    },
  },
});

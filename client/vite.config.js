import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "dist",
    sourcemap: true, // Optional: for debugging
  },
  server: {
    proxy: {
      // For local development - proxy API calls to backend
      "/api": "http://localhost:3003",
      "/socket.io": {
        target: "http://localhost:3003",
        ws: true,
      },
    },
  },
});

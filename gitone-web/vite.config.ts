import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import pluginRewriteAll from "vite-plugin-rewrite-all";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), pluginRewriteAll()],
  server: {
    proxy: {
      "/graphql": {
        target: "http://127.0.0.1:8080",
        changeOrigin: true,
        secure: false,
      },
      "/avatars": {
        target: "http://127.0.0.1:8080",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});

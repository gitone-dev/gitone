import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";
import pluginRewriteAll from "vite-plugin-rewrite-all";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), pluginRewriteAll()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  server: {
    proxy: {
      "/.well-known/": {
        target: "http://127.0.0.1:8080",
        changeOrigin: false,
        secure: false,
      },
      "/oauth2/": {
        target: "http://127.0.0.1:8080",
        changeOrigin: false,
        secure: false,
      },
      "/connect/": {
        target: "http://127.0.0.1:8080",
        changeOrigin: false,
        secure: false,
      },
      "/userinfo": {
        target: "http://127.0.0.1:8080",
        changeOrigin: false,
        secure: false,
      },
      "/login": {
        target: "http://127.0.0.1:8080",
        changeOrigin: false,
        secure: false,
      },
      "/logout": {
        target: "http://127.0.0.1:8080",
        changeOrigin: false,
        secure: false,
      },
      "/graphql": {
        target: "http://127.0.0.1:8080",
        changeOrigin: false,
        secure: false,
      },
      "/avatars": {
        target: "http://127.0.0.1:8080",
        changeOrigin: false,
        secure: false,
      },
    },
  },
});

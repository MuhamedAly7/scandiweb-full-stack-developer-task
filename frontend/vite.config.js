import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0",
    port: 3000,
    proxy: {
      "/graphql": {
        target: "http://fullstack-scandiweb-mohamedhassan.web1337.net/graphql",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});

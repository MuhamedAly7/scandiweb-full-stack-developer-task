import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/graphql": {
        target: "https://fullstack-scandiweb-mohamedhassan.web1337.net",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Using a relative base so the build works when hosted on GitHub Pages
  // at https://<username>.github.io/<repo-name>/ without extra config.
  base: "./",
});

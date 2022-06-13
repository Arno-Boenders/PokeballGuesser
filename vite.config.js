import { fileURLToPath, URL } from "url";

import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./img", import.meta.url)),
    },
  },
});

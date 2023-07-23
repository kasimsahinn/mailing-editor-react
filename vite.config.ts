import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      scss: {
        includePaths: ["./src/styles"],
        additionalData: `
          @import "config/index.scss";
          `,
      },
    },
  },
});

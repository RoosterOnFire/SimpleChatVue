import vue from "@vitejs/plugin-vue"
import { resolve } from "path"
import { defineConfig } from "vite"

export default defineConfig({
  resolve: {
    alias: [{ find: "@", replacement: resolve("src") }],
  },
  plugins: [vue()],
  server: {
    fs: {
      allow: [".."],
    },
  },
})

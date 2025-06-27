import { defineConfig, loadEnv } from "vite";

import { tanstackRouter } from "@tanstack/router-plugin/vite";
import react from "@vitejs/plugin-react";

import proxyConfig from "./proxy.config";

export default defineConfig(() => {
  const env = loadEnv("", "");
  return {
    base: "",
    plugins: [tanstackRouter(), react()],
    server: {
      host: "127.0.0.1",
      proxy: proxyConfig(env),
      fs: {
        strict: false,
      },
    },
    build: {
      assetsDir: ".",
      chunkSizeWarningLimit: 2000,
    },
  };
});

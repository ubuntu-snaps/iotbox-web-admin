import { ProxyOptions } from "vite";

export default (
  env: Record<string, string>,
): Record<string, string | ProxyOptions> => {
  return {
    "/api": {
      target: env.VITE_SERVER_URL,
      changeOrigin: true,
    },
    "/mqtt": {
      target: env.VITE_SERVER_URL,
      changeOrigin: true,
      ws: true,
    },
  };
};

import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/welcome")({
  staticData: {
    name: "欢迎页面",
    order: 1,
  },
});

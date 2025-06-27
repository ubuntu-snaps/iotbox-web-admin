import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/page")({
  staticData: {
    name: "页面菜单",
    order: 2,
  },
});

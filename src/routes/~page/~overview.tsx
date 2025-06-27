import { PageContainer } from "@ant-design/pro-components";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/page/overview")({
  component: Overview,
  staticData: {
    name: "概览页面",
    order: 0,
  },
});

function Overview() {
  return <PageContainer>概览页面</PageContainer>;
}

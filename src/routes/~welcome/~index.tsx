import { PageContainer } from "@ant-design/pro-components";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/welcome/")({
  component: Index,
});

function Index() {
  return <PageContainer>欢迎</PageContainer>;
}

import { Button, Flex, Result } from "antd";

import { ProLayout } from "@ant-design/pro-components";
import { useNavigate } from "@tanstack/react-router";

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <ProLayout pure>
      <Flex align="center" justify="center" style={{ height: "100%" }}>
        <Result
          status="404"
          title="404"
          subTitle="你访问的页面不存在"
          extra={
            <Button
              type="primary"
              onClick={() => {
                navigate({ to: "/" });
              }}
            >
              返回首页
            </Button>
          }
        />
      </Flex>
    </ProLayout>
  );
}

import { Button, Descriptions, Popover, Tag } from "antd";
import { IdTokenClaims } from "oidc-client-ts";
import { useAuth } from "react-oidc-context";

import LogoutOutlined from "@ant-design/icons/LogoutOutlined";
import UserOutlined from "@ant-design/icons/UserOutlined";
import { ProLayoutProps } from "@ant-design/pro-components";

interface CustomProfile extends IdTokenClaims {
  nickname?: string;
  realname?: string;
  avatar?: string;
  roles?: string[];
}

export function useAvatarProps(): ProLayoutProps["avatarProps"] {
  const auth = useAuth();
  const profile = auth.user?.profile as CustomProfile | undefined;
  return {
    title: profile?.nickname ?? "未登录",
    src: profile?.avatar ?? <UserOutlined />,
    render: (_props, dom) => (
      <Popover
        content={
          <Descriptions title="用户信息" column={1} style={{ width: 150 }}>
            <Descriptions.Item label="用户名">{profile?.sub}</Descriptions.Item>
            <Descriptions.Item label="昵称">
              {profile?.nickname}
            </Descriptions.Item>
            <Descriptions.Item label="真实姓名">
              {profile?.realname}
            </Descriptions.Item>
            <Descriptions.Item label="角色">
              {(profile?.roles ?? []).map((r) => (
                <Tag key={r} color="cyan">
                  {r}
                </Tag>
              ))}
            </Descriptions.Item>
            <Descriptions.Item label="">
              <Button
                icon={<LogoutOutlined />}
                onClick={() => {
                  auth.signoutRedirect({
                    post_logout_redirect_uri: window.location.href,
                  });
                }}
              >
                注销
              </Button>
            </Descriptions.Item>
          </Descriptions>
        }
      >
        {dom}
      </Popover>
    ),
  };
}

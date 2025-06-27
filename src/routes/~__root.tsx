import { createStyles, useTheme } from "antd-style";
import { sortBy } from "lodash";

import { MenuDataItem, ProLayout } from "@ant-design/pro-components";
import {
  AnyRoute,
  createRootRoute,
  Link,
  Outlet,
  useLocation,
  useRouter,
} from "@tanstack/react-router";

import { useAvatarProps } from "../hooks/avatar";

const { VITE_APP_TITLE } = import.meta.env;

export const Route = createRootRoute({
  component: Root,
});

function Root() {
  const { styles } = useStyles();
  const location = useLocation();
  const router = useRouter();
  const avatarProps = useAvatarProps();
  const theme = useTheme();

  const route = routeToAntd(router.routeTree);

  return (
    <ProLayout
      className={styles.layout}
      title={VITE_APP_TITLE}
      layout="mix"
      splitMenus
      siderWidth={160}
      location={location}
      route={route}
      menuItemRender={(item, defaultDom) => (
        <Link to={item.path}>{defaultDom}</Link>
      )}
      avatarProps={avatarProps}
      actionsRender={() => []}
      breadcrumbRender={false} // set false to disable
      breadcrumbProps={{
        itemRender(route) {
          return <Link to={route.linkPath}>{route.title}</Link>;
        },
      }}
      // pageTitleRender={false} // set false to disable
      token={{
        header: {
          heightLayoutHeader: 48,
          colorBgMenuItemSelected: theme.colorPrimary,
        },
        sider: {
          colorBgMenuItemSelected: theme.colorPrimary,
        },
        pageContainer: {
          paddingBlockPageContainerContent: theme.padding * 2,
          paddingInlinePageContainerContent: theme.padding * 2,
        },
      }}
      stylish={{
        header: (token) => ({
          ".ant-pro-global-header-logo": {
            gap: token.padding,
            cursor: "pointer",
          },
          ".ant-popover-inner": {
            background: "rgba(0, 0, 0, 0.9)",
            border: `1px solid ${token.colorPrimaryBg}`,
            backdropFilter: "blur(8px)",
          },
          ".ant-pro-top-nav-header-menu": {
            marginLeft: token.margin * 10,
          },
        }),
      }}
    >
      <Outlet />
    </ProLayout>
  );
}

function routeToAntd(route: AnyRoute): MenuDataItem {
  const { staticData } = route.options;
  const children = (route.children as AnyRoute[] | undefined)?.map((child) =>
    routeToAntd(child),
  );
  return {
    ...staticData,
    path: route.fullPath,
    children: sortBy(children, "order"),
  };
}

const useStyles = createStyles((_theme) => ({
  layout: {
    ".ant-table-body": {
      scrollbarColor: "auto",
    },
  },
}));

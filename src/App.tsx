import { ThemeProvider } from "antd-style";
import { FC } from "react";
import { AuthProvider, AuthProviderProps } from "react-oidc-context";

import { MenuDataItem, ProConfigProvider } from "@ant-design/pro-components";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  RouterProvider,
  createHashHistory,
  createRouter,
} from "@tanstack/react-router";

import NotFound from "./components/NotFound";
import { routeTree } from "./routeTree.gen";
import defaultTheme from "./theme";

const router = createRouter({
  routeTree,
  history: createHashHistory(),
  defaultNotFoundComponent: NotFound,
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
  interface StaticDataRouteOption
    extends Pick<
      MenuDataItem,
      | "name"
      | "icon"
      | "locale"
      | "hideChildrenInMenu"
      | "hideInMenu"
      | "flatMenu"
      | "tooltip"
      | "disabled"
      | "disabledTooltip"
      | "target"
    > {
    order?: number; // 顺序
    isApp?: boolean;
  }
}

const redirect_uri = `${location.protocol}//${location.host}${location.pathname}`;

const oidcConfig: AuthProviderProps = {
  authority: import.meta.env.VITE_OIDC_AUTHORITY,
  client_id: import.meta.env.VITE_OIDC_CLIENT_ID,
  client_secret: import.meta.env.VITE_OIDC_SECRET,
  redirect_uri,
  loadUserInfo: true,
  onSigninCallback() {
    const saved = sessionStorage.getItem("saved_location") ?? "/";
    sessionStorage.removeItem("saved_location");
    window.history.replaceState({}, "", redirect_uri);
    router.navigate({ to: saved });
  },
};

const queryClient = new QueryClient();

const App: FC = function () {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider
        defaultThemeMode="dark"
        defaultAppearance="dark"
        theme={defaultTheme}
      >
        <ProConfigProvider>
          <AuthProvider {...oidcConfig}>
            <RouterProvider router={router} />
          </AuthProvider>
        </ProConfigProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;

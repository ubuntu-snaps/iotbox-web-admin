import { ThemeProvider } from "antd-style";

import { withThemeFromJSXProvider } from "@storybook/addon-themes";

export const decorators = [
  withThemeFromJSXProvider({
    themes: {},
    defaultTheme: "dark",
    Provider: ThemeProvider,
  }),
];

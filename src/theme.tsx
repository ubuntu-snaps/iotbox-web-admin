import { theme, ThemeConfig } from "antd";

import { green } from "@ant-design/colors";

const defaultTheme: ThemeConfig = {
  algorithm: [theme.darkAlgorithm, theme.compactAlgorithm],
  token: {
    colorPrimary: green.primary,
  },
  components: {},
};

export default defaultTheme;

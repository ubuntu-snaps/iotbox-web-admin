import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "@ant-design/v5-patch-for-react-19";

import Root from "./Root";

const root = createRoot(document.getElementById("root")!);
root.render(
  <StrictMode>
    <Root />
  </StrictMode>,
);

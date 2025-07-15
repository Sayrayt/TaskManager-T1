import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "@/shared/ui/provider.tsx";
import "@/app/styles/index.scss";
import App from "./app/App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider defaultTheme="light">
      <App />
    </Provider>
  </StrictMode>,
);

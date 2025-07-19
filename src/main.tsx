import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "@/shared/ui/provider.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "@/app/styles/index.scss";
import App from "./app/App.tsx";

const queryClient = new QueryClient({});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider defaultTheme="light">
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </Provider>
  </StrictMode>,
);

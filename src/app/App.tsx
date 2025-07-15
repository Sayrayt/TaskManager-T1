import { RouterProvider } from "react-router-dom";
import Router from "@/app/provider/Router";

export default function App() {
  return <RouterProvider router={Router} />;
}

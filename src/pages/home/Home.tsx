import { Box } from "@chakra-ui/react";
import { Outlet, useLocation } from "react-router";
import Header from "@/widgets/header/Header";
import { Toaster } from "@/shared/ui/toaster";
import WelcomePage from "@/pages/home/WelcomePage";

export default function Home() {
  const location = useLocation();

  const isRootPage = location.pathname === "/";

  return (
    <Box h="100vh" className="home">
      <Toaster />
      <Header />

      {isRootPage && <WelcomePage />}

      <Outlet />
    </Box>
  );
}

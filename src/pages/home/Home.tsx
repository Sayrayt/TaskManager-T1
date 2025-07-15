import { Box } from "@chakra-ui/react";
import { Outlet, useLocation } from "react-router";
import { useEffect } from "react";
import useStore from "@/shared/config/store/store";
import Header from "@/widgets/header/Header";
import { Toaster } from "@/shared/ui/toaster";

export default function Home() {
  const { isSidebarOpen, setSidebarOpen } = useStore();
  const location = useLocation();

  useEffect(() => {
    if (location.state?.openSidebar) {
      setSidebarOpen(true);
    }
  }, [location.state, setSidebarOpen]);

  const handleOpen = () => setSidebarOpen(true);
  const handleClose = () => setSidebarOpen(false);

  return (
    <Box h={"100vh"} className="home">
      <Toaster />
      <Header open={isSidebarOpen} onClose={handleClose} onOpen={handleOpen} />
      <Outlet />
    </Box>
  );
}

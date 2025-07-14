import { Box } from "@chakra-ui/react"
import { Outlet, useLocation } from "react-router"
import useStore from "@/app/store/store"
import Header from "@/widgets/header/Header"
import { useEffect } from "react";

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
            <Header open={isSidebarOpen} onClose={handleClose} onOpen={handleOpen} />
            <Outlet />
        </Box>
    )
}
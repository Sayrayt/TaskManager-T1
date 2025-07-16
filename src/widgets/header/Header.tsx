import { HStack, Button } from "@chakra-ui/react";
import { ColorModeButton } from "@/shared/ui/color-mode";
import Sidebar from "@/widgets/sidebar/Sidebar";
import useStore from "@/shared/config/store/store";
import { LuMenu } from "react-icons/lu";

export default function Header() {
  const { setSidebarOpen } = useStore();

  return (
    <header className="header">
      <HStack p={2} justifyContent="space-between" h="20">
        <Button
          variant="ghost"
          onClick={() => setSidebarOpen(true)}
          aria-label="Открыть меню"
        >
          <LuMenu />
        </Button>
        <ColorModeButton />
      </HStack>

      <Sidebar />
    </header>
  );
}

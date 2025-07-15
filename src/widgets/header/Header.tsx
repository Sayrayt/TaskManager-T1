import { HStack, Button } from "@chakra-ui/react";
import { ColorModeButton } from "@/shared/ui/color-mode";
import Sidebar from "@/widgets/sidebar/Sidebar";

interface HeaderProps {
  open: boolean;
  onClose: () => void;
  onOpen: () => void;
}

export default function Header({ open, onClose, onOpen }: HeaderProps) {
  return (
    <header className="header">
      <HStack p={2} justifyContent="space-between" h="20">
        <Button onClick={onOpen}>Открыть менеджер задач</Button>
        <ColorModeButton />
      </HStack>

      <Sidebar isOpen={open} onClose={onClose} />
    </header>
  );
}

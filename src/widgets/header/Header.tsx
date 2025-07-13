import { HStack, Button, useDisclosure } from "@chakra-ui/react";
import { ColorModeButton } from "@/components/ui/color-mode";
import Sidebar from "@/widgets/sidebar/Sidebar";

export default function Header() {
    const { open, onOpen, onClose } = useDisclosure({ defaultOpen: true });


    return (
        <header className="header">
            <HStack
                p={2}
                justifyContent="space-between"
                h="20"
            >
                <Button onClick={onOpen}>Открыть Drawer</Button>
                <ColorModeButton />
            </HStack>

            <Sidebar isOpen={open} onClose={onClose} />
        </header>
    );
}

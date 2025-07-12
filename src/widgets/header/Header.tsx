import { HStack, Text } from "@chakra-ui/react";
import { ColorModeButton } from "@/components/ui/color-mode";

export default function Header() {
    return (
        <header className="header">
            <HStack p={2} borderBottom={"1px solid "} direction="row" justifyContent={"space-between"} h="20">
                <Text textStyle={"2xl"}>Менеджер задач</Text>
                <ColorModeButton />
            </HStack>
        </header>
    )
}
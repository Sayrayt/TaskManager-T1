// FilterMenu.tsx
import { HStack, Menu, Portal, Button } from "@chakra-ui/react";
import { LuListFilter } from "react-icons/lu";

interface FilterMenuProps {
    chosenPriorities: string[];
    chosenCategories: string[];
    handlePriorityChange: (value: string) => void;
    handleCategoryChange: (value: string) => void;
}

export default function FilterMenu({
    chosenPriorities,
    chosenCategories,
    handlePriorityChange,
    handleCategoryChange,
}: FilterMenuProps) {
    const priorityOptions = ["Low", "Medium", "High"];
    const categoryOptions = ["Bug", "Feature", "Documentation", "Refactor", "Test"];

    return (
        <HStack flexDirection={{ base: "column", md: "row" }} gap={2}>
            <Menu.Root closeOnSelect={false}>
                <Menu.Trigger asChild>
                    <Button colorScheme="blue">
                        <LuListFilter />
                        Приоритет
                    </Button>
                </Menu.Trigger>
                <Portal>
                    <Menu.Positioner>
                        <Menu.Content zIndex="popover" minW="200px">
                            <Menu.Item value="all" onClick={() => handlePriorityChange("all")}>
                                {chosenPriorities.includes("all") ? "✓ " : ""}Все
                            </Menu.Item>
                            {priorityOptions.map((opt) => (
                                <Menu.Item
                                    key={opt}
                                    value={opt}
                                    onClick={() => handlePriorityChange(opt)}
                                >
                                    {chosenPriorities.includes(opt) ? "✓ " : ""}
                                    {opt}
                                </Menu.Item>
                            ))}
                        </Menu.Content>
                    </Menu.Positioner>
                </Portal>
            </Menu.Root>

            <Menu.Root closeOnSelect={false}>
                <Menu.Trigger asChild>
                    <Button colorScheme="blue">
                        <LuListFilter />
                        Категория
                    </Button>
                </Menu.Trigger>
                <Portal>
                    <Menu.Positioner>
                        <Menu.Content zIndex="popover" minW="200px">
                            <Menu.Item value="all" onClick={() => handleCategoryChange("all")}>
                                {chosenCategories.includes("all") ? "✓ " : ""}Все
                            </Menu.Item>
                            {categoryOptions.map((cat) => (
                                <Menu.Item
                                    key={cat}
                                    value={cat}
                                    onClick={() => handleCategoryChange(cat)}
                                >
                                    {chosenCategories.includes(cat) ? "✓ " : ""}
                                    {cat}
                                </Menu.Item>
                            ))}
                        </Menu.Content>
                    </Menu.Positioner>
                </Portal>
            </Menu.Root>
        </HStack>
    );
}

import {
  Drawer,
  Portal,
  Button,
  CloseButton,
  Box,
  Heading,
  Input,
  IconButton,
  HStack,
  Tabs,
  useBreakpointValue
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { LuSearch, LuFileClock, LuFileCheck2, LuFilePen } from "react-icons/lu";
import TasksList from "@/pages/tasks/TasksList"
import type { Task } from "@/pages/tasks/TaskItem";
import useStore from "@/app/store/store";
import TaskFilterMenu from "./FilterMenu";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

type Tab = "To Do" | "In Progress" | "Done";

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const [activeTab, setActiveTab] = useState<Tab>("To Do");
  const [searchQuery, setSearchQuery] = useState("");

  const { tasksList } = useStore()

  const [chosenPriorities, setChosenPriorities] = useState<string[]>(["all"]);
  const [chosenCategories, setChosenCategories] = useState<string[]>(["all"]);
  const [filteredTasksList, setFilteredTasksList] = useState<Task[]>([]);

  const isFitted = useBreakpointValue({ base: false, md: true });

  const handlePriorityChange = (value: string) => {
    setChosenPriorities((prev) => {
      if (value === "all") return prev.includes("all") ? [] : ["all"];
      const withoutAll = prev.filter((v) => v !== "all");
      return withoutAll.includes(value)
        ? withoutAll.filter((v) => v !== value)
        : [...withoutAll, value];
    });
  };

  const handleCategoryChange = (value: string) => {
    setChosenCategories((prev) => {
      if (value === "all") return prev.includes("all") ? [] : ["all"];
      const withoutAll = prev.filter((v) => v !== "all");
      return withoutAll.includes(value)
        ? withoutAll.filter((v) => v !== value)
        : [...withoutAll, value];
    });
  };

  const filterList = (tasks: Task[]) =>
    tasks.filter(
      (task) =>
        task.status === activeTab &&
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
        (chosenPriorities.includes("all") ||
          chosenPriorities.includes(task.priority)) &&
        (chosenCategories.includes("all") ||
          chosenCategories.includes(task.category))
    );

  useEffect(() => {
    setFilteredTasksList(filterList(tasksList));
  }, [
    tasksList,
    activeTab,
    searchQuery,
    chosenPriorities,
    chosenCategories,
  ]);

  const handleCreateTask = () => {
    //To do
  }

  return (
    <Drawer.Root size={{ base: "full", md: "md" }} placement="start" open={isOpen} onOpenChange={() => onClose()}>
      <Portal>
        <Drawer.Backdrop />
        <Drawer.Positioner >
          <Drawer.Content>
            <Drawer.Header >
              <Drawer.Title>Менеджер задач</Drawer.Title>
            </Drawer.Header>
            <Drawer.Body p={{ base: "10px", md: "20px" }}>
              <Box>
                <Button marginBottom={2} width={"100%"} onClick={handleCreateTask}>
                  Создать задачу
                </Button>
                <Heading mb={2}>Задачи</Heading>
                <Box>
                  <Tabs.Root pt={5} pb={5}
                    fitted={isFitted}
                    variant={"enclosed"}
                    defaultValue="To Do"
                    value={activeTab}
                    onValueChange={(e) => setActiveTab(e.value as Tab)}
                    lazyMount
                    unmountOnExit
                  >
                    <Tabs.List >
                      <Tabs.Trigger value="To Do">
                        <LuFilePen />
                        To Do
                      </Tabs.Trigger>
                      <Tabs.Trigger value="In Progress">
                        <LuFileClock />
                        In Progress
                      </Tabs.Trigger>
                      <Tabs.Trigger value="Done">
                        <LuFileCheck2 />
                        Done
                      </Tabs.Trigger>
                    </Tabs.List>

                  </Tabs.Root>

                  <HStack mb={5}>
                    <IconButton
                      variant="outline"
                      aria-label="Найти задачу"
                      onClick={() => {
                        const filtered = filterList(tasksList);
                        setFilteredTasksList(filtered);
                      }}
                    >
                      <LuSearch />
                    </IconButton>
                    <Input
                      placeholder="Имя задачи"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />


                    <TaskFilterMenu
                      chosenPriorities={chosenPriorities}
                      chosenCategories={chosenCategories}
                      handlePriorityChange={handlePriorityChange}
                      handleCategoryChange={handleCategoryChange}
                    />

                  </HStack>
                </Box>
                <TasksList tasksList={filteredTasksList} onTaskClick={onClose} />
              </Box>

            </Drawer.Body>
            <Drawer.Footer>
              <Button variant="outline" onClick={onClose}>
                Закрыть
              </Button>
            </Drawer.Footer>

            <Drawer.CloseTrigger asChild>
              <CloseButton size="sm" position="absolute" top="2" right="2" />
            </Drawer.CloseTrigger>
          </Drawer.Content>
        </Drawer.Positioner>
      </Portal>
    </Drawer.Root>
  );
}

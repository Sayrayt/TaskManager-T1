import {
  Drawer,
  Portal,
  Button,
  CloseButton,
  Box,
  Heading,
  Input,
  InputGroup,
  HStack,
  Tabs,
  useBreakpointValue,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import useStore from "@/shared/config/store/store";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { LuSearch, LuFileClock, LuFileCheck2, LuFilePen } from "react-icons/lu";
import TasksList from "@/widgets/sidebar/TasksList";
import TaskFilterMenu from "@/widgets/sidebar/FilterMenu";
import { searchSchema } from "@/widgets/sidebar/model/sidebarValidationShema";
import type { Task } from "@/entites/task/model/TaskIteminterface";
import { parse, compareAsc, compareDesc } from "date-fns";
import { useTasks } from "@/shared/hooks/useTasks";

type Tab = "To Do" | "In Progress" | "Done";

export default function Sidebar() {
  const [activeTab, setActiveTab] = useState<Tab>("To Do");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchError, setSearchError] = useState<string | null>(null);

  const { setSidebarOpen, isSidebarOpen } = useStore();
  const { getTasks } = useTasks();
  const navigate = useNavigate();

  const [chosenPriorities, setChosenPriorities] = useState<string[]>(["all"]);
  const [chosenCategories, setChosenCategories] = useState<string[]>(["all"]);
  const [filteredTasksList, setFilteredTasksList] = useState<Task[]>([]);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");

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

  const handleSearchChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);

    try {
      await searchSchema.validate({ searchQuery: value });
      setSearchError(null);
    } catch (err) {
      if (err instanceof yup.ValidationError) {
        setSearchError(err.message);
      }
    }
  };

  const filterList = (tasks: Task[]) => {
    return tasks
      .filter(
        (task) =>
          task.status === activeTab &&
          task.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
          (chosenPriorities.includes("all") ||
            chosenPriorities.includes(task.priority)) &&
          (chosenCategories.includes("all") ||
            chosenCategories.includes(task.category)),
      )
      .sort((a, b) => {
        const format = "dd.MM.yyyy";

        const dateA = parse(a.date, format, new Date());
        const dateB = parse(b.date, format, new Date());

        return sortDirection === "asc"
          ? compareAsc(dateA, dateB)
          : compareDesc(dateA, dateB);
      });
  };

  useEffect(() => {
    setFilteredTasksList(filterList(getTasks.data));
  }, [
    activeTab,
    searchQuery,
    chosenPriorities,
    chosenCategories,
    getTasks.data,
    sortDirection,
  ]);

  const handleClickCreateTask = () => {
    navigate(`/task/new`);
    setSidebarOpen(false);
  };

  if (getTasks.error && !getTasks.isFetching) {
    console.log("Мамочку твою чпокал");
    // throw error;
  }

  return (
    <Drawer.Root
      size={{ base: "full", md: "lg" }}
      placement="start"
      open={isSidebarOpen}
      onOpenChange={(details) => {
        if (!details.open) {
          setSidebarOpen(false);
        }
      }}
    >
      <Portal>
        <Drawer.Backdrop />
        <Drawer.Positioner>
          <Drawer.Content scrollbarGutter={"stable"}>
            <Drawer.Header>
              <Drawer.Title fontSize={"xl"}>Менеджер задач</Drawer.Title>
            </Drawer.Header>
            <Drawer.Body p={{ base: "10px", md: "20px" }}>
              <Box>
                <Button
                  aria-label="Создать задачу"
                  marginBottom={2}
                  width={"100%"}
                  onClick={handleClickCreateTask}
                >
                  Создать задачу
                </Button>
                <Heading fontWeight="bold" mb={2}>
                  Задачи
                </Heading>
                <Box>
                  <Tabs.Root
                    pt={5}
                    pb={5}
                    fitted={isFitted}
                    variant={"enclosed"}
                    defaultValue="To Do"
                    value={activeTab}
                    onValueChange={(e) => setActiveTab(e.value as Tab)}
                    lazyMount
                    unmountOnExit
                    size={"sm"}
                  >
                    <Tabs.List>
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

                  <HStack flexDirection={{ base: "column", md: "row" }} mb={5}>
                    <InputGroup flex="1" startElement={<LuSearch />}>
                      <Input
                        value={searchQuery}
                        onChange={handleSearchChange}
                        placeholder="Поиск по имени задачи"
                        _invalid={searchError ? { borderColor: "red.500" } : {}}
                      />
                    </InputGroup>
                    {searchError && (
                      <Box fontSize="sm" color="red.500" mt="1">
                        {searchError}
                      </Box>
                    )}

                    <TaskFilterMenu
                      chosenPriorities={chosenPriorities}
                      chosenCategories={chosenCategories}
                      sortDirection={sortDirection}
                      handlePriorityChange={handlePriorityChange}
                      handleCategoryChange={handleCategoryChange}
                      setSortDirection={setSortDirection}
                    />
                  </HStack>
                </Box>
                <TasksList tasks={filteredTasksList} />
              </Box>
            </Drawer.Body>
            <Drawer.Footer>
              <Button
                aria-label="Закрыть"
                variant="outline"
                onClick={() => setSidebarOpen(false)}
              >
                Закрыть
              </Button>
            </Drawer.Footer>

            <Drawer.CloseTrigger asChild>
              <CloseButton
                aria-label="Закрыть"
                size="sm"
                position="absolute"
                top="2"
                right="2"
              />
            </Drawer.CloseTrigger>
          </Drawer.Content>
        </Drawer.Positioner>
      </Portal>
    </Drawer.Root>
  );
}

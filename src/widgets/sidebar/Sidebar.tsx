import {
  Drawer,
  Portal,
  Button,
  CloseButton,
  Box,
  Separator,
  Heading,
  Input,
  IconButton,
  HStack,
  Tabs,
  Center
} from "@chakra-ui/react";
import { LuSearch, LuFileClock, LuFileCheck2, LuFilePen } from "react-icons/lu";
import TasksList from "@/pages/tasks/TasksList"

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {

  const handleCreateTask = () => {

  }
  return (
    <Drawer.Root size={"md"} placement="start" open={isOpen} onOpenChange={(e) => onClose()}>
      <Portal>
        {/* <Drawer.Backdrop /> */}
        <Drawer.Positioner >
          <Drawer.Content>
            <Drawer.Header>
              <Drawer.Title>Менеджер задач</Drawer.Title>
            </Drawer.Header>
            <Drawer.Body>
              <Box>
                <Button marginBottom={2} width={"100%"} onClick={handleCreateTask}>
                  Создать задачу
                </Button>
                <Heading mb={2}>Задачи</Heading>
                <HStack mb={5}>
                  <IconButton variant={"outline"} aria-label="Найти задачу">
                    <LuSearch />
                  </IconButton>
                  <Input placeholder="Имя задачи"></Input>
                </HStack>
                <Center>
                  <Tabs.Root p={5} variant={"enclosed"}>
                    <Tabs.List>
                      <Tabs.Trigger value="members">
                        <LuFilePen />
                        To Do
                      </Tabs.Trigger>
                      <Tabs.Trigger value="projects">
                        <LuFileClock />
                        In Progress
                      </Tabs.Trigger>
                      <Tabs.Trigger value="tasks">
                        <LuFileCheck2 />
                        Done
                      </Tabs.Trigger>
                    </Tabs.List>
                    <Tabs.Content value="members">
                      Manage your team members
                    </Tabs.Content>
                    <Tabs.Content value="projects">Manage your projects</Tabs.Content>
                    <Tabs.Content value="tasks">
                      Manage your tasks for freelancers
                    </Tabs.Content>
                  </Tabs.Root>
                </Center>
                <Separator mb={5} />
                <TasksList />
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

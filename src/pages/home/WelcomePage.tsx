import { EmptyState, VStack, Button, ButtonGroup } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useTasks } from "@/shared/hooks/useTasks";
import useStore from "@/shared/config/store/store";
import Sidebar from "@/widgets/sidebar/Sidebar";
import { LuWand } from "react-icons/lu";

export default function WelcomePage() {
  const { setSidebarOpen } = useStore();
  const [title, setTitle] = useState<string>(
    "Добро пожаловать в ваш менеджер задач",
  );
  const [description, setDescription] = useState<string>();
  const { getTasks } = useTasks();

  useEffect(() => {
    if (getTasks.data.length === 0) {
      setTitle("Добро пожаловать в ваш менеджер задач");
      setDescription(
        "Создавайте, управляйте и отслеживайте задачи для повышения продуктивности. Начните с создания первой задачи.",
      );
    } else {
      setTitle("Задача не выбрана");
      setDescription("Выберите задачу из списка слева, чтобы начать работу.");
    }
  }, [getTasks.data]);

  if (getTasks.error && !getTasks.isFetching) {
    throw getTasks.error;
  }

  return (
    <>
      <EmptyState.Root size={"lg"}>
        <EmptyState.Content>
          <EmptyState.Indicator>
            <LuWand />
          </EmptyState.Indicator>
          <VStack textAlign="center">
            <EmptyState.Title>{title}</EmptyState.Title>
            <EmptyState.Description>{description}</EmptyState.Description>
          </VStack>
          <ButtonGroup>
            <Button
              onClick={() => {
                setSidebarOpen(true);
              }}
            >
              Начать работу
            </Button>
          </ButtonGroup>
        </EmptyState.Content>
      </EmptyState.Root>
      <Sidebar />
    </>
  );
}

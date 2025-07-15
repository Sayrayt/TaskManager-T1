import {
  Button,
  Card,
  Stack,
  Center,
  Textarea,
  Select,
  Portal,
  Box,
  Input,
  Field,
} from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useStore from "@/shared/config/store/store";
import type { Task } from "@/entites/task/model/TaskIteminterface";
import { statuses, priorities, categories } from "@/shared/__mocks__/mocks";
import { v4 as uuidv4 } from "uuid";
import { toaster } from "@/shared/ui/toaster";

export default function CreateTask() {
  const { setSidebarOpen, tasksList, setTasksList } = useStore();
  const [title, setTitle] = useState<Task["title"]>("");
  const [description, setDescription] = useState<Task["description"]>("");
  const [status, setStatus] = useState<Task["status"]>("To Do");
  const [priority, setPriority] = useState<Task["priority"]>("Low");
  const [category, setCategory] = useState<Task["category"]>("Bug");
  const navigate = useNavigate();

  const handleCancel = () => {
    setSidebarOpen(true);
    navigate("/");
  };

  const handleCreate = () => {
    if (title.trim()) {
      const newTask: Task = {
        id: uuidv4(),
        title: title.trim(),
        description: description?.trim() || "Описание отсутствует",
        status: status,
        priority: priority,
        category: category,
      };

      toaster.create({
        description: `Задача "${title}" успешно создана`,
        type: "success",
      });

      setTasksList([newTask, ...tasksList]);

      setSidebarOpen(true);
      navigate("/");
    }
  };

  return (
    <Center>
      <Card.Root maxW="5xl" w={"100%"}>
        <Card.Header>
          <Card.Title pb={5} fontSize={"2xl"}>
            Панель создания задач
          </Card.Title>

          <Field.Root required>
            <Field.Label>
              Заголовок <Field.RequiredIndicator />
            </Field.Label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Введите заголовок"
            />
          </Field.Root>

          <Card.Description as={Box}>
            <Field.Root>
              <Field.Label>Описание</Field.Label>
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Введите описание"
                variant="outline"
              />
              <Field.HelperText>Максимум 500 символов</Field.HelperText>
            </Field.Root>
          </Card.Description>
        </Card.Header>
        <Card.Body>
          <Stack gap="4" w="full">
            <Select.Root
              collection={statuses}
              size="sm"
              width="100%"
              value={[status]}
              onValueChange={(details) =>
                setStatus(details.value[0] as Task["status"])
              }
            >
              <Select.HiddenSelect />
              <Select.Label>Выберите статус</Select.Label>
              <Select.Control>
                <Select.Trigger>
                  <Select.ValueText placeholder="Статус" />
                </Select.Trigger>
                <Select.IndicatorGroup>
                  <Select.Indicator />
                </Select.IndicatorGroup>
              </Select.Control>
              <Portal>
                <Select.Positioner>
                  <Select.Content>
                    {statuses.items.map((status) => (
                      <Select.Item item={status} key={status.value}>
                        {status.label}
                        <Select.ItemIndicator />
                      </Select.Item>
                    ))}
                  </Select.Content>
                </Select.Positioner>
              </Portal>
            </Select.Root>

            <Select.Root
              collection={priorities}
              size="sm"
              width="100%"
              value={[priority]}
              onValueChange={(details) =>
                setPriority(details.value[0] as Task["priority"])
              }
            >
              <Select.HiddenSelect />
              <Select.Label>Выберите приоритет</Select.Label>
              <Select.Control>
                <Select.Trigger>
                  <Select.ValueText placeholder="Приоритет" />
                </Select.Trigger>
                <Select.IndicatorGroup>
                  <Select.Indicator />
                </Select.IndicatorGroup>
              </Select.Control>
              <Portal>
                <Select.Positioner>
                  <Select.Content>
                    {priorities.items.map((priority) => (
                      <Select.Item item={priority} key={priority.value}>
                        {priority.label}
                        <Select.ItemIndicator />
                      </Select.Item>
                    ))}
                  </Select.Content>
                </Select.Positioner>
              </Portal>
            </Select.Root>

            <Select.Root
              collection={categories}
              size="sm"
              width="100%"
              value={[category]}
              onValueChange={(details) =>
                setCategory(details.value[0] as Task["category"])
              }
            >
              <Select.HiddenSelect />
              <Select.Label>Выберите Категорию</Select.Label>
              <Select.Control>
                <Select.Trigger>
                  <Select.ValueText placeholder="Категория" />
                </Select.Trigger>
                <Select.IndicatorGroup>
                  <Select.Indicator />
                </Select.IndicatorGroup>
              </Select.Control>
              <Portal>
                <Select.Positioner>
                  <Select.Content>
                    {categories.items.map((category) => (
                      <Select.Item item={category} key={category.value}>
                        {category.label}
                        <Select.ItemIndicator />
                      </Select.Item>
                    ))}
                  </Select.Content>
                </Select.Positioner>
              </Portal>
            </Select.Root>
          </Stack>
        </Card.Body>
        <Card.Footer justifyContent="flex-end">
          <Button variant="outline" onClick={handleCancel}>
            Отмена
          </Button>
          <Button colorPalette="green" onClick={handleCreate} variant="solid">
            Создать
          </Button>
        </Card.Footer>
      </Card.Root>
    </Center>
  );
}

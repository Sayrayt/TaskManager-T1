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
  HStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Task } from "@/entites/task/model/TaskIteminterface";
import { statuses, priorities, categories } from "@/shared/__mocks__/mocks";
import { v4 as uuidv4 } from "uuid";
import { taskValidationSchema } from "@/shared/model/taskValidationShema";
import * as yup from "yup";
import { format } from "date-fns";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Calendar } from "@/pages/createTask/Calendar";
import { useTaskMutations } from "@/shared/hooks/useTaskMutations";

export default function CreateTask() {
  const navigate = useNavigate();
  const [title, setTitle] = useState<Task["title"]>("");
  const [description, setDescription] = useState<Task["description"]>("");
  const [status, setStatus] = useState<Task["status"]>("To Do");
  const [priority, setPriority] = useState<Task["priority"]>("Low");
  const [category, setCategory] = useState<Task["category"]>("Bug");

  const { createTask } = useTaskMutations();

  const [titleError, setTitleError] = useState<string | null>(null);
  const [descriptionError, setDescriptionError] = useState<string | null>(null);
  const [statusError, setStatusError] = useState<string | null>(null);
  const [priorityError, setPriorityError] = useState<string | null>(null);
  const [categoryError, setCategoryError] = useState<string | null>(null);

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleCancel = () => {
    navigate("/");
  };

  const handleCreate = async () => {
    try {
      await taskValidationSchema.validate(
        { title, description, status, priority, category },
        { abortEarly: false },
      );

      const now = new Date();
      const dateToFormat = selectedDate ?? now;
      const date = format(dateToFormat, "dd.MM.yyyy");

      const newTask: Task = {
        id: uuidv4(),
        title: title.trim(),
        description: description?.trim() || "Описание отсутствует",
        status,
        priority,
        category,
        date,
      };

      createTask.mutate(newTask);

      setTitle("");
      setDescription("");
      setStatus("To Do");
      setPriority("Low");
      setCategory("Bug");
      setSelectedDate(null);

      navigate("/");
    } catch (err) {
      if (err instanceof yup.ValidationError) {
        const errorMap: Record<string, string> = {};
        err.inner.forEach((e) => {
          if (e.path) {
            errorMap[e.path] = e.message;
          }
        });

        setTitleError(errorMap.title || null);
        setDescriptionError(errorMap.description || null);
        setStatusError(errorMap.status || null);
        setPriorityError(errorMap.priority || null);
        setCategoryError(errorMap.category || null);
      }
    }
  };

  const validateField = async (fieldName: string, value: string) => {
    try {
      await taskValidationSchema.validateAt(fieldName, {
        title,
        description,
        status,
        priority,
        category,
        [fieldName]: value,
      });

      switch (fieldName) {
        case "title":
          setTitleError(null);
          break;
        case "description":
          setDescriptionError(null);
          break;
        case "status":
          setStatusError(null);
          break;
        case "priority":
          setPriorityError(null);
          break;
        case "category":
          setCategoryError(null);
          break;
      }
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        switch (fieldName) {
          case "title":
            setTitleError(error.message);
            break;
          case "description":
            setDescriptionError(error.message);
            break;
          case "status":
            setStatusError(error.message);
            break;
          case "priority":
            setPriorityError(error.message);
            break;
          case "category":
            setCategoryError(error.message);
            break;
        }
      }
    }
  };

  return (
    <Center>
      <Card.Root maxW="5xl" w="100%">
        <Card.Header>
          <HStack>
            <Card.Title pb={5} fontSize="2xl">
              Панель создания задач
            </Card.Title>
          </HStack>

          <Field.Root required>
            <Field.Label>
              Заголовок <Field.RequiredIndicator />
            </Field.Label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Введите заголовок"
              onBlur={() => validateField("title", title)}
            />
            {titleError && (
              <Box fontSize="sm" color="red.500" mt="1">
                {titleError}
              </Box>
            )}
            <Field.HelperText>Максимум 50 символов</Field.HelperText>
          </Field.Root>

          <Card.Description as={Box}>
            <Field.Root>
              <Field.Label>Описание</Field.Label>
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                onBlur={() => validateField("description", description ?? "")}
                placeholder="Введите описание"
                variant="outline"
              />
              {descriptionError && (
                <Box fontSize="sm" color="red.500" mt="1">
                  {descriptionError}
                </Box>
              )}
              <Field.HelperText>
                Максимум 500 символов <br />
                Недопустимые символы !@#$%^&*()_+=
              </Field.HelperText>
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
              onBlur={() => validateField("status", status)}
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
            {statusError && (
              <Box fontSize="sm" color="red.500" mt="1">
                {statusError}
              </Box>
            )}

            <Select.Root
              collection={priorities}
              size="sm"
              width="100%"
              value={[priority]}
              onValueChange={(details) =>
                setPriority(details.value[0] as Task["priority"])
              }
              onBlur={() => validateField("priority", priority)}
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
            {priorityError && (
              <Box fontSize="sm" color="red.500" mt="1">
                {priorityError}
              </Box>
            )}

            <Select.Root
              collection={categories}
              size="sm"
              width="100%"
              value={[category]}
              onValueChange={(details) =>
                setCategory(details.value[0] as Task["category"])
              }
              onBlur={() => validateField("category", category)}
            >
              <Select.HiddenSelect />
              <Select.Label>Выберите категорию</Select.Label>
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
            {categoryError && (
              <Box fontSize="sm" color="red.500" mt="1">
                {categoryError}
              </Box>
            )}
            <Field.Root>
              <Field.Label>Дата создания задачи</Field.Label>
              <DatePicker
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                dateFormat="dd.MM.yyyy"
                customInput={
                  <Calendar
                    selectedDate={selectedDate}
                    onDateChange={setSelectedDate}
                  />
                }
              />
            </Field.Root>
          </Stack>
        </Card.Body>

        <Card.Footer justifyContent="flex-end">
          <Button aria-label="Отмена" variant="outline" onClick={handleCancel}>
            Отмена
          </Button>
          <Button
            aria-label="Создать"
            colorPalette="green"
            onClick={handleCreate}
            variant="solid"
          >
            Создать
          </Button>
        </Card.Footer>
      </Card.Root>
    </Center>
  );
}

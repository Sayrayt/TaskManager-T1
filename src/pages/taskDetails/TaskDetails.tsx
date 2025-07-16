import {
  Button,
  Card,
  Stack,
  Center,
  Editable,
  Select,
  Portal,
  Box,
  Field,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import useStore from "@/shared/config/store/store";
import { useNavigate } from "react-router-dom";
import type { Task } from "@/entites/task/model/TaskIteminterface";
import { statuses, priorities, categories } from "@/shared/__mocks__/mocks";
import { toaster } from "@/shared/ui/toaster";
import { taskValidationSchema } from "@/shared/model/taskValidationShema";
import * as yup from "yup";
import { format } from "date-fns";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Calendar } from "@/pages/createTask/Calendar";

export default function TaskDetails() {
  const { editableTask, updateTask, setEditableTask } = useStore();
  const navigate = useNavigate();
  const [title, setTitle] = useState<Task["title"]>("");
  const [description, setDescription] = useState<Task["description"]>("");
  const [status, setStatus] = useState<Task["status"]>("To Do");
  const [priority, setPriority] = useState<Task["priority"]>("Low");
  const [category, setCategory] = useState<Task["category"]>("Bug");

  const [titleError, setTitleError] = useState<string | null>(null);
  const [descriptionError, setDescriptionError] = useState<string | null>(null);
  const [statusError, setStatusError] = useState<string | null>(null);
  const [priorityError, setPriorityError] = useState<string | null>(null);
  const [categoryError, setCategoryError] = useState<string | null>(null);

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  useEffect(() => {
    const editable = editableTask;

    if (!editable?.id) {
      navigate("/", { state: { openSidebar: true } });
    }
  }, [navigate]);

  useEffect(() => {
    if (editableTask?.title) {
      setTitle(editableTask.title);
      setDescription(editableTask.description || "Описание отсутсвует");
      setStatus(editableTask.status);
      setPriority(editableTask.priority);
      setCategory(editableTask.category);
    }
  }, [editableTask]);

  const handleCancel = () => {
    setEditableTask({} as Task);
    navigate("/", { state: { openSidebar: true } });
  };

  const handleSave = async () => {
    try {
      await taskValidationSchema.validate(
        {
          title,
          description,
          status,
          priority,
          category,
        },
        { abortEarly: false },
      );

      const now = new Date();
      const dateToFormat = selectedDate ?? now;
      const date = format(dateToFormat, "dd.MM.yyyy");

      const updatedTask: Task = {
        ...editableTask,
        title,
        description,
        status,
        priority,
        category,
        date,
      };

      if (updateTask) {
        updateTask(updatedTask);
      }

      toaster.create({
        description: `Задача "${title}" успешно отредактирована`,
        type: "success",
      });

      navigate("/", { state: { openSidebar: true } });

      setTitleError(null);
      setDescriptionError(null);
      setStatusError(null);
      setPriorityError(null);
      setCategoryError(null);
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
        statuses: status,
        priorities: priority,
        categories: category,
        [fieldName]: value,
      });
      switch (fieldName) {
        case "title":
          setTitleError(null);
          break;
        case "description":
          setDescriptionError(null);
          break;
        case "statuses":
          setStatusError(null);
          break;
        case "priorities":
          setPriorityError(null);
          break;
        case "categories":
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
          case "statuses":
            setStatusError(error.message);
            break;
          case "priorities":
            setPriorityError(error.message);
            break;
          case "categories":
            setCategoryError(error.message);
            break;
        }
      }
    }
  };

  return (
    <Center>
      <Card.Root maxW="5xl" w={"100%"}>
        <Card.Header gap={5}>
          <Card.Title fontSize={"2xl"}>Панель редактирования задач</Card.Title>

          <Field.Root required>
            <Field.Label>
              Заголовок <Field.RequiredIndicator />
            </Field.Label>
            <Editable.Root
              textAlign="start"
              value={title}
              onValueChange={(e) => setTitle(e.value)}
              onSubmit={() => validateField("title", title)}
              placeholder="Заголовок"
            >
              <Editable.Preview cursor="pointer" />
              <Editable.Input
                _invalid={titleError ? { borderColor: "red.500" } : undefined}
              />
            </Editable.Root>
            {titleError && (
              <Box fontSize="sm" color="red.500" mt="1">
                {titleError}
              </Box>
            )}
            <Field.HelperText>Максимум 50 символов</Field.HelperText>
          </Field.Root>

          <Field.Root>
            <Field.Label>Описание</Field.Label>
            <Card.Description w={"100%"} as={Box}>
              <Editable.Root
                textAlign="start"
                value={description}
                onValueChange={(e) => setDescription(e.value)}
                onSubmit={() => validateField("description", description ?? "")}
                placeholder="Описание"
              >
                <Editable.Preview cursor="pointer" />
                <Editable.Textarea
                  _invalid={
                    descriptionError ? { borderColor: "red.500" } : undefined
                  }
                />
              </Editable.Root>
              {descriptionError && (
                <Box fontSize="sm" color="red.500" mt="1">
                  {descriptionError}
                </Box>
              )}
              <Field.HelperText>
                Максимум 500 символов <br />
                Недопустимые символы !@#$%^&*()_+=
              </Field.HelperText>
            </Card.Description>
          </Field.Root>
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
            aria-label="Сохранить"
            colorPalette="green"
            onClick={handleSave}
            variant="solid"
          >
            Сохранить
          </Button>
        </Card.Footer>
      </Card.Root>
    </Center>
  );
}

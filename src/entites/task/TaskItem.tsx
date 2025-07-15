import {
  Box,
  Card,
  HStack,
  Badge,
  Button,
  Status,
  IconButton,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import useStore from "@/shared/config/store/store";
import type { Task } from "@/entites/task/model/TaskIteminterface";
import {
  getPriorityColor,
  getStatusColor,
} from "@/entites/task/model/taskLogic";
import { toaster } from "@/shared/ui/toaster";
import { LuTrash2 } from "react-icons/lu";

interface TaskItemProps {
  task: Task;
  onTaskClick: () => void;
}

export default function TaskItem({ task, onTaskClick }: TaskItemProps) {
  const { setEditableTask, tasksList, setTasksList } = useStore();
  const navigate = useNavigate();

  const handleEditClick = () => {
    navigate(`/task/${task.id}`);
    onTaskClick();
  };

  const handleDeleteTask = () => {
    const updatedTasksList = tasksList.filter((el) => el.id !== task.id);
    setTasksList(updatedTasksList);
    toaster.create({
      description: `Задача "${task.title}" успешно удалена`,
      type: "success",
    });
  };

  return (
    <Card.Root flexDirection="row" overflow="hidden" maxW="xl">
      <Box flex={1}>
        <Card.Header>
          <HStack alignItems={"flex-end"} justifyContent={"space-between"}>
            <Card.Title mb="2">{task.title}</Card.Title>
            <IconButton
              size={"xl"}
              onClick={handleDeleteTask}
              variant={"subtle"}
            >
              <LuTrash2 />
            </IconButton>
          </HStack>
        </Card.Header>

        <Card.Body>
          <Card.Description>
            {task.description ?? "Описание отсутствует"}
          </Card.Description>
          <HStack mt="4">
            <Badge>
              <Status.Root colorPalette={getStatusColor(task.status)}>
                <Status.Indicator />
              </Status.Root>
              {task.status}
            </Badge>
            <Badge colorPalette={getPriorityColor(task.priority)}>
              {task.priority}
            </Badge>
            <Badge>{task.category}</Badge>
          </HStack>
        </Card.Body>

        <Card.Footer>
          <Button
            onClick={() => {
              setEditableTask(task);
              handleEditClick();
            }}
          >
            Редактировать
          </Button>
        </Card.Footer>
      </Box>
    </Card.Root>
  );
}

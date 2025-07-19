import { Box } from "@chakra-ui/react";
import TaskItem from "@/entites/task/TaskItem";
import type { Task } from "@/entites/task/model/TaskIteminterface";

interface TasksListProps {
  tasks: Task[];
}

export default function TasksList({ tasks }: TasksListProps) {
  return (
    <Box as="ul">
      {tasks.map((task) => (
        <Box as="li" key={task.id}>
          <TaskItem task={task} />
        </Box>
      ))}
    </Box>
  );
}

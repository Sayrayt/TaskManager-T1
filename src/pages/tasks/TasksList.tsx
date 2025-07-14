import { Box } from "@chakra-ui/react";
import TaskItem from "@/pages/tasks/TaskItem";
import type { Task } from "@/pages/tasks/TaskItem";

interface TasksListProps {
    tasksList: Task[];
    onTaskClick: () => void;
}

export default function TasksList({ tasksList, onTaskClick }: TasksListProps) {
    return (
        <Box as="ul">
            {tasksList.map((task) => (
                <Box as="li" key={task.id}>
                    <TaskItem task={task} onTaskClick={onTaskClick} />
                </Box>
            ))}
        </Box>
    );
}

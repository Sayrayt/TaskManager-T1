import { Box, Card, HStack, Badge, Button, Status } from "@chakra-ui/react"
import { useNavigate } from 'react-router-dom';
import useStore from "@/app/store/store";

export interface Task {
    id: number;
    title: string;
    description?: string;
    status: "To Do" | "In Progress" | "Done";
    priority: "Low" | "Medium" | "High";
    category: "Bug" | "Feature" | "Documentation" | "Refactor" | "Test";
}

interface TaskItemProps {
    task: Task;
    onTaskClick: () => void;
}

export default function TaskItem({ task, onTaskClick }: TaskItemProps) {
    const { setEditableTask } = useStore();
    const navigate = useNavigate();

    function handleEditClick() {
        navigate(`/task/${task.id}`);
        onTaskClick();
    }

    const getPriorityColor = (priority: Task["priority"]) => {
        switch (priority) {
            case "High":
                return "red";
            case "Medium":
                return "orange";
            case "Low":
                return "green";
            default:
                return undefined;
        }
    }

    const getStatusColor = (priority: Task["status"]) => {
        switch (priority) {
            case "To Do":
                return undefined;
            case "In Progress":
                return "blue";
            case "Done":
                return "green";
            default:
                return undefined;
        }
    }

    return (

        <Card.Root flexDirection="row" overflow="hidden" maxW="xl">
            <Box>
                <Card.Body>
                    <Card.Title mb="2">{task.title}</Card.Title>
                    <Card.Description>
                        {task.description ?? "Описание отсутствует"}
                    </Card.Description>
                    <HStack mt="4">
                        <Badge>
                            <Status.Root colorPalette={getStatusColor(task.status)}>
                                <Status.Indicator />
                            </Status.Root>
                            {task.status}</Badge>
                        <Badge colorPalette={getPriorityColor(task.priority)}>{task.priority}</Badge>
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
    )
}
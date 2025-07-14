import {
    Button,
    Card,
    Stack,
    Center,
    Editable,
    Select,
    Portal,
    createListCollection,
    Box
} from "@chakra-ui/react";
import useStore from "@/app/store/store";
import { useState, useEffect } from "react";
import type { Task } from "@/pages/tasks/TaskItem";
import { useNavigate } from 'react-router-dom';

const statuses = createListCollection({
    items: [
        { label: "To Do", value: "To Do" },
        { label: "In Progress", value: "In Progress" },
        { label: "Done", value: "Done" },
    ],
})

const priorities = createListCollection({
    items: [
        { label: "Low", value: "Low" },
        { label: "Medium", value: "Medium" },
        { label: "High", value: "High" },
    ]
})

const categories = createListCollection({
    items: [
        { label: "Bug", value: "Bug" },
        { label: "Feature", value: "Feature" },
        { label: "Documentation", value: "Documentation" },
        { label: "Refactor", value: "Refactor" },
        { label: "Test", value: "Test" },
    ],
})

export default function TaskDetails() {
    const { editableTask, setEditableTask, tasksList, setTasksList } = useStore();
    const navigate = useNavigate();
    const [title, setTitle] = useState<Task["title"]>("");
    const [description, setDescription] = useState<Task["description"]>("");
    const [status, setStatus] = useState<Task["status"]>("To Do");
    const [priority, setPriority] = useState<Task["priority"]>("Low");
    const [category, setCategory] = useState<Task["category"]>("Bug");

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

    const handleSave = () => {
        const updatedTask: Task = {
            ...editableTask,
            title,
            description,
            status,
            priority,
            category,
        };

        if (tasksList) {
            const updatedList = tasksList.map((t: Task) =>
                t.id === updatedTask.id ? updatedTask : t
            );
            setTasksList(updatedList);
        }

        setEditableTask({} as Task);
        navigate("/", { state: { openSidebar: true } });
    };


    return (
        <Center>
            <Card.Root maxW="xl" w={"100%"}>
                <Card.Header>
                    <Card.Title>
                        <Editable.Root
                            textAlign="start"
                            value={title}
                            onValueChange={(e) => setTitle(e.value)}
                            placeholder="Заголовок"
                        >
                            <Editable.Preview />
                            <Editable.Input />
                        </Editable.Root>
                    </Card.Title>
                    <Card.Description as={Box}>
                        <Editable.Root
                            textAlign="start"
                            value={description}
                            onValueChange={(e) => setDescription(e.value)}
                            placeholder="Описание">
                            <Editable.Preview />
                            <Editable.Textarea />
                        </Editable.Root>
                    </Card.Description>
                </Card.Header>
                <Card.Body>
                    <Stack gap="4" w="full">

                        <Select.Root
                            collection={statuses}
                            size="sm"
                            width="100%"
                            value={[status]}
                            onValueChange={(details) => setStatus(details.value[0] as Task["status"])}
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
                                            <Select.Item item={status} key={status.value} >
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
                            onValueChange={(details) => setPriority(details.value[0] as Task["priority"])}
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
                            onValueChange={(details) => setCategory(details.value[0] as Task["category"])}
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
                    <Button variant="outline" onClick={handleCancel}>Отмена</Button>
                    <Button colorPalette="green" onClick={handleSave} variant="solid">Сохранить</Button>
                </Card.Footer>
            </Card.Root>
        </Center >
    )
}
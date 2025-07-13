import { Box } from "@chakra-ui/react";

export default function TasksList() {
    const list = [{ id: 1, title: "Заголовок 1", description: "Отсутсвует" }, { id: 2, title: "Заголовок 2", description: "Отсутсвует" }]
    return (
        <Box as="ul">
            {list.map((el, index) => <li key={index}>{el.title}</li>)}
        </Box>
    )
}
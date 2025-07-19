import { useNavigate } from "react-router-dom";
import { Center, VStack, Text, Button, Icon } from "@chakra-ui/react";
import { LuDrama } from "react-icons/lu";

export default function ErrorPage() {
  const navigate = useNavigate();

  return (
    <Center height="100vh" bg="gray.50">
      <VStack gap={4}>
        <Icon as={LuDrama} boxSize={12} />
        <Text fontSize="2xl" fontWeight="bold">
          Произошла ошибка
        </Text>
        <Text>Попробуйте немного позже</Text>
        <Button
          aria-label="Вернуться на главную"
          onClick={() => navigate("/")}
          colorScheme="blue"
        >
          Вернуться на главную
        </Button>
      </VStack>
    </Center>
  );
}

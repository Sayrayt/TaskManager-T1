import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Center, VStack, Text, Button } from "@chakra-ui/react";

export default function ErrorPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/");
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <Center height="100vh" bg="gray.50">
      <VStack gap={4}>
        <Text fontSize="2xl" fontWeight="bold">
          Произошла ошибка
        </Text>
        <Text>Вы будете перенаправлены на главную страницу</Text>
        <Button onClick={() => navigate("/")} colorScheme="blue">
          Вернуться сейчас
        </Button>
      </VStack>
    </Center>
  );
}

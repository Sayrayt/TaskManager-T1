import { Center, Spinner, Text, VStack } from "@chakra-ui/react";

export default function Loading() {
  return (
    <Center height="100vh" bg="gray.50">
      <VStack gap={4}>
        <Spinner size="xl" color="blue.500" />
        <Text fontSize="lg" fontWeight="medium" color="gray.600">
          Загрузка данных...
        </Text>
      </VStack>
    </Center>
  );
}

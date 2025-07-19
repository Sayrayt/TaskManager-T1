import { useSuspenseQuery } from "@tanstack/react-query";
import tasksApiService from "@/shared/api/tasksApiService";
import type { Task } from "@/entites/task/model/TaskIteminterface";
import type { QueryFunctionContext } from "@tanstack/react-query";

export const useTasks = () => {
  const getTasks = useSuspenseQuery<Task[]>({
    queryKey: ["tasks"],
    queryFn: async () => {
      try {
        const response = await tasksApiService.getTasksList();
        return response.data;
      } catch (error) {
        console.error(
          "Ошибка загрузки задач, используются моковые данные:",
          error,
        );
        throw error;
      }
    },
    staleTime: 1000 * 60 * 5,
  });

  return {
    getTasks,
  };
};

export const useTaskById = (taskId?: string) => {
  console.log("taskId", taskId);

  return useSuspenseQuery<Task>({
    queryKey: ["task", taskId],
    queryFn: async ({ queryKey }: QueryFunctionContext) => {
      const [, id] = queryKey as [string, string];
      if (!id) throw new Error("Task ID is required");
      try {
        const response = await tasksApiService.getTaskById(id);
        return response.data;
      } catch (error) {
        console.error("Ошибка загрузки задачи:", error);
        throw error;
      }
    },
    staleTime: 1000 * 60 * 5,
  });
};

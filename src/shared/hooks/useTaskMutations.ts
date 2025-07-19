import { useMutation, useQueryClient } from "@tanstack/react-query";
import tasksApiService from "@/shared/api/tasksApiService";
import type { Task } from "@/entites/task/model/TaskIteminterface";
import { toaster } from "@/shared/ui/toaster";

export const useTaskMutations = () => {
  const queryClient = useQueryClient();

  const createTask = useMutation({
    mutationFn: (task: Task) => tasksApiService.createTask(task),
    onSuccess: () => {
      toaster.create({
        type: "success",
        description: "Задача создана",
      });
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
    onError: () => {
      toaster.create({
        type: "error",
        description: "Ошибка создания задачи",
      });
    },
  });

  const updateTask = useMutation({
    mutationFn: (task: Task) => tasksApiService.updateTask(task),
    onSuccess: () => {
      toaster.create({
        type: "success",
        description: "Задача успешно обновлена",
      });
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
    onError: () => {
      toaster.create({
        type: "error",
        description: "Ошибка обновления задачи",
      });
    },
  });

  const deleteTask = useMutation({
    mutationFn: (task: Task) => tasksApiService.deleteTask(task),
    onSuccess: () => {
      toaster.create({
        type: "success",
        description: "Задача успешно удалена",
      });
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
    onError: () => {
      toaster.create({
        type: "error",
        description: "Ошибка удаления задачи",
      });
    },
  });

  return {
    createTask,
    updateTask,
    deleteTask,
  };
};

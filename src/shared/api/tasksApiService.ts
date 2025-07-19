import { instance } from "@/shared/api/apiConfig";
import type { Task } from "@/entites/task/model/TaskIteminterface";

const tasksApiService = {
  updateTask(task: Task) {
    return instance.patch(`/tasks/${task.id}`, task);
  },

  getTasksList() {
    return instance.get("/tasks");
  },

  getTaskById(id: string) {
    return instance.get(`/tasks/${id}`);
  },

  createTask(task: Task) {
    return instance.post("/tasks", task);
  },

  deleteTask(task: Task) {
    return instance.delete(`/tasks/${task.id}`, { data: task });
  },
};

export default tasksApiService;

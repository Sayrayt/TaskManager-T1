import { instance } from "@/shared/api/apiConfig";
import type { Task } from "@/entites/task/model/TaskIteminterface";

const tasksApiService = {
  updateTask(data: Task) {
    return instance.put("/updateTask", data);
  },

  getTasksList() {
    return instance.get("/tasksList");
  },
};

export default tasksApiService;

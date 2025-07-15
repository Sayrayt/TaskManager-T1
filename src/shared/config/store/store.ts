import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { createTasksSlice } from "./tasksSlice";
import type { TasksSlice } from "./tasksSlice";

const useStore = create<TasksSlice>()(
  devtools(
    (...a) => ({
      ...createTasksSlice(...a),
    }),
    { enabled: !import.meta.env.PROD },
  ),
);

export default useStore;

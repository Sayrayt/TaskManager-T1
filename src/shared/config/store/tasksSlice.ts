import type { StateCreator } from "zustand";
import type { Task } from "@/entites/task/model/TaskIteminterface";

export interface TasksSlice {
  isSidebarOpen: boolean;
  editableTask: Task;
  setEditableTask: (value: Task) => void;
  setSidebarOpen: (value: boolean) => void;
}

export const createTasksSlice: StateCreator<TasksSlice> = (set) => ({
  isSidebarOpen: false,
  editableTask: {} as Task,
  setEditableTask: (newValue) => set(() => ({ editableTask: newValue })),
  setSidebarOpen: (value) => set(() => ({ isSidebarOpen: value })),
});

import type { StateCreator } from "zustand";
import type { Task } from "@/entites/task/model/TaskIteminterface";
import { tasksList } from "@/shared/config/store/__mocks__/storeMocks";

export interface TasksSlice {
  isSidebarOpen: boolean;
  editableTask: Task;
  tasksList: Task[];
  updateTask: (value: Task) => void;
  setEditableTask: (value: Task) => void;
  setTasksList: (value: Task[]) => void;
  setSidebarOpen: (value: boolean) => void;
  createTask: (value: Task) => void;
  deleteTask: (value: Task) => void;
}

export const createTasksSlice: StateCreator<TasksSlice> = (set) => ({
  isSidebarOpen: true,
  editableTask: {} as Task,
  tasksList: tasksList,
  setTasksList: (newValue) => set(() => ({ tasksList: newValue })),
  setEditableTask: (newValue) => set(() => ({ editableTask: newValue })),
  setSidebarOpen: (value) => set(() => ({ isSidebarOpen: value })),
  createTask: (task) =>
    set((state) => ({ tasksList: [task, ...state.tasksList] })),
  updateTask: (updatedTask) =>
    set((state) => ({
      tasksList: state.tasksList.map((t) =>
        t.id === updatedTask.id ? updatedTask : t,
      ),
      editableTask: updatedTask,
    })),
  deleteTask: (task) =>
    set((state) => ({
      tasksList: state.tasksList.filter((el) => el.id !== task.id),
    })),
});

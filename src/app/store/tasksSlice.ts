import type { StateCreator } from "zustand";
import type { Task } from "@/pages/tasks/TaskItem";
import { tasksList } from "@/app/store/__mocks__/storeMocks";

export interface TasksSlice {
    isSidebarOpen: boolean;
    editableTask: Task;
    tasksList: Task[];
    setEditableTask: (value: any) => void;
    setTasksList: (value: any) => void;
    setSidebarOpen: (value: boolean) => void;
}

export const createTasksSlice: StateCreator<TasksSlice> = (set) => ({
    isSidebarOpen: true,
    editableTask: {} as Task,
    tasksList: tasksList,
    setEditableTask: (newValue) => set(() => ({ editableTask: newValue })),
    setTasksList: (newValue) => set(() => ({ tasksList: newValue })),
    setSidebarOpen: (value) => set(() => ({ isSidebarOpen: value })),
});

import type { Task } from "@/entites/task/model/TaskIteminterface";

export const getPriorityColor = (priority: Task["priority"]) => {
  switch (priority) {
    case "High":
      return "red";
    case "Medium":
      return "orange";
    case "Low":
      return "green";
    default:
      return undefined;
  }
};

export const getStatusColor = (priority: Task["status"]) => {
  switch (priority) {
    case "To Do":
      return undefined;
    case "In Progress":
      return "blue";
    case "Done":
      return "green";
    default:
      return undefined;
  }
};

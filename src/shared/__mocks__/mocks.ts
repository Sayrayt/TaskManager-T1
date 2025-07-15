import { createListCollection } from "@chakra-ui/react";

export const statuses = createListCollection({
  items: [
    { label: "To Do", value: "To Do" },
    { label: "In Progress", value: "In Progress" },
    { label: "Done", value: "Done" },
  ],
});

export const priorities = createListCollection({
  items: [
    { label: "Low", value: "Low" },
    { label: "Medium", value: "Medium" },
    { label: "High", value: "High" },
  ],
});

export const categories = createListCollection({
  items: [
    { label: "Bug", value: "Bug" },
    { label: "Feature", value: "Feature" },
    { label: "Documentation", value: "Documentation" },
    { label: "Refactor", value: "Refactor" },
    { label: "Test", value: "Test" },
  ],
});

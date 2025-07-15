import * as yup from "yup";

const safeText = /^[\p{L}\p{N}\s\-.]*$/u;

export const taskValidationSchema = yup.object({
  title: yup
    .string()
    .max(50, "Слишком длинный заголовок. Максимум 50 символов")
    .matches(safeText, "Недопустимые символы")
    .required("Заголовок является обязательный параметром"),
  description: yup
    .string()
    .max(500, "Слишком длинное описание. Максимум 500 символов")
    .matches(safeText, "Недопустимые символы")
    .optional(),
  statuses: yup.mixed().oneOf(["To Do", "In Progress", "Done"]),
  priorities: yup.mixed().oneOf(["Low", "Medium", "High"]),
  categories: yup
    .mixed()
    .oneOf(["Bug", "Feature", "Documentation", "Refactor", "Test"]),
});

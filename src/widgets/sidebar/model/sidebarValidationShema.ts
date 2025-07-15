import * as yup from "yup";

const safeText = /^[\p{L}\p{N}\s\-.]*$/u;

export const searchSchema = yup.object({
  searchQuery: yup
    .string()
    .max(50, "Слишком длинный запрос")
    .matches(safeText, "Недопустимые символы")
    .optional(),
});

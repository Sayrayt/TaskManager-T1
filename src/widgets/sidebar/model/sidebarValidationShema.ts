import * as yup from "yup";

export const searchSchema = yup.object({
  searchQuery: yup
    .string()
    .max(50, "Слишком длинный запрос")
    .matches(/^[\w\s\-.]*$/, "Недопустимые символы")

    .optional(),
});

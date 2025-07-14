import type { Task } from "@/pages/tasks/TaskItem";

export const tasksList: Task[] = [
    {
        id: 1,
        title: "Исправить падение приложения",
        description: "Ошибка при открытии настроек",
        status: "To Do",
        priority: "High",
        category: "Bug"
    },
    {
        id: 2,
        title: "Добавить авторизацию",
        description: "Реализовать вход через почту и пароль",
        status: "In Progress",
        priority: "Medium",
        category: "Feature"
    },
    {
        id: 3,
        title: "Написать документацию по API",
        description: "Описание всех эндпоинтов REST API",
        status: "Done",
        priority: "Low",
        category: "Documentation"
    },
    {
        id: 4,
        title: "Рефакторинг компонента TaskItem",
        description: "Упростить логику отображения статуса",
        status: "To Do",
        priority: "Medium",
        category: "Refactor"
    },
    {
        id: 5,
        title: "Добавить юнит-тесты для TaskList",
        description: "Покрыть основной функционал тестами",
        status: "In Progress",
        priority: "High",
        category: "Test"
    },
    {
        id: 6,
        title: "Исправить отображение даты",
        description: "Некорректный формат на странице задач",
        status: "Done",
        priority: "Low",
        category: "Bug"
    },
    {
        id: 7,
        title: "Добавить тёмную тему",
        description: "Переключатель темы и сохранение в localStorage",
        status: "To Do",
        priority: "High",
        category: "Feature"
    },
    {
        id: 8,
        title: "Обновить README",
        description: "Добавить инструкции по запуску проекта",
        status: "Done",
        priority: "Medium",
        category: "Documentation"
    },
    {
        id: 9,
        title: "Разделение логики Sidebar на хуки",
        description: "Вынести управление состоянием в кастомные хуки",
        status: "In Progress",
        priority: "Medium",
        category: "Refactor"
    },
    {
        id: 10,
        title: "Покрытие e2e-тестами авторизации",
        description: "Проверка успешного и неуспешного входа",
        status: "To Do",
        priority: "High",
        category: "Test"
    }
];

import { lazy, Suspense } from "react";
import { createBrowserRouter, Route, createRoutesFromElements } from "react-router-dom";
import Loading from "@/pages/loading/Loading"

const Home = lazy(() => import("@/pages/home/Home"));
const TaskItem = lazy(() => import("@/pages/tasks/TaskItem"));

const Router = createBrowserRouter(
    createRoutesFromElements(
        <Route
            path="/"
            element={
                <Suspense fallback={<Loading />}>
                    <Home />
                </Suspense>
            }
            errorElement={<h1>Ошибка</h1>}
        >
            <Route
                path="task/:taskId"
                element={
                    <Suspense fallback={<Loading />}>
                        <TaskItem />
                    </Suspense>
                }
                errorElement={<h1>Ошибка</h1>}
            />
        </Route>
    )
);

export default Router;
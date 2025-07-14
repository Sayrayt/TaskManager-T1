import { lazy, Suspense } from "react";
import { createBrowserRouter, Route, createRoutesFromElements } from "react-router-dom";
import Loading from "@/pages/loading/Loading";
import ErrorPage from "@/pages/errorPage/ErrorPage";

const Home = lazy(() => import("@/pages/home/Home"));
const TaskDetails = lazy(() => import("@/pages/tasks/TaskDetails"));

const Router = createBrowserRouter(
    createRoutesFromElements(
        <Route
            path="/"
            element={
                <Suspense fallback={<Loading />}>
                    <Home />
                </Suspense>
            }
            errorElement={<ErrorPage />}
        >
            <Route
                path="task/:taskId"
                element={
                    <Suspense fallback={<Loading />}>
                        <TaskDetails />
                    </Suspense>
                }
                errorElement={<ErrorPage />}
            />
        </Route>
    )
);

export default Router;
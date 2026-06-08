import { createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "../features/auth/components/ProtectedRoute";
import LoginPage from "../features/auth/pages/LoginPage";
import RegisterPage from "../features/auth/pages/RegisterPage";
import Dashboard from "../features/dashboard/pages/Dashboard";
import CreateTaskPage from "../features/dashboard/pages/CreateTaskPage"
import AllTasksPage from "../features/dashboard/pages/AllTasksPage"
import DashboardLayout from "../layouts/DashboardLayout";


export const router = createBrowserRouter([
    { path: "/", element: <LoginPage /> },
    { path: "/register", element: <RegisterPage /> },

    {
        path: "/dashboard",
        element: (
            <ProtectedRoute>
                <DashboardLayout />
            </ProtectedRoute>
        ),
        children: [
            { index: true, element: <Dashboard /> },
            { path: "create-task", element: <CreateTaskPage /> },
            { path: "tasks", element: <AllTasksPage /> },
        ],
    },
]);

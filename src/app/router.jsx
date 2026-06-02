import { createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "../features/auth/components/ProtectedRoute";

import LoginPage from "../features/auth/pages/LoginPage";
import RegisterPage from "../features/auth/pages/RegisterPage";
import Dashboard from "../features/dashboard/pages/Dashboard";
import CreateTaskPage from "../features/dashboard/pages/CreateTaskPage"
import AllTasksPage from "../features/dashboard/pages/AllTasksPage"
import EditTaskPage from "../features/dashboard/pages/EditTaskPage";

export const router = createBrowserRouter([
    { path: "/", element: <LoginPage /> },
    { path: "/register", element: <RegisterPage /> },

    { path: "/dashboard", element: (<ProtectedRoute><Dashboard /></ProtectedRoute>) },
    { path: "/createTaskPage", element: (<ProtectedRoute><CreateTaskPage /></ProtectedRoute>) },
    { path: "/allTasksPage", element: (<ProtectedRoute><AllTasksPage /></ProtectedRoute>) },
    { path: "/editTasksPage", element: (<ProtectedRoute><EditTaskPage /></ProtectedRoute>) },
])
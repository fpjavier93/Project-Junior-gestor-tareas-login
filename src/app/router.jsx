import { createBrowserRouter } from "react-router-dom";

import LoginPage from "../features/auth/pages/LoginPage";
import RegisterPage from "../features/auth/pages/RegisterPage";
import Dashboard from "../features/dashboard/pages/Dashboard";
import CreateTaskPage from "../features/dashboard/pages/CreateTaskPage"

export const router = createBrowserRouter([
    { path: "/", element: <LoginPage /> },
    { path: "/dashboard", element: <Dashboard /> },
    { path: "/register", element: <RegisterPage /> },
    { path: "/createTaskPage", element: <CreateTaskPage /> },

])
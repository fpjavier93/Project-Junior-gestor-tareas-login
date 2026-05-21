import { createBrowserRouter } from "react-router-dom";

import LoginPage from "../features/auth/pages/LoginPage";
import RegisterPage from "../features/auth/pages/RegisterPage";
import Dashboard from "../features/auth/pages/Dashboard";

export const router = createBrowserRouter([
    {path: "/", element: <Dashboard/>},
    {path: "/register",element: <RegisterPage/>},
    {path: "/dashboard", element: <Dashboard/>}
])
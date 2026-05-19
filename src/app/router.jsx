import { createBrowserRouter } from "react-router-dom";

import LoginPage from "../features/auth/pages/LoginPage";
import SignInPage from "../features/auth/pages/SignInPage";

export const router = createBrowserRouter([
    {path: "/", element: <LoginPage />},
    {path: "/signin",element: <SignInPage />}
])
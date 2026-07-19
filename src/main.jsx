import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { RouterProvider } from "react-router-dom"
import { AuthProvider } from "./features/auth/context/AuthContext"
import { TooltipProvider } from "@/components/ui/tooltip"

import "./index.css"
import { router } from "./app/router"

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <TooltipProvider>
        <RouterProvider router={router} />
      </TooltipProvider>
    </AuthProvider>
  </StrictMode>,
)
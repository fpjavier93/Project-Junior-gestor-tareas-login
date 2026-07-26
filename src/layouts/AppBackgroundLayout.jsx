import { Outlet } from "react-router-dom"

export default function AppBackgroundLayout() {
    return (
        <div className="relative min-h-screen isolate">
            {/* Capa 1: imagen de fondo */}
            <div
                aria-hidden="true"
                className="fixed inset-0 bg-center bg-no-repeat bg-cover pointer-events-none opacity-40"
                style={{ backgroundImage: "url('/login-bg.jpg')" }}
            />

            {/* Capa 2: la página que corresponda según la ruta */}
            <div className="relative z-10 min-h-screen">
                <Outlet />
            </div>
        </div>
    )
}
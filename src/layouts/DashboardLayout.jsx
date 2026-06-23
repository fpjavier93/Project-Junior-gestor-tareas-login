import { Outlet, useNavigate, NavLink } from "react-router-dom";
import { LogOut } from "../components/Buttons";
import { handlesignOut } from "../features/dashboard/services/DashboardServices";
import { useAuth } from "../features/auth/context/AuthContext";
import getMenuLinkClassName from "./utils/getMenuLinkClass";
import { useState } from "react";


function DashboardLayout() {
    const [isDrawerOpen, setIsDrawerOpen] = useState(() => {

        const saveValue = localStorage.getItem("MenuPosition");

        return saveValue === "true";
    });


    const navigate = useNavigate();
    const { user } = useAuth();

    const linkList = [
        { label: 'Inicio', to: "/dashboard", end: true },
        { label: 'Crear Tareas', to: "/dashboard/create-task", end: false },
        { label: "Tareas", to: "/dashboard/tasks", end: false },
    ]

    return (
        <main className="min-h-screen bg-gray-50">

            <div className="flex flex-col min-h-screen max-w-8x1">

                <header className="sticky top-0 z-30 flex justify-between px-5 bg-indigo-500 ">

                    <div className="flex py-2">
                        <button
                            type="button"
                            onClick={handleToggleDrawer}
                            className="px-3 py-2 text-white bg-indigo-600 rounded hover:bg-indigo-700"
                        > {isDrawerOpen ? "Cerrar" : "Menu"}

                        </button>

                        <div className="px-2">
                            <h1 className="text-2xl font-bold text-white gap">Bienvenido {user?.user_metadata?.nombre}</h1>
                            <p className="text-white">Gestiona tus tareas</p>
                        </div>
                    </div>
                    <div className="py-5">
                        <LogOut onclick={() => handlesignOut(navigate)} />
                    </div>
                </header>


                <div className="flex flex-1">

                    <aside className={`${isDrawerOpen ? "w-64" : "w-0"} sticky top-18 h-[calc(100vh-72px)] overflow-hidden transition-all duration-300 shrink-0 bg-indigo-500`}>
                        <nav className="flex flex-col gap-2 px-4 py-6 bg-indigo-500">

                            {linkList.map((link) =>
                            (
                                <NavLink
                                    key={link.to}
                                    to={link.to}
                                    end={link.end}
                                    className={({ isActive }) => getMenuLinkClassName(isActive)}
                                >{link.label}</NavLink>
                            )
                            )}
                        </nav>
                    </aside>

                    <section
                        id="dashboard-scroll-container"
                        className="flex-1 bg-indigo-50">
                        <Outlet />
                    </section>

                </div>
            </div>
        </main>

    );

    function handleToggleDrawer() {
        setIsDrawerOpen((currentValue) => {
            const nextValue = !currentValue;

            localStorage.setItem("MenuPosition", String(nextValue))

            return nextValue;
        })
    }
}
export default DashboardLayout

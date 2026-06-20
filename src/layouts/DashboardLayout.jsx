import { Outlet, useNavigate, NavLink } from "react-router-dom";
import { LogOut } from "../components/Buttons";
import { handlesignOut } from "../features/dashboard/services/DashboardServices";
import { useAuth } from "../features/auth/context/AuthContext";
import getMenuLinkClassName from "./utils/getMenuLinkClass";
import { useState } from "react";


function DashboardLayout() {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const navigate = useNavigate();
    const { user } = useAuth();

    const linkList = [
        { label: 'Inicio', to: "/dashboard", end: true },
        { label: 'Crear Tareas', to: "/dashboard/create-task", end: false },
        { label: "Tareas", to: "/dashboard/tasks", end: false },
    ]

    return (
        <main className="fixed inset-0 overflow-hidden bg-gray-50">

            <div className="flex flex-col h-[calc(100vh)] max-w-8x1">

                <header className="flex justify-between px-5 bg-indigo-500 ">

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


                <div className="flex flex-1 min-h-0">

                    <aside className={`${isDrawerOpen ? "w-64 bg-indigo-500" : "w-0"} overflow-hidden transition-all duration-600 shrink-0`}>
                        {isDrawerOpen && (
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
                        )}
                    </aside>

                    <section className="flex-1 min-h-0 overflow-y-auto bg-indigo-50">
                        <Outlet />
                    </section>

                </div>
            </div>
        </main>

    );

    function handleToggleDrawer() {
        setIsDrawerOpen((currentValue) => !currentValue)
    }
}

export default DashboardLayout;

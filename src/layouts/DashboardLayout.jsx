import { Outlet, useNavigate, NavLink } from "react-router-dom";
import { LogOut } from "../components/Buttons";
import { handlesignOut } from "../features/dashboard/services/DashboardServices";
import { useAuth } from "../features/auth/context/AuthContext";
import getMenuLinkClassName from "./utils/getMenuLinkClass";

function DashboardLayout() {
    const navigate = useNavigate();
    const { user } = useAuth();

    const linkList = [
        {
            label: 'Inicio',
            to: "/dashboard",
            end: true
        },
        {
            label: 'Crear Tareas',
            to: "/dashboard/create-task",
            end: false
        },
        {
            label: "Tareas",
            to: "/dashboard/tasks",
            end: false
        },
    ]
    return (
        <main className="min-h-screen bg-gray-50">
            <div className="max-w-4xl px-4 mx-auto">

                <header className="flex justify-between px-5 my-5 bg-indigo-500 rounded">
                    <div className="py-2">
                        <h1 className="text-2xl font-bold text-white">Bienvenido {user?.user_metadata?.nombre}</h1>
                        <p className="text-white">Gestiona tus tareas</p>
                    </div>
                    <div className="py-5">
                        <LogOut onclick={() => handlesignOut(navigate)} />
                    </div>
                </header>

                <nav className="flex mb-6 bg-indigo-500 gap">

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

                <section>
                    <Outlet />
                </section>

            </div>
        </main>
    );
}

export default DashboardLayout;

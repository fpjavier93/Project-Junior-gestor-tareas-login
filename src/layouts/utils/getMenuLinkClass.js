// get       = obtiene/calcula algo
//MenuLink  -> para links del menú
// ClassName = devuelve clases CSS para className

export default function getMenuLinkClassName(isActive) {
    return (
        isActive
            ? "px-3 py-2 text-sm font-medium text-white border border-transparent hover:bg-indigo-300 bg-indigo-600"
            : "px-3 py-2 text-sm font-medium text-white border border-transparent hover:bg-indigo-300"
    )
};

{/* <NavLink to="/dashboard"
                        end
                        className={({ isActive }) => getMenuLinkClassName(isActive)}
                    >
                        Inicio
                    </NavLink>

                    <NavLink to="/dashboard/create-task"
                        className={({ isActive }) => getMenuLinkClassName(isActive)}
                    >
                        Crear Tareas
                    </NavLink>

                    <NavLink to="/dashboard/tasks"
                        className={({ isActive }) => getMenuLinkClassName(isActive)}
                    >
                        Mostrar tareas
                    </NavLink> */}
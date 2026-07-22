import { NavLink, Outlet, useNavigate } from "react-router-dom"
import { FolderKanban, FolderPlus, Home, ListPlus, ListTodo, LogOut, PanelsTopLeft } from "lucide-react"
import { handlesignOut } from "../features/dashboard/services/DashboardServices"
import { useAuth } from "../features/auth/context/AuthContext"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarInset,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarProvider,
    SidebarRail,
    SidebarSeparator,
    SidebarTrigger,
} from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"

function DashboardLayout() {
    const [isDrawerOpen, setIsDrawerOpen] = useState(() => {
        const savedValue = localStorage.getItem("MenuPosition")
        return savedValue === null ? true : savedValue === "true"
    })

    const navigate = useNavigate()
    const { user } = useAuth()

    const linkList = [
        { label: "Inicio", to: "/dashboard", end: true, icon: Home },
        { label: "Crear proyecto", to: "create-project-page", end: false, icon: FolderPlus },
        { label: "Proyectos", to: "project-page", end: false, icon: FolderKanban },
        { label: "Crear tarea", to: "/dashboard/create-task", end: false, icon: ListPlus },
        { label: "Tareas", to: "/dashboard/tasks", end: false, icon: ListTodo },
    ]

    function handleDrawerChange(nextValue) {
        setIsDrawerOpen(nextValue)
        localStorage.setItem("MenuPosition", String(nextValue))
    }

    return (
        <SidebarProvider open={isDrawerOpen} onOpenChange={handleDrawerChange} className="min-h-0 overflow-hidden h-svh">
            <Sidebar collapsible="offcanvas">
                <SidebarHeader className="flex justify-center h-16 px-4 py-0 border-b bg-background">
                    <div className="flex items-center gap-3 ">
                        <div className="flex items-center justify-center rounded-lg size-9 bg-primary text-primary-foreground">
                            <PanelsTopLeft className="size-5" />
                        </div>
                        <div className="min-w-0">
                            <p className="font-semibold font-heading">TaskFlow</p>
                            <p className="text-xs truncate text-muted-foreground">Gestor de tareas</p>
                        </div>
                    </div>
                </SidebarHeader>

                <SidebarContent className={"bg-background"}>
                    <SidebarGroup>
                        <SidebarGroupLabel>Navegación</SidebarGroupLabel>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {linkList.map((link) => {
                                    const Icon = link.icon
                                    return (
                                        <SidebarMenuItem key={link.to}>
                                            <NavLink to={link.to} end={link.end}>
                                                {({ isActive }) => (
                                                    <SidebarMenuButton isActive={isActive} tooltip={link.label} asChild
                                                        className="data-[active=true]:bg-indigo-500 data-[active=true]:text-white data-[active=true]:hover:bg-indigo-600 data-[active=true]:hover:text-white">
                                                        <span>
                                                            <Icon />
                                                            <span>{link.label}</span>
                                                        </span>
                                                    </SidebarMenuButton>
                                                )}
                                            </NavLink>
                                        </SidebarMenuItem>
                                    )
                                })}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                </SidebarContent>
                <SidebarFooter>
                    <Button type="button" variant="ghost" className="justify-start w-full" onClick={() => handlesignOut(navigate)}>
                        <LogOut data-icon="inline-start" />
                        Cerrar sesión
                    </Button>
                </SidebarFooter>
                <SidebarRail />
            </Sidebar>
            <SidebarInset className="min-w-0 overflow-hidden h-svh">
                <header className="flex items-center h-16 gap-3 px-4 border-b shrink-0 bg-background">
                    <SidebarTrigger />
                    <Separator orientation="vertical" className="h-0" />
                    <div className="min-w-0">
                        <p className="text-sm font-medium truncate">
                            Bienvenido, {user?.user_metadata?.nombre || "Usuario"}
                        </p>
                        <p className="text-xs text-muted-foreground">Gestiona tus tareas y proyectos</p>
                    </div>
                </header>
                <section id="dashboard-scroll-container" className="flex-1 min-h-0 overflow-y-auto bg-muted/30">
                    <Outlet />
                </section>
            </SidebarInset>
        </SidebarProvider>
    )
}

export default DashboardLayout
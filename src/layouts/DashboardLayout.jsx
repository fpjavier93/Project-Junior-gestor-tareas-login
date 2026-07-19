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
        <SidebarProvider open={isDrawerOpen} onOpenChange={handleDrawerChange} className="h-svh min-h-0 overflow-hidden">
            <Sidebar collapsible="offcanvas">
                <SidebarHeader className="p-4">
                    <div className="flex items-center gap-3">
                        <div className="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                            <PanelsTopLeft className="size-5" />
                        </div>
                        <div className="min-w-0">
                            <p className="font-heading font-semibold">TaskFlow</p>
                            <p className="truncate text-xs text-muted-foreground">Gestor de tareas</p>
                        </div>
                    </div>
                </SidebarHeader>
                <SidebarSeparator />
                <SidebarContent>
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
                                                    <SidebarMenuButton isActive={isActive} tooltip={link.label} asChild>
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
                    <Button type="button" variant="ghost" className="w-full justify-start" onClick={() => handlesignOut(navigate)}>
                        <LogOut data-icon="inline-start" />
                        Cerrar sesión
                    </Button>
                </SidebarFooter>
                <SidebarRail />
            </Sidebar>
            <SidebarInset className="h-svh min-w-0 overflow-hidden">
                <header className="flex h-16 shrink-0 items-center gap-3 border-b bg-background px-4">
                    <SidebarTrigger />
                    <Separator orientation="vertical" className="h-5" />
                    <div className="min-w-0">
                        <p className="truncate text-sm font-medium">
                            Bienvenido, {user?.user_metadata?.nombre || "Usuario"}
                        </p>
                        <p className="text-xs text-muted-foreground">Gestiona tus tareas y proyectos</p>
                    </div>
                </header>
                <section id="dashboard-scroll-container" className="min-h-0 flex-1 overflow-y-auto bg-muted/30">
                    <Outlet />
                </section>
            </SidebarInset>
        </SidebarProvider>
    )
}

export default DashboardLayout
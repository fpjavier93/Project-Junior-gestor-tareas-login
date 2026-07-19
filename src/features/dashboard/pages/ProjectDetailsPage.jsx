import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { ArrowLeft, CheckCircle2, FolderKanban, Hash, ListTodo } from "lucide-react"
import { useProject } from "../hooks/useProjects"
import LoadingSpinner from "../../../components/LoadingSpinner"
import { getProjectByID } from "../services/taskProjectServices"
import { getTasksById } from "../services/tasksApiServices"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function ProjectDetailsPage() {
    const { projectID } = useParams()
    const { loading, setloading } = useProject()
    const [project, setProject] = useState({})
    const [tasks, setTasks] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        async function hanldeProjectDetailsPage() {
            try {
                setloading(true)
                setProject(await getProjectByID(projectID))
                setTasks(await getTasksById(projectID))
            } finally {
                setloading(false)
            }
        }
        hanldeProjectDetailsPage()
    }, [projectID])

    if (loading) return <LoadingSpinner />

    return (
        <main className="mx-auto w-full max-w-5xl space-y-6 px-4 py-8">
            <div className="flex items-center justify-between gap-4">
                <div className="min-w-0">
                    <Badge variant="secondary" className="mb-2">Proyecto</Badge>
                    <h1 className="truncate text-2xl font-semibold tracking-tight">{project.name}</h1>
                </div>
                <Button type="button" variant="outline" onClick={() => navigate("/dashboard/project-page")}><ArrowLeft />Volver atrás</Button>
            </div>

            <Card className="border-t-4" style={{ borderTopColor: project.color || "#6366f1" }}>
                <CardHeader>
                    <CardTitle>Información general</CardTitle>
                    <CardDescription>{project.description || "Este proyecto no tiene descripción."}</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4 sm:grid-cols-3">
                    <div className="rounded-lg border bg-muted/40 p-4">
                        <Hash className="mb-3 size-5 text-muted-foreground" />
                        <p className="text-xs font-medium uppercase text-muted-foreground">ID del proyecto</p>
                        <p className="mt-1 break-all text-sm font-medium">{projectID}</p>
                    </div>
                    <div className="rounded-lg border bg-muted/40 p-4">
                        <ListTodo className="mb-3 size-5 text-muted-foreground" />
                        <p className="text-xs font-medium uppercase text-muted-foreground">Tareas</p>
                        <p className="mt-1 text-2xl font-semibold">{tasks.length}</p>
                    </div>
                    <div className="rounded-lg border bg-muted/40 p-4">
                        <CheckCircle2 className="mb-3 size-5 text-emerald-600" />
                        <p className="text-xs font-medium uppercase text-muted-foreground">Estado</p>
                        <p className="mt-1 font-medium">Activo</p>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="border-b">
                    <CardTitle>Tareas del proyecto</CardTitle>
                    <CardDescription>Selecciona una tarea para consultar todos sus detalles.</CardDescription>
                </CardHeader>
                <CardContent className="px-0">
                    {tasks.length === 0 ? (
                        <div className="flex min-h-40 flex-col items-center justify-center gap-2 text-muted-foreground">
                            <FolderKanban className="size-8" />
                            <p className="text-sm">No hay tareas asignadas a este proyecto.</p>
                        </div>
                    ) : (
                        <div className="divide-y">
                            {tasks.map((task) => (
                                <Button
                                    type="button"
                                    variant="ghost"
                                    className="flex w-full items-center justify-between gap-4 px-4 py-3 text-left transition-colors hover:bg-muted"
                                    key={task.id}
                                    onClick={() => navigate("/dashboard/tasks/" + task.id, { state: { from: "/dashboard/projects/" + projectID } })}
                                >
                                    <span className="truncate font-medium">{task.title}</span>
                                    <Badge variant={task.status === "completed" ? "secondary" : "outline"}>
                                        {task.status === "completed" ? "Completada" : "Pendiente"}
                                    </Badge>
                                </Button>
                            ))}
                        </div>
                    )}
                </CardContent>
            </Card>
        </main>
    )
}
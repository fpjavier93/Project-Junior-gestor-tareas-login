import { useParams, useNavigate, useLocation } from "react-router-dom"
import { ArrowLeft, CalendarDays, Flag, ListChecks } from "lucide-react"
import { getTaskById } from "../services/getTaskById"
import { useEffect, useState } from "react"
import LoadingSpinner from "../../../components/LoadingSpinner"
import { TASK_ERROR_TYPES } from "../constants/taskErrorTypes"
import ErrorMessage from "../../../components/ErrorMessage"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

function TaskDetailPage() {
    const navigate = useNavigate()
    const { taskId } = useParams()
    const [showTask, setShowTask] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState({ status: false, type: 0 })
    const location = useLocation()
    const backTo = location.state?.from || "/dashboard/tasks"

    async function getTask() {
        try {
            setLoading(true)
            setError({ status: false, type: 0 })

            const task = await getTaskById(taskId)

            if (!task) {
                throw new Error("No se encontró la tarea")
            }

            setShowTask(task)
        } catch (error) {
            console.error("Error al cargar la tarea:", error)
            setError({ status: true, type: TASK_ERROR_TYPES.LOAD })
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getTask()
    }, [taskId])

    if (loading) return <LoadingSpinner />
    if (error.status) return <ErrorMessage error="No se pudo cargar la tarea" onTryAgain={() => { getTask }} onCancel={() => navigate("/dashboard")} />

    const priorityLabel = showTask.priority === "low" ? "Baja" : showTask.priority === "medium" ? "Media" : "Alta"

    return (
        <main className="w-full max-w-4xl px-4 py-8 mx-auto space-y-4">
            <Button type="button" variant="ghost" onClick={() => navigate(backTo)}><ArrowLeft />Volver atrás</Button>
            <Card>
                <CardHeader className="border-b">
                    <div className="flex flex-wrap items-center gap-2">
                        <Badge
                            className={showTask.status === "completed" ? "border-emerald-500 bg-emerald-50 text-emerald-700" : "border-dashed border-amber-500 bg-amber-50 text-amber-700"}
                            variant={showTask.status === "completed" ? "secondary" : "outline"}>{showTask.status === "completed" ? "Completada" : "Pendiente"}</Badge>
                        {showTask.task_type && <Badge variant="outline">{showTask.task_type}</Badge>}
                    </div>
                    <CardTitle className="text-xl">{showTask.title}</CardTitle>
                    <CardDescription>{showTask.description || "Sin descripción"}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="grid gap-4 sm:grid-cols-3">
                        <div className="p-4 border rounded-lg bg-muted/40"><Flag className="mb-3 size-5 text-muted-foreground" /><p className="text-xs font-medium uppercase text-muted-foreground">Prioridad</p><p className="mt-1 font-medium">{priorityLabel}</p></div>
                        <div className="p-4 border rounded-lg bg-muted/40"><ListChecks className="mb-3 size-5 text-muted-foreground" /><p className="text-xs font-medium uppercase text-muted-foreground">Estado</p><p className="mt-1 font-medium">{showTask.status === "completed" ? "Completada" : "Pendiente"}</p></div>
                        <div className="p-4 border rounded-lg bg-muted/40"><CalendarDays className="mb-3 size-5 text-muted-foreground" /><p className="text-xs font-medium uppercase text-muted-foreground">Fecha límite</p><p className="mt-1 font-medium">{showTask.due_date || "Sin fecha límite"}</p></div>
                    </div>
                    {showTask.image_url && <img src={showTask.image_url} alt={showTask.title} className="object-cover w-full rounded-lg max-h-96" />}
                </CardContent>
            </Card>
        </main>
    )
}

export default TaskDetailPage
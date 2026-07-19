import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { CalendarClock, ChevronDown, ChevronUp, Eye, Pencil, Trash2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

export function TaskCard({ task, isEditing, isDeleting, isCompleted, isStatusUpdating, onToggleStatus, onEdit, onDelete, Image, diffInDays, taskType }) {
    const navigate = useNavigate()
    const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false)
    const description = task.description || ""
    const isLongDescription = description.length > 120
    const dueMessage = task.due_date === null || task.status === "completed"
        ? null
        : diffInDays > 3 ? "Fecha límite: " + task.due_date
            : diffInDays >= 0 ? "La tarea vence pronto (" + task.due_date + ")" : "Fecha límite vencida"
    const priorityLabel = task.priority === "low" ? "Prioridad baja" : task.priority === "medium" ? "Prioridad media" : "Prioridad alta"
    const priorityClass = task.priority === "low"
        ? "border-amber-200 bg-amber-50 text-amber-700"
        : task.priority === "medium"
            ? "border-orange-200 bg-orange-50 text-orange-700"
            : "border-red-200 bg-red-50 text-red-700"
    const taskTypeLabel = taskType === "work" ? "Trabajo" : taskType === "study" ? "Estudio" : taskType === "personal" ? "Personal" : null

    return (
        <Card>
            <CardHeader className="border-b">
                <div className="grid min-w-0 gap-4 sm:grid-cols-[minmax(0,1fr)_auto]">
                    <div className="min-w-0 space-y-2">
                        {dueMessage && <p className="flex items-center gap-1.5 text-xs font-medium text-destructive"><CalendarClock className="size-4" />{dueMessage}</p>}
                        <CardTitle className="break-words text-lg">{task.title}</CardTitle>
                        <div className="flex flex-wrap gap-2">
                            <Badge variant="outline" className={priorityClass}>{priorityLabel}</Badge>
                            {taskTypeLabel && <Badge variant="secondary">{taskTypeLabel}</Badge>}
                        </div>
                    </div>
                    {Image && <img src={Image} alt={task.title} className="aspect-video h-28 w-full rounded-lg object-cover sm:w-44" />}
                </div>
            </CardHeader>
            <CardContent className="space-y-4">
                <p className={isDescriptionExpanded ? "whitespace-pre-wrap" : "line-clamp-3"}>{description || "Sin descripción"}</p>
                {isLongDescription && (
                    <Button type="button" variant="link" className="h-auto px-0" onClick={() => setIsDescriptionExpanded((value) => !value)}>
                        {isDescriptionExpanded ? <ChevronUp /> : <ChevronDown />}
                        {isDescriptionExpanded ? "Mostrar menos" : "Mostrar más"}
                    </Button>
                )}
            </CardContent>
            <CardFooter className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-2">
                    <Switch id={"task-status-" + task.id} checked={isCompleted} disabled={isStatusUpdating} onCheckedChange={onToggleStatus} />
                    <Label htmlFor={"task-status-" + task.id}>{isStatusUpdating ? "Actualizando..." : "Completada"}</Label>
                </div>
                <div className="flex flex-wrap gap-2 sm:justify-end">
                    <Button type="button" variant="outline" size="sm" onClick={onEdit} disabled={isEditing}><Pencil />{isEditing ? "Editando..." : "Editar"}</Button>
                    <Button type="button" variant="destructive" size="sm" onClick={onDelete} disabled={isDeleting}><Trash2 />{isDeleting ? "Eliminando..." : "Eliminar"}</Button>
                    <Button type="button" variant="secondary" size="sm" onClick={() => navigate("/dashboard/tasks/" + task.id, { state: { from: "/dashboard/tasks" } })}><Eye />Ver detalles</Button>
                </div>
            </CardFooter>
        </Card>
    )
}
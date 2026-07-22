import { CalendarClock } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export function RisentltyTask({ task, diffInDays }) {
    const dueMessage = task.due_date === null || task.status === "completed"
        ? null
        : diffInDays > 3 ? "Fecha límite: " + task.due_date
            : diffInDays >= 0 ? "Vence pronto: " + task.due_date : "Fecha límite vencida"

    const priorityLabel = task.priority === "low" ? "Baja" : task.priority === "medium" ? "Media" : "Alta"
    const priorityClass = task.priority === "low"
        ? "border-amber-200 bg-amber-50 text-amber-700"
        : task.priority === "medium"
            ? "border-orange-200 bg-orange-50 text-orange-700"
            : "border-red-200 bg-red-50 text-red-700"

    const isCompleted = task.status === "completed";
    const statusClass = isCompleted
        ? "border-emerald-500 bg-emerald-50 text-emerald-700"
        : "border-dashed border-amber-500 bg-amber-50 text-amber-700";

    return (
        <div className="grid gap-3 border-b px-4 py-4 last:border-b-0 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center">
            <div className="min-w-0">
                <h3 className="font-medium truncate">{task.title}</h3>
                <p className="mt-1 text-sm line-clamp-2 text-muted-foreground">{task.description}</p>
            </div>
            <div className="flex flex-wrap items-center gap-2 sm:justify-end">
                <Badge variant="outline" className={priorityClass}>{priorityLabel}</Badge>
                <Badge variant={"outline"} className={statusClass}>
                    {isCompleted ? "Completada" : "Pendiente"}
                </Badge>
                {dueMessage && (
                    <span className="inline-flex items-center gap-1 text-xs text-destructive">
                        <CalendarClock className="size-3.5" />{dueMessage}
                    </span>
                )}
            </div>
        </div>
    )
}
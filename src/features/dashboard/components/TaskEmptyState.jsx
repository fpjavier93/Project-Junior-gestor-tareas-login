import { Inbox } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export function TaskEmptyState({ message }) {
    return (
        <Card>
            <CardContent className="flex min-h-48 flex-col items-center justify-center gap-3 text-center">
                <div className="flex size-12 items-center justify-center rounded-full bg-muted"><Inbox className="size-6 text-muted-foreground" /></div>
                <p className="font-medium">{message}</p>
                <p className="text-sm text-muted-foreground">Prueba con otros filtros o crea una nueva tarea.</p>
            </CardContent>
        </Card>
    )
}
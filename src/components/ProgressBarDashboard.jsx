import { Card, CardContent, CardDescription } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"

export function ProgressBarDashboard({ progress }) {
    const progressColor = progress < 30
        ? "[&_[data-slot=progress-indicator]]:bg-red-500"
        : progress < 70
            ? "[&_[data-slot=progress-indicator]]:bg-amber-500"
            : "[&_[data-slot=progress-indicator]]:bg-emerald-500"

    return (
        <Card>
            <CardContent className="space-y-3">
                <div className="flex items-end justify-between gap-4">
                    <CardDescription className="text-xs font-medium uppercase">Progreso general</CardDescription>
                    <p className="text-2xl font-semibold tabular-nums">{progress.toFixed(2)} %</p>
                </div>
                <Progress value={progress} aria-label="Progreso general de tareas" className={cn("h-2", progressColor)} />
            </CardContent>
        </Card>
    )
}

export default ProgressBarDashboard
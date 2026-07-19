import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function TaskSearch({ searching, onSearch }) {
    return (
        <div className="space-y-1.5">
            <Label htmlFor="task-search">Buscar</Label>
            <div className="relative">
                <Search className="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input id="task-search" className="pl-8" value={searching} onChange={(event) => onSearch(event.target.value)} placeholder="Título de la tarea" />
            </div>
        </div>
    )
}
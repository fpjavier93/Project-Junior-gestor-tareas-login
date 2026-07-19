import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function TaskFilterPerPriority({ onPriorityChange, selectedPriority }) {
    return (
        <div className="space-y-1.5">
            <Label htmlFor="prioridad">Prioridad</Label>
            <Select value={selectedPriority || "all"} onValueChange={(value) => onPriorityChange(value === "all" ? "" : value)}>
                <SelectTrigger id="prioridad" className="w-full"><SelectValue /></SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">Todas</SelectItem>
                    <SelectItem value="low">Baja</SelectItem>
                    <SelectItem value="medium">Media</SelectItem>
                    <SelectItem value="high">Alta</SelectItem>
                </SelectContent>
            </Select>
        </div>
    )
}
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function TaskFilterType({ onTaskChange, onselectedType }) {
    return (
        <div className="space-y-1.5">
            <Label htmlFor="task_type_filter">Tipo</Label>
            <Select value={onselectedType || "all"} onValueChange={(value) => onTaskChange(value === "all" ? "" : value)}>
                <SelectTrigger id="task_type_filter" className="w-full"><SelectValue /></SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">Todos</SelectItem>
                    <SelectItem value="study">Estudio</SelectItem>
                    <SelectItem value="work">Trabajo</SelectItem>
                    <SelectItem value="personal">Personal</SelectItem>
                </SelectContent>
            </Select>
        </div>
    )
}
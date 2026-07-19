import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function TaskFilters({ onStatusChange, select }) {
    return (
        <div className="space-y-1.5">
            <Label htmlFor="estado">Estado</Label>
            <Select value={select} onValueChange={onStatusChange}>
                <SelectTrigger id="estado" className="w-full"><SelectValue /></SelectTrigger>
                <SelectContent>
                    <SelectItem value="todas">Todas</SelectItem>
                    <SelectItem value="completed">Completadas</SelectItem>
                    <SelectItem value="pending">Pendientes</SelectItem>
                </SelectContent>
            </Select>
        </div>
    )
}
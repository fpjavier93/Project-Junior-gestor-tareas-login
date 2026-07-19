import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function ProjectSelect({ projects, value, onValueChange, disabled = false }) {
    return (
        <Select value={value || "none"} onValueChange={(nextValue) => onValueChange(nextValue === "none" ? "" : nextValue)} disabled={disabled}>
            <SelectTrigger id="project_id" className="w-full"><SelectValue placeholder="Selecciona un proyecto" /></SelectTrigger>
            <SelectContent>
                <SelectItem value="none">Sin proyecto</SelectItem>
                {projects.map((project) => <SelectItem key={project.id} value={project.id}>{project.name}</SelectItem>)}
            </SelectContent>
        </Select>
    )
}
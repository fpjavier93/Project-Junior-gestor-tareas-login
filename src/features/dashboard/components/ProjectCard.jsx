import { useNavigate } from "react-router-dom"
import { Eye, Folder, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export function ProjectCard({ projects, onDelete }) {
    const navigate = useNavigate()
    return (
        <section className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {projects.map((project) => (
                <Card key={project.id} className="min-h-48 border-t-4" style={{ borderTopColor: project.color || "#6366f1" }}>
                    <CardHeader>
                        <div className="mb-3 flex size-10 items-center justify-center rounded-lg bg-muted">
                            <Folder className="size-5" style={{ color: project.color || "#6366f1" }} />
                        </div>
                        <CardTitle className="line-clamp-2 text-lg">{project.name}</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-1">
                        <p className="line-clamp-2 text-sm text-muted-foreground">{project.description || "Sin descripción"}</p>
                    </CardContent>
                    <CardFooter className="justify-end gap-2">
                        <Button type="button" variant="destructive" size="sm" onClick={() => onDelete(project)}><Trash2 />Eliminar</Button>
                        <Button type="button" size="sm" onClick={() => navigate("/dashboard/projects/" + project.id)}><Eye />Detalles</Button>
                    </CardFooter>
                </Card>
            ))}
        </section>
    )
}
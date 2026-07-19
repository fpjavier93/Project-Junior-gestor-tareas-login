import { LoaderCircle } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function LoadingSpinner() {
    return (
        <div className="flex min-h-[50vh] items-center justify-center px-4" role="status">
            <Card className="w-full max-w-sm">
                <CardContent className="flex items-center gap-4">
                    <LoaderCircle className="size-6 animate-spin text-primary" aria-hidden="true" />
                    <div className="flex-1 space-y-2">
                        <p className="font-medium">Cargando contenido</p>
                        <Skeleton className="h-2 w-full" />
                    </div>
                    <span className="sr-only">Cargando...</span>
                </CardContent>
            </Card>
        </div>
    )
}
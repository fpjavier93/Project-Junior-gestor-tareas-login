import { CircleAlert, RefreshCw, X } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"

export default function ErrorMessage({ error, onTryAgain, onCancel }) {
    return (
        <div className="mx-auto flex min-h-[50vh] w-full max-w-xl items-center px-4">
            <Alert variant="destructive" role="alert">
                <CircleAlert />
                <AlertTitle>No se pudo completar la acción</AlertTitle>
                <AlertDescription className="space-y-4">
                    <p>{error}</p>
                    <div className="flex flex-wrap gap-2">
                        {onTryAgain && (
                            <Button type="button" variant="destructive" onClick={onTryAgain}>
                                <RefreshCw data-icon="inline-start" />
                                Reintentar
                            </Button>
                        )}
                        {onCancel && (
                            <Button type="button" variant="outline" onClick={onCancel}>
                                <X data-icon="inline-start" />
                                Cerrar
                            </Button>
                        )}
                    </div>
                </AlertDescription>
            </Alert>
        </div>
    )
}
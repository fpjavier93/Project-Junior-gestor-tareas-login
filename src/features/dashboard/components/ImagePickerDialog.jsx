import { useEffect, useState } from "react"
import { Check, Image as ImageIcon } from "lucide-react"
import { getTaskImages } from "../services/imagesApiService"
import LoadingSpinner from "../../../components/LoadingSpinner"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { cn } from "@/lib/utils"

export function ImagePickerDialog({ isOpen, onClose, onSelectedImage }) {
    const [images, setImages] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [tempSelectImage, setTempSelectImage] = useState("")

    useEffect(() => {
        if (!isOpen) return

        async function loadImages() {
            try {
                setLoading(true)
                setError("")
                setImages(await getTaskImages())
            } catch {
                setError("Error al cargar imágenes")
            } finally {
                setLoading(false)
            }
        }

        loadImages()
    }, [isOpen])

    function handleClose() {
        setTempSelectImage("")
        onClose()
    }

    function handleSelectedImage(image) {
        setTempSelectImage((currentImage) => currentImage === image.download_url ? "" : image.download_url)
    }

    function handleAccept() {
        onSelectedImage(tempSelectImage)
        handleClose()
    }

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
            <DialogContent className="max-h-[90vh] overflow-hidden sm:max-w-4xl">
                <DialogHeader>
                    <DialogTitle>Seleccionar imagen</DialogTitle>
                    <DialogDescription>Elige una imagen para identificar visualmente la tarea.</DialogDescription>
                </DialogHeader>

                {loading ? (
                    <LoadingSpinner />
                ) : (
                    <div className="max-h-[60vh] overflow-y-auto pr-1">
                        {error ? (
                            <Alert variant="destructive"><ImageIcon /><AlertDescription>{error}</AlertDescription></Alert>
                        ) : (
                            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                                {images.map((image) => {
                                    const isSelected = tempSelectImage === image.download_url
                                    return (
                                        <Button
                                            key={image.id}
                                            variant="ghost"
                                            type="button"
                                            className={cn(
                                                "relative aspect-video h-auto overflow-hidden rounded-lg border-2 p-0 transition-colors",
                                                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                                                isSelected
                                                    ? "border-primary"
                                                    : "border-transparent hover:border-muted-foreground/30"
                                            )}
                                            aria-label={"Seleccionar imagen de " + image.author}
                                            aria-pressed={isSelected}
                                            onClick={() => handleSelectedImage(image)}
                                        >
                                            <img src={image.download_url} alt={image.author} className="object-cover w-full h-full" />
                                            {isSelected && (
                                                <span className="absolute flex items-center justify-center rounded-full right-2 top-2 size-7 bg-primary text-primary-foreground">
                                                    <Check className="size-4" />
                                                </span>
                                            )}
                                        </Button>
                                    )
                                })}
                            </div>
                        )}
                    </div>
                )}

                <DialogFooter>
                    <Button type="button" variant="outline" onClick={handleClose}>Cerrar</Button>
                    <Button type="button" onClick={handleAccept} disabled={loading || Boolean(error)}>Aceptar</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
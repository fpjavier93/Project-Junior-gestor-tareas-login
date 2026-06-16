import { useEffect, useState } from "react";
import { Blue, White } from "../../../components/Buttons";
import { getTaskImages } from "../services/imagesApiService";
import LoadingSpinner from "../../../components/LoadingSpinner";



export function ImagePickerDialog({ isOpen, onClose }) {

    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");


    useEffect(() => {

        if (!isOpen) return

        async function loadImages() {

            try {

                setLoading(true)
                setError("");

                const data = await getTaskImages();

                setImages(data);

            } catch {

                setError("Error al cargar imagenes");

            } finally {

                setLoading(false)

            }
        }

        loadImages();

    }, [isOpen]);

    if (!isOpen) return null


    if (loading) {

        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">

                <LoadingSpinner />

            </div>
        )
    }

    return (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">

            <div className="flex flex-col gap-3">

                <div className="grid grid-cols-3 gap-3 bg-indigo-200">

                    {images.map((image) => (
                        <img
                            key={image.id}
                            src={image.download_url}
                            alt={image.author}
                            className="object-cover w-48 h-48 hover:border-6 hover:border-indigo-200"

                        />
                    ))}

                </div>

                <div className="flex justify-end gap-5">

                    <White
                        type={"button"}
                        onClick={onClose}
                        name={"Cerrar"}
                    />

                    <Blue
                        type={"button"}
                        name={"Aceptar"}
                    />
                </div>
            </div>
        </div>
    )
}
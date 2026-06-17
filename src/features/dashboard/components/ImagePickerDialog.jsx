import { useEffect, useState } from "react";
import { Blue, White } from "../../../components/Buttons";
import { getTaskImages } from "../services/imagesApiService";
import LoadingSpinner from "../../../components/LoadingSpinner";



export function ImagePickerDialog({ isOpen, onClose, onSelectedImage }) {

    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [selectedImage, setSelectedImage] = useState("");
    const [tempSelectImage, setTempSelectImage] = useState("");


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


    function hanldeSelectdImage(image) {

        if (tempSelectImage === image.download_url) {
            setTempSelectImage("");
            onSelectedImage("")
            return;
        }

        setTempSelectImage(image.download_url)
        setTempSelectImage(image.download_url)

    }



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
                            className={tempSelectImage === image.download_url
                                ? "object-cover w-48 h-48 border-indigo-600 border-6 hover:cursor-pointer hover:border-8"
                                : "object-cover w-48 h-48 hover:border-6 hover:border-indigo-200 hover:cursor-pointer"}
                            onClick={() => hanldeSelectdImage(image)}

                        />
                    ))}

                </div>

                <div className="flex justify-end gap-5">

                    <White
                        type={"button"}
                        name={"Cerrar"}
                        onClick={() => {
                            setTempSelectImage("")
                            onClose()
                        }}
                    />

                    <Blue
                        type={"button"}
                        name={"Aceptar"}
                        onClick={() => {
                            onSelectedImage(tempSelectImage)
                            setSelectedImage(tempSelectImage)
                            onClose()
                        }}

                    />
                </div>
            </div>
        </div>
    )
}
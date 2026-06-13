import { useNavigate } from "react-router-dom";
import { Blue, White } from "../../../components/Buttons";
import getUserID from "../services/CreateTaskServices";
import { useState } from "react";
import { createTask } from "../services/tasksApiServices";
import ErrorMessage from "../../../components/ErrorMessage";
import { CheckmarkIcon } from "react-hot-toast";
import { useTasks } from "../hooks/useTasks";



function CreateTaskPage() {

    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState("");
    const [error, setError] = useState(false)
    const { handleIsChecked, isCheckedPriotity } = useTasks();




    async function handleSubmit(e) {

        setIsSubmitting(true);
        e.preventDefault();
        setSubmitError("");

        const formData = new FormData(e.target);

        const dataTask = Object.fromEntries([...formData.entries()].map(([key, value]) => {
            return [key,
                typeof value === "string" ? value.trim() : value
            ]

        }))

        console.log(dataTask);

        const newDataTask = {
            user_id: await getUserID(),
            ...dataTask
        };


        try {
            await createTask(newDataTask);
            e.target.reset()

        } catch {

            setError(true)

        } finally {

            setIsSubmitting(false);
        }
    }


    if (error) {
        return <ErrorMessage error={"No se pudo crear la tarea"}
            onTryAgain={() => setError(false)}
            onCancel={() => navigate("/dashboard")}
        />
    }


    return (
        <div className="max-w-4xl max-h-screen py-1 mx-auto px-auto">

            <div className="p-4 bg-indigo-200 border border-gray-300 rounded shadow my-18">

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="title" className="block text-lg font-medium text-gray-900">
                            Titulo
                        </label>
                        <div className="py-3">
                            <input
                                id="title"
                                name="title"
                                type="title"
                                required
                                className="block w-full rounded-md bg-indigo-50 px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                            />
                        </div>
                        <div className="py-5">
                            <label htmlFor="description" className="block text-lg font-medium text-gray-900">
                                Descripcion
                            </label>
                            <div className="py-3">
                                <textarea
                                    id="description"
                                    name="description"
                                    required
                                    rows={5}
                                    className="block w-full rounded-md bg-indigo-50 px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                />
                            </div>
                            <div className="flex gap-3 py-3">

                                <p className="block text-lg font-medium text-gray-900">Prioridad:</p>

                                <label htmlFor="low">
                                    <input className="mx-2"
                                        name={"priority"}
                                        value={"low"}
                                        id="low"
                                        type="radio"
                                        checked={isCheckedPriotity === "low"}
                                        onChange={(e) => handleIsChecked(e.target.id)} />Baja
                                </label>

                                <label htmlFor="medium">
                                    <input className="mx-2"
                                        name={"priority"}
                                        value={"medium"}
                                        id="medium"
                                        type="radio"
                                        checked={isCheckedPriotity === "medium"}
                                        onChange={(e) => handleIsChecked(e.target.id)} />Media
                                </label>

                                <label htmlFor="high">
                                    <input className="mx-2"
                                        name={"priority"}
                                        value={"high"}
                                        id="high"
                                        type="radio"
                                        checked={isCheckedPriotity === "high"}
                                        onChange={(e) => handleIsChecked(e.target.id)} />Alta
                                </label>

                            </div>

                            <div className="pt-4 my-5 border-t border-gray-200"></div>
                            {submitError && (
                                <p className="text-sm text-red-600">{submitError}</p>
                            )}
                            <div className="flex justify-end gap-3">
                                <White
                                    name="Cancelar"
                                    onClick={() => navigate("/dashboard")}
                                />

                                <Blue
                                    disabled={isSubmitting ? true : false}
                                    name={isSubmitting ? "Creando..." : "Crear tarea"}
                                    type="submit"
                                />
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CreateTaskPage;

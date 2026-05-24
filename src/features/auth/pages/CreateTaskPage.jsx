import { data, Form, useNavigate } from "react-router-dom";
import { Blue, White } from "../../../components/Buttons";
let Task = [];

function CreateTaskPage() {
    const navigate = useNavigate();

    function handleSubmit(e) {
        e.preventDefault();

        const formData = new FormData(e.target);
        const dataTask = Object.fromEntries([...formData.entries()].map(([key, value]) => {
            return [key,
                typeof value == "string" ? value.trim() : value
            ]

        }))

        const newDataTask = {
            id: crypto.randomUUID(),
            user_id: "(insertar usuario)",
            ...dataTask,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()

        };
        Task.push(newDataTask);
        console.log(Task)

        e.target.reset()

    }



    return (
        <div className="max-w-4xl px-4 mx-auto">
            <header className="flex justify-between py-10">
                <div>
                    <h1 className="text-2xl font-bold text-black">NUEVA TAREA</h1>

                    <h2 className="text-gray-500">Crea una tarea y define su contenido</h2>
                </div>
                <div className="flex items-center gap-2">
                </div>
            </header>

            <div className="p-4 my-6 bg-white border border-gray-300 rounded shadow">

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
                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
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
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                />
                            </div>

                            <div className="pt-4 my-5 border-t border-gray-200"></div>
                            <div className="flex justify-end gap-3">
                                <White
                                    name="Cancelar"
                                    onClick={() => navigate("/dashboard")}
                                />

                                <Blue
                                    name='Crear tarea'
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

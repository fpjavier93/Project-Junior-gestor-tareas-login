import { Link } from "react-router-dom"
import { useState } from "react";
import { signUp } from "../services";
import { useNavigate } from "react-router-dom";
import ErrorMessage from "../../../components/ErrorMessage";

export default function RegisterPage() {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [lastName, setlastName] = useState('');
    const [email, setEmail] = useState('');
    const [company, setCompany] = useState('');
    const [error, setError] = useState(false);
    const [passIsInvalid, setPassIsInvalid] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const isFormInvalid =
        name.trim() === "" ||
        lastName.trim() === "" ||
        email.trim() === "" ||
        company.trim() === "";


    async function handleSubmit(e) {

        setIsSubmitting(true)

        e.preventDefault();

        const formData = new FormData(e.target);

        const dataFormValue = Object.fromEntries(formData)

        if (dataFormValue.password !== dataFormValue.confirmPassword) {
            if (passIsInvalid) {
                setIsSubmitting(false)
                return
            }
            setPassIsInvalid(true);
            setTimeout(() => [setPassIsInvalid(false), setIsSubmitting(false)], 2000);
            return
        }


        for (const key in dataFormValue) {
            if (typeof dataFormValue[key] === "string") {
                dataFormValue[key] = dataFormValue[key].trim()
            }
        }


        try {
            const response = await signUp(dataFormValue)
            if (response.success) {
                navigate("/");
                return;
            }

            setError(true);

        } catch {
            setError(true);

        } finally {
            setIsSubmitting(false)
        }
    }



    function validateEmail(e) {
        const email = e.target.value.trim();

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {

            return
        }
    }


    if (error) {
        return <div>
            <ErrorMessage error={"No se logro la inscripcion"}
                onTryAgain={() => setError(false)}
            />
        </div>
    }

    return (
        <>
            <div className="flex flex-col justify-center min-h-full px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img
                        alt="Your Company"
                        src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
                        className="w-auto h-10 mx-auto"
                    />
                    <h2 className="mt-10 font-bold tracking-tight text-center text-gray-900 text-2xl/9">
                        Inscribete para comenzar ahora
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="nombre" className="block font-medium text-gray-900 text-sm/6">
                                Nombre(s)
                            </label>
                            <div className="mt-2">
                                <input
                                    onChange={e => setName(e.target.value)}
                                    value={name}
                                    id="nombre"
                                    name="nombre"
                                    type="nombre"
                                    required
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                />
                            </div>
                        </div>

                        <div>
                            <div className="items-center justify-between">
                                <label htmlFor="apellidos" className="block font-medium text-gray-900 text-sm/6">
                                    Apellidos
                                </label>
                                <div className="mt-2">
                                    <input
                                        onChange={e => setlastName(e.target.value)}
                                        value={lastName}
                                        id="apellidos"
                                        name="apellidos"
                                        type="apellidos"
                                        required
                                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="items-center justify-between">
                            <label htmlFor="email" className="block mt-2 font-medium text-gray-900 text-sm/6">
                                Email
                            </label>
                            <div className="mt-2">
                                <input
                                    onChange={e => setEmail(e.target.value)}
                                    value={email}
                                    onBlur={(validateEmail)}

                                    id='email' name="email" type="email" autoComplete="current-email" required
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline -outline-offset- outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/" />

                            </div>
                        </div>

                        <div className="items-center justify-between">
                            <label htmlFor="empresa" className="block font-medium text-gray-900 text-sm/6">
                                Empresa
                            </label>
                            <div className="mt-2">
                                <input
                                    onChange={e => setCompany(e.target.value)}
                                    value={company} id="empresa" name="empresa" type="empresa" required
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline -outline-offset- outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/" />
                            </div>

                        </div>

                        <div className="items-center justify-between">
                            <label htmlFor="password" className="block font-medium text-gray-900 text-sm/6">
                                Password
                            </label>

                            <div className="mt-2">
                                <input id="password" name="password" type="password" required
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline -outline-offset- outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/" />
                            </div>
                        </div>

                        <div className="items-center justify-between">
                            <label htmlFor="confirmPassword" className="block font-medium text-gray-900 text-sm/6">
                                Confirmar Password
                            </label>
                            <div className="mt-2">
                                <input id="confirmPassword" name="confirmPassword" type="password" required
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline -outline-offset- outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/" />
                            </div>
                            {passIsInvalid && <div className="my-2 font-light text-center text-red-700 bg-red-200 border-0 rounded">No coinciden los passwords</div>}
                        </div>
                        <div>
                            <button
                                disabled={isFormInvalid || isSubmitting}
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600
                                disabled:bg-indigo-300 disabled:hover:bg-indigo-300 disabled:cursor-not-allowed"
                            >
                                {isSubmitting ? "Registrando..." : "Registrarse"}
                            </button>
                        </div>
                    </form>

                    <p className="mt-10 text-center text-gray-500 text-sm/6">
                        Ya tienes usuario?{' '}
                        <Link
                            to="/"
                            className="font-semibold text-indigo-600 hover:text-indigo-500"
                        >
                            Entra Aqui!
                        </Link>
                    </p>
                </div>
            </div>
        </>

    )
}

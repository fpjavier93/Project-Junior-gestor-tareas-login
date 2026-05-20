import { Link } from "react-router-dom"
import { useState } from "react";
import { signUp } from "../services";

export default function RegisterPage() {

    const [name, setName] = useState('');
    const [lastName, setlastName] = useState('');
    const [email, setEmail] = useState('');
    const [empress, setEmpress] = useState('');

    const isFormInvalid =
        name.trim() === "" ||
        lastName.trim() === "" ||
        email.trim() === "" ||
        empress.trim() === "";


    async function handleSubmit(e) {
        e.preventDefault();

        const formData = new FormData(e.target);

        const data1 = Object.fromEntries(formData)

        if (data1.password !== data1.confirmPassword) {
            console.log('pasword invalido')//<---------- Insertar notificacion aqui!!!!!!
            return
        }

        for (const key in data1) {
            if (typeof data1[key] === "string") {
                data1[key] = data1[key].trim()
            }
        }

        await signUp(data1)
    }

    function validateEmail(e) {
        const email = e.target.value.trim();

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            console.log('email invalido')
            return
        }
        console.log(email)


    }

    return (
        <>
            <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img
                        alt="Your Company"
                        src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
                        className="mx-auto h-10 w-auto"
                    />
                    <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
                        Inscribete para comenzar ahora
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="nombre" className="block text-sm/6 font-medium text-gray-900">
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
                                <label htmlFor="apellidos" className="block text-sm/6 font-medium text-gray-900">
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
                            <label htmlFor="email" className="mt-2 block text-sm/6 font-medium text-gray-900">
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
                            <label htmlFor="empresa" className="block text-sm/6 font-medium text-gray-900">
                                Empresa
                            </label>
                            <div className="mt-2">
                                <input
                                    onChange={e => setEmpress(e.target.value)}
                                    value={empress} id="empresa" name="empresa" type="empresa" required
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline -outline-offset- outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/" />
                            </div>

                        </div>

                        <div className="items-center justify-between">
                            <label htmlFor="empresa" className="block text-sm/6 font-medium text-gray-900">
                                Password
                            </label>

                            <div className="mt-2">
                                <input id="password" name="password" type="password" required
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline -outline-offset- outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/" />
                            </div>

                        </div>

                        <div className="items-center justify-between">
                            <label htmlFor="empresa" className="block text-sm/6 font-medium text-gray-900">
                                Confirmar Password
                            </label>
                            <div className="mt-2">
                                <input id="confirmPassword" name="confirmPassword" type="confirmPassword" required
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline -outline-offset- outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/" />
                            </div>

                        </div>
                        <div>
                            <button
                                disabled={isFormInvalid}
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600
                                disabled:bg-indigo-300 disabled:houver:bg-indigo-300 disabled:cursor-not-allowed"
                            >
                                Registrarme
                            </button>
                        </div>
                    </form>

                    <p className="mt-10 text-center text-sm/6 text-gray-500">
                        Ya tienes suario?{' '}
                        <Link
                            to="/"
                            className="font-semibold text-indigo-600 hover:text-indigo-500"
                        >
                            Entra Aquí!
                        </Link>
                    </p>
                </div>
            </div>
        </>

    )
}
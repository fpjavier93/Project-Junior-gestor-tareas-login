import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signIn } from "../services";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../schemas/loginSchema";

export default function LoginPage() {

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema)
  })

  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");


  async function onSubmit(data) {

    setError("");
    setSuccessMessage("");

    try {
      const result = await signIn(data.email, data.password);

      if (result.success) {
        setSuccessMessage(result.message);
        navigate("/dashboard", { replace: true });
      } else {
        setError(result.error || "Error al iniciar sesión");
      }
    } catch {
      setError("Error inesperado al iniciar sesión");
    }
  };

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
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          {error && (
            <div className="p-4 mb-4 border border-red-200 rounded-md bg-red-50">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          {successMessage && (
            <div className="p-4 mb-4 border border-green-200 rounded-md bg-green-50">
              <p className="text-sm text-green-700">{successMessage}</p>
            </div>
          )}

          <form
            noValidate
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block font-medium text-gray-900 text-sm/6"
              >
                Correo Email
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  {...register("email")}
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 disabled:bg-gray-100 disabled:cursor-not-allowed"
                />
              </div>
              {errors.email && <p className="mt-1 text-sm font-medium text-red-600">
                {errors.email.message}
              </p>}
            </div>


            <div>
              <div className="items-center justify-between">
                <label
                  htmlFor="password"
                  className="block font-medium text-gray-900 text-sm/6"
                >
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  type="password"
                  autoComplete="current-password"
                  {...register("password")}
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 disabled:bg-gray-100 disabled:cursor-not-allowed"
                />
                {errors.password && <p className="mt-1 text-sm font-medium text-red-600">
                  {errors.password.message}
                </p>}
              </div>

              <div className="mt-2 text-sm text-right">
                <a
                  href="#"
                  className="font-semibold text-indigo-600 hover:text-indigo-500"
                >
                  Olvidaste tu password?
                </a>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:bg-indigo-400 disabled:cursor-not-allowed transition-colors"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Iniciando sesión..." : "Login"}
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-gray-500 text-sm/6">
            No estas registrado?{" "}
            <Link
              to="/register"
              className="font-semibold text-indigo-600 hover:text-indigo-500"
            >
              Registate Aquí!
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}


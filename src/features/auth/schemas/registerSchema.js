import { z } from "zod";

export const registerSchema = z.object({
    nombre: z.string().trim().min(1, "El nombre es obligatorio"),
    apellidos: z.string().trim().min(1, "Los apellidos son obligatorios"),
    email: z.string().trim().email("Ingresa un email valido"),
    empresa: z.string().trim().min(1, "La empresa es obligatoria"),
    password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
    confirmPassword: z.string().min(6, "Confirma tu contraseña"),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
});
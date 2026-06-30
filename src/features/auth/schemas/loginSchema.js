import z, { email } from "zod";

export const loginSchema = z.object({
    email: z.string().trim().email("Ingresa un email valido"),
    password: z.string().min(1, "La contraseña es obligatoria"),
});
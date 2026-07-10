import { z } from "zod";

export const editTaskDialogSchema = z.object({
    edit_task_title: z
        .string()
        .trim()
        .min(1, "Inserta un titulo a la tarea")
        .max(50, "El titulo no debe pasar de 50 caracteres"),

    edit_task_description: z
        .string()
        .trim()
        .max(100, "La descripcion no debe pasar de 100 caracteres"),

    priority: z.enum(["low", "medium", "high"], {
        message: "Selecciona una prioridad valida",
    }),

})
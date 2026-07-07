import { z } from "zod";

export const taskSchema = z.object({
    title: z
        .string()
        .trim()
        .min(1, "Inserta un titulo a la tarea")
        .max(100, "El titulo no debe pasar de 100 caracteres"),

    description: z
        .string()
        .trim()
        .min(1, "Inserta una descripcion a la tarea")
        .max(1000, "La descripcion no debe pasar de 1000 caracteres"),

    priority: z.enum(["low", "medium", "high"], {
        message: "Selecciona una prioridad valida",
    }),

    task_type: z.enum(["study", "work", "personal"], {
        message: "Selecciona un tipo de tarea valido",
    }),

    due_date: z.string().optional(),

    has_due_date: z.boolean().optional(),

    project_id: z
        .string()
        .uuid("Proyecto invalido")
        .or(z.literal(""))
        .optional(),

    image_url: z.string().optional(),
})
    .refine((data) => {
        if (!data.has_due_date) return true;

        return Boolean(data.due_date);
    }, {
        message: "Selecciona una fecha limite",
        path: ["due_date"],
    }).refine((data) => {
        if (!data.due_date) return true;

        const today = new Date().toISOString().split("T")[0];

        return data.due_date >= today;
    }, {
        message: "La fecha limite no puede ser anterior a hoy",
        path: ["due_date"],
    });


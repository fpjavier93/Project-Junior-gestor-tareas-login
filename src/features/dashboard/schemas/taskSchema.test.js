import { describe, expect, it } from "vitest";
import { taskSchema } from "./taskSchema";

function createValidTask(overrides = {}) {
    return {
        title: "Estudiar testing",
        description: "Practicar pruebas con Vitest",
        priority: "low",
        task_type: "study",
        has_due_date: false,
        due_date: "",
        project_id: "",
        image_url: "",
        ...overrides,
    };
}

function getDateOffset(days) {
    const date = new Date();

    date.setUTCDate(date.getUTCDate() + days);

    return date.toISOString().split("T")[0];
}

describe("taskSchema", () => {
    it("acepta una tarea válida sin fecha límite", () => {
        const result = taskSchema.safeParse(createValidTask());

        expect(result.success).toBe(true);
    });

    it("acepta una tarea con fecha límite futura", () => {
        const result = taskSchema.safeParse(
            createValidTask({
                has_due_date: true,
                due_date: getDateOffset(1),
            })
        );

        expect(result.success).toBe(true);
    });

    it("rechaza una tarea sin título", () => {
        const result = taskSchema.safeParse(
            createValidTask({ title: "" })
        );

        expect(result.success).toBe(false);
    });

    it("rechaza una tarea con prioridad inválida", () => {
        const result = taskSchema.safeParse(
            createValidTask({ priority: "cualquier-cosa" })
        );

        expect(result.success).toBe(false);
    });

    it("rechaza una tarea con tipo inválido", () => {
        const result = taskSchema.safeParse(
            createValidTask({ task_type: "otro-tipo" })
        );

        expect(result.success).toBe(false);
    });

    it("rechaza un proyecto con id inválido", () => {
        const result = taskSchema.safeParse(
            createValidTask({ project_id: "no-es-un-uuid" })
        );

        expect(result.success).toBe(false);
    });

    it("rechaza una tarea con fecha activada pero vacía", () => {
        const result = taskSchema.safeParse(
            createValidTask({
                has_due_date: true,
                due_date: "",
            })
        );

        expect(result.success).toBe(false);
    });

    it("rechaza una tarea con fecha límite anterior a hoy", () => {
        const result = taskSchema.safeParse(
            createValidTask({
                has_due_date: true,
                due_date: getDateOffset(-1),
            })
        );

        expect(result.success).toBe(false);
    });
});

import { describe, expect, it } from "vitest";
import { calcDiffInDays } from "./CreateTaskUtils";

describe("calcDiffInDays", () => {
    const today = "2026-07-14";

    it("devuelve un número positivo cuando la fecha límite es futura", () => {
        const task = { due_date: "2026-07-16" };

        expect(calcDiffInDays(task, today)).toBe(2);
    });

    it("devuelve 0 cuando la tarea vence hoy", () => {
        const task = { due_date: "2026-07-14" };

        expect(calcDiffInDays(task, today)).toBe(0);
    });

    it("devuelve un número negativo cuando la tarea está vencida", () => {
        const task = { due_date: "2026-07-13" };

        expect(calcDiffInDays(task, today)).toBe(-1);
    });
});

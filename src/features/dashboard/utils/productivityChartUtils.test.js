import { describe, expect, it } from "vitest";
import { buildProductivityData } from "./productivityChartUtils";

describe("buildProductivityData", () => {
    it("agrupa las tareas completadas por día", () => {
        const now = new Date("2026-08-17T12:00:00");

        const tasks = [
            {
                status: "completed",
                completed_at: "2026-08-16T10:00:00",
            },
            {
                status: "completed",
                completed_at: "2026-08-16T15:00:00",
            },
            {
                status: "pending",
                completed_at: null,
            },
        ];

        const data = buildProductivityData(tasks, 2, now);

        expect(data).toEqual([
            { date: "2026-08-16", label: "dom", completed: 2 },
            { date: "2026-08-17", label: "lun", completed: 0 },
        ]);
    });
});
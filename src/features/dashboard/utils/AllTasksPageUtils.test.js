import { describe, expect, it } from "vitest";
import { isTaskCompleted } from "./AllTasksPageUtils";

describe("isTaskCompleted", () => {
    it("devuelve true cuando el estado es completed", () => {
        expect(isTaskCompleted("completed")).toBe(true);
    });

    it("devuelve false cuando el estado es pending", () => {
        expect(isTaskCompleted("pending")).toBe(false);
    });
});
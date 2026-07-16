import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { TaskEmptyState } from "./TaskEmptyState";

describe("TaskEmptyState", () => {
    it("muestra el mensaje recibido por props", () => {
        render(<TaskEmptyState message="No existen tareas" />);

        expect(screen.getByText("No existen tareas")).toBeInTheDocument();
    });
});
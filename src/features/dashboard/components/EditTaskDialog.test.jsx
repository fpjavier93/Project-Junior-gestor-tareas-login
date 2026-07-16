import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { EditTaskDialog } from "./EditTaskDialog";

const task = {
    id: "task-1",
    title: "Preparar presentación",
    description: "Terminar las diapositivas",
    priority: "high",
};

function renderDialog(overrides = {}) {
    const onClose = overrides.onClose ?? vi.fn();
    const onSave = overrides.onSave ?? vi.fn().mockResolvedValue(undefined);

    render(
        <EditTaskDialog
            isOpen={overrides.isOpen ?? true}
            task={overrides.task ?? task}
            onClose={onClose}
            onSave={onSave}
        />
    );

    return { onClose, onSave };
}

describe("EditTaskDialog", () => {
    it("no se renderiza cuando está cerrado", () => {
        renderDialog({ isOpen: false });

        expect(screen.queryByRole("heading", { name: "Editar tarea" })).not.toBeInTheDocument();
    });

    it("carga los datos actuales de la tarea", () => {
        renderDialog();

        expect(screen.getByLabelText("Titulo:")).toHaveValue(task.title);
        expect(screen.getByLabelText("Descripcion:")).toHaveValue(task.description);
        expect(screen.getByRole("radio", { name: "Alta" })).toBeChecked();
    });

    it("muestra un error y no guarda si el título queda vacío", async () => {
        const user = userEvent.setup();
        const { onSave } = renderDialog();

        await user.clear(screen.getByLabelText("Titulo:"));
        await user.click(screen.getByRole("button", { name: "Aceptar" }));

        expect(await screen.findByText("Inserta un titulo a la tarea")).toBeInTheDocument();
        expect(onSave).not.toHaveBeenCalled();
    });

    it("guarda los valores editados", async () => {
        const user = userEvent.setup();
        const { onSave } = renderDialog();

        await user.clear(screen.getByLabelText("Titulo:"));
        await user.type(screen.getByLabelText("Titulo:"), "Enviar informe");
        await user.click(screen.getByRole("radio", { name: "Media" }));
        await user.click(screen.getByRole("button", { name: "Aceptar" }));

        await waitFor(() => {
            expect(onSave).toHaveBeenCalledWith({
                title: "Enviar informe",
                description: task.description,
                priority: "medium",
            });
        });
    });

    it("muestra un error del servidor si onSave falla", async () => {
        const user = userEvent.setup();
        const onSave = vi.fn().mockRejectedValue(new Error("Error de red"));

        renderDialog({ onSave });

        await user.click(screen.getByRole("button", { name: "Aceptar" }));

        expect(
            await screen.findByText("No se pudo actualizar la tarea. Inténtalo nuevamente.")
        ).toBeInTheDocument();
    });

    it("cierra el diálogo sin enviar el formulario", async () => {
        const user = userEvent.setup();
        const { onClose, onSave } = renderDialog();

        await user.click(screen.getByRole("button", { name: "Cerrar" }));

        expect(onClose).toHaveBeenCalledTimes(1);
        expect(onSave).not.toHaveBeenCalled();
    });
});

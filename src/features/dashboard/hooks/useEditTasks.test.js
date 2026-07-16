import { act, renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { TASK_ERROR_TYPES } from "../constants/taskErrorTypes";
import { editTask, getTasks } from "../services/tasksApiServices";
import { useEditTasks } from "./useEditTasks";

vi.mock("../services/tasksApiServices", () => ({
    editTask: vi.fn(),
    getTasks: vi.fn(),
}));

const task = {
    id: "task-1",
    title: "Título original",
    description: "Descripción original",
    priority: "high",
};

const editedTask = {
    title: "Título editado",
    description: "Descripción editada",
    priority: "medium",
};

function renderUseEditTasks() {
    const setError = vi.fn();
    const setUserTasks = vi.fn();

    const hook = renderHook(() =>
        useEditTasks({
            setError,
            setUserTasks,
        })
    );

    return {
        ...hook,
        setError,
        setUserTasks,
    };
}

beforeEach(() => {
    vi.clearAllMocks();
});

describe("useEditTasks", () => {
    it("abre y cierra el diálogo con la tarea seleccionada", () => {
        const { result } = renderUseEditTasks();

        act(() => {
            result.current.openEditDialog(task);
        });

        expect(result.current.isEditDialogOpen).toBe(true);
        expect(result.current.taskToEdit).toEqual(task);

        act(() => {
            result.current.closeEditDialog();
        });

        expect(result.current.isEditDialogOpen).toBe(false);
        expect(result.current.taskToEdit).toBeNull();
    });

    it("guarda la edición, actualiza la lista y cierra el diálogo", async () => {
        const updatedTasks = [{ ...task, ...editedTask }];
        editTask.mockResolvedValue(updatedTasks[0]);
        getTasks.mockResolvedValue(updatedTasks);

        const { result, setUserTasks } = renderUseEditTasks();

        act(() => {
            result.current.openEditDialog(task);
        });

        await act(async () => {
            await result.current.onSave(editedTask);
        });

        expect(editTask).toHaveBeenCalledWith(task.id, editedTask);
        expect(getTasks).toHaveBeenCalledTimes(1);
        expect(setUserTasks).toHaveBeenCalledWith(updatedTasks);
        expect(result.current.isEditDialogOpen).toBe(false);
        expect(result.current.taskToEdit).toBeNull();
    });

    it("mantiene abierto el diálogo y comunica el error si falla la edición", async () => {
        const apiError = new Error("No se pudo editar");
        editTask.mockRejectedValue(apiError);
        const consoleError = vi.spyOn(console, "error").mockImplementation(() => {});

        const { result, setError, setUserTasks } = renderUseEditTasks();

        act(() => {
            result.current.openEditDialog(task);
        });

        let receivedError;

        await act(async () => {
            try {
                await result.current.onSave(editedTask);
            } catch (error) {
                receivedError = error;
            }
        });

        expect(receivedError).toBe(apiError);
        expect(setError).toHaveBeenCalledWith({
            status: true,
            type: TASK_ERROR_TYPES.EDIT,
        });
        expect(setUserTasks).not.toHaveBeenCalled();
        expect(result.current.isEditDialogOpen).toBe(true);
        expect(result.current.taskToEdit).toEqual(task);

        consoleError.mockRestore();
    });

    it("no llama a los servicios si no hay una tarea seleccionada", async () => {
        const { result } = renderUseEditTasks();

        await act(async () => {
            await result.current.onSave(editedTask);
        });

        expect(editTask).not.toHaveBeenCalled();
        expect(getTasks).not.toHaveBeenCalled();
    });
});

import { beforeEach, describe, expect, it, vi } from "vitest";
import { apiClient } from "../../../lib/apiClient";
import {
    createTask,
    deleteTask,
    editTask,
    getTasks,
    getTasksById,
} from "./tasksApiServices";

vi.mock("../../../lib/apiClient", () => ({
    apiClient: {
        get: vi.fn(),
        post: vi.fn(),
        patch: vi.fn(),
        delete: vi.fn(),
    },
}));

beforeEach(() => {
    vi.clearAllMocks();
});

describe("tasksApiServices", () => {
    it("obtiene tareas con filtros", async () => {
        const tasks = [{ id: "task-1", title: "Preparar informe" }];
        apiClient.get.mockResolvedValue({ data: tasks });

        const result = await getTasks("completed", "informe", "high", "work");

        expect(apiClient.get).toHaveBeenCalledWith("/tasks", {
            params: {
                select: "*",
                order: "created_at.desc",
                status: "eq.completed",
                title: "ilike.%informe%",
                priority: "eq.high",
                task_type: "eq.work",
            },
        });
        expect(result).toEqual(tasks);
    });

    it("crea una tarea y devuelve la fila creada", async () => {
        const newTask = { title: "Aprender mocks", description: "Practicar Vitest" };
        const createdTask = { id: "task-2", ...newTask };
        apiClient.post.mockResolvedValue({ data: [createdTask] });

        const result = await createTask(newTask);

        expect(apiClient.post).toHaveBeenCalledWith("/tasks", newTask, {
            headers: { Prefer: "return=representation" },
        });
        expect(result).toEqual(createdTask);
    });

    it("edita una tarea por su id y devuelve la fila actualizada", async () => {
        const update = { title: "Título actualizado" };
        const updatedTask = { id: "task-3", ...update };
        apiClient.patch.mockResolvedValue({ data: [updatedTask] });

        const result = await editTask("task-3", update);

        expect(apiClient.patch).toHaveBeenCalledWith("/tasks", update, {
            params: { id: "eq.task-3" },
            headers: { Prefer: "return=representation" },
        });
        expect(result).toEqual(updatedTask);
    });

    it("elimina una tarea por su id", async () => {
        apiClient.delete.mockResolvedValue({});
        await deleteTask("task-4");

        expect(apiClient.delete).toHaveBeenCalledWith("/tasks", {
            params: { id: "eq.task-4" },
        });
    });

    it("obtiene las tareas relacionadas con un proyecto", async () => {
        const tasks = [{ id: "task-5", project_id: "project-1" }];
        apiClient.get.mockResolvedValue({ data: tasks });

        const result = await getTasksById("project-1");

        expect(apiClient.get).toHaveBeenCalledWith("/tasks", {
            params: {
                select: "*",
                order: "created_at.desc",
                project_id: "eq.project-1",
            },
        });
        expect(result).toEqual(tasks);
    });
});

import { beforeEach, describe, expect, it, vi } from "vitest";
import { apiClient } from "../../../lib/apiClient";
import { getSession } from "../../auth/services";
import {
    createTask,
    deleteTask,
    editTask,
    getAccessToken,
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

vi.mock("../../auth/services", () => ({
    getSession: vi.fn(),
}));

const accessToken = "token-de-prueba";

beforeEach(() => {
    vi.clearAllMocks();

    getSession.mockResolvedValue({
        success: true,
        session: {
            access_token: accessToken,
        },
    });
});

describe("getAccessToken", () => {
    it("devuelve el token de la sesión activa", async () => {
        await expect(getAccessToken()).resolves.toBe(accessToken);
    });

    it("lanza un error si no se puede obtener la sesión", async () => {
        getSession.mockResolvedValue({
            success: false,
            error: "Sesión inválida",
        });

        await expect(getAccessToken()).rejects.toThrow("Sesión inválida");
    });
});

describe("tasksApiServices", () => {
    it("obtiene tareas con filtros y autorización", async () => {
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
            headers: {
                Authorization: "Bearer " + accessToken,
            },
        });
        expect(result).toEqual(tasks);
    });

    it("crea una tarea y devuelve la fila creada", async () => {
        const newTask = {
            title: "Aprender mocks",
            description: "Practicar Vitest",
        };
        const createdTask = { id: "task-2", ...newTask };
        apiClient.post.mockResolvedValue({ data: [createdTask] });

        const result = await createTask(newTask);

        expect(apiClient.post).toHaveBeenCalledWith("/tasks", newTask, {
            headers: {
                Authorization: "Bearer " + accessToken,
                Prefer: "return=representation",
            },
        });
        expect(result).toEqual(createdTask);
    });

    it("edita una tarea por su id y devuelve la fila actualizada", async () => {
        const update = { title: "Título actualizado" };
        const updatedTask = { id: "task-3", ...update };
        apiClient.patch.mockResolvedValue({ data: [updatedTask] });

        const result = await editTask("task-3", update);

        expect(apiClient.patch).toHaveBeenCalledWith("/tasks", update, {
            params: {
                id: "eq.task-3",
            },
            headers: {
                Authorization: "Bearer " + accessToken,
                Prefer: "return=representation",
            },
        });
        expect(result).toEqual(updatedTask);
    });

    it("elimina una tarea por su id", async () => {
        apiClient.delete.mockResolvedValue({});

        await deleteTask("task-4");

        expect(apiClient.delete).toHaveBeenCalledWith("/tasks", {
            params: {
                id: "eq.task-4",
            },
            headers: {
                Authorization: "Bearer " + accessToken,
            },
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
            headers: {
                Authorization: "Bearer " + accessToken,
            },
        });
        expect(result).toEqual(tasks);
    });
});

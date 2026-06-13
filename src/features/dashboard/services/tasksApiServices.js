import { apiClient } from "../../../lib/apiClient";
import { getSession } from "../../auth/services";

async function getAccessToken() {
    const result = await getSession();

    if (!result.success) {
        throw new Error(result.error || "No se pudo obtener la sesion");
    }

    const accessToken = result.session?.access_token;

    if (!accessToken) {
        throw new Error("No hay una sesion activa");
    }

    return accessToken;
}

async function getTasks(status, title, priority) {

    const accessToken = await getAccessToken();

    const params = {
        select: "*",
        order: "created_at.desc",
    };

    if (status) {
        params.status = `eq.${status}`;
    }

    if (title) {
        params.title = `ilike.%${title}%`;
    }

    if (priority) {
        params.priority = `eq.${priority}`;
    }

    const response = await apiClient.get("/tasks", {
        params,
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });

    return response.data;
}

async function createTask(task) {
    const accessToken = await getAccessToken();

    const response = await apiClient.post("/tasks", task, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
            Prefer: "return=representation",
        },
    });

    return response.data[0];
}

async function editTask(id, update) {
    const accessToken = await getAccessToken();

    const response = await apiClient.patch("/tasks", update, {
        params: {
            id: `eq.${id}`,
        },
        headers: {
            Authorization: `Bearer ${accessToken}`,
            Prefer: "return=representation",
        },
    });

    return response.data[0];
}

async function deleteTask(id) {
    const accessToken = await getAccessToken();

    await apiClient.delete("/tasks", {
        params: {
            id: `eq.${id}`,
        },
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
}

export { getTasks, createTask, editTask, deleteTask };

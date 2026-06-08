import { apiClient } from "../../../lib/apiClient";
import { getSession } from "../../auth/services";

async function getAccessToken() {
    const result = await getSession();

    if (!result.success) {
        throw new Error(result.error || "No se pudo obtener la sesión");
    }

    const accessToken = result.session?.access_token;

    if (!accessToken) {
        throw new Error("No hay una sesion activa");
    }

    return accessToken;
}

async function getTasks(status, title) {
    const accessToken = await getAccessToken();

    const params = {
        select: "*",
        order: "created_at.desc",

    }

    if (status) {
        params.status = `eq.${status}`
    }

    if (title) {
        params.title = `ilike.%${title}%`;
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
    })

    return response.data[0];
}

async function editTask(id, update) {
    const accessToken = await getAccessToken();

    const response = await apiClient.patch(`/tasks?id=eq.${id}`, update, {

        headers: {
            Authorization: `Bearer ${accessToken}`,
            Prefer: "return=representation",
        },

    });
    return response.data[0];
}


async function eraseTasks(taskid) {

    const access_token = await getAccessToken();

    await apiClient.delete(`/tasks?id=eq.${taskid}`, {

        headers: {
            Authorization: `Bearer ${access_token}`,
        }
    });
}


export { getTasks, createTask, editTask, eraseTasks };

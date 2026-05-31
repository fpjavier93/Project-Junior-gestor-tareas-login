

import { apiClient } from "../../../lib/apiClient";
import { getSession } from "../../auth/services";

async function getAccessToken() {
    const result = await getSession();

    return result.session.access_token;
}

async function getTasks() {
    const accessToken = await getAccessToken();

    const response = await apiClient.get("/tasks?select=*&order=created_at.desc", {
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



export { getTasks, createTask, editTask };
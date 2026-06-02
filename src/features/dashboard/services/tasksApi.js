

import { apiClient } from "../../../lib/apiClient";
import { getSession } from "../../auth/services";

async function getAccessToken() {
    const result = await getSession();

    return result.session.access_token;
}

async function getTasks(status) {
    const accessToken = await getAccessToken();
    const statusFilter = status ? `&status=eq.${status}` : "";

    const response = await apiClient.get(`/tasks?select=*&order=created_at.desc${statusFilter}`, {
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

import { apiClient } from "../../../lib/apiClient";

async function getTasks(status, title, priority, task_type) {
    const params = {
        select: "*",
        order: "created_at.desc",
    };

    if (status) params.status = `eq.${status}`;
    if (title) params.title = `ilike.%${title}%`;
    if (priority) params.priority = `eq.${priority}`;
    if (task_type) params.task_type = `eq.${task_type}`;

    const response = await apiClient.get("/tasks", { params });
    return response.data;
}

async function createTask(task) {
    const response = await apiClient.post("/tasks", task, {
        headers: { Prefer: "return=representation" },
    });
    return response.data[0];
}

async function editTask(id, update) {
    const response = await apiClient.patch("/tasks", update, {
        params: { id: `eq.${id}` },
        headers: { Prefer: "return=representation" },
    });
    return response.data[0];
}

async function deleteTask(id) {
    await apiClient.delete("/tasks", { params: { id: `eq.${id}` } });
}

async function getTasksById(projectID) {
    const params = {
        select: "*",
        order: "created_at.desc",
        project_id: `eq.${projectID}`,
    };

    const response = await apiClient.get("/tasks", { params });
    return response.data;
}

export { getTasks, createTask, editTask, deleteTask, getTasksById };

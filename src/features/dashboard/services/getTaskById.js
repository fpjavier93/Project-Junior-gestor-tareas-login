import { apiClient } from "../../../lib/apiClient";

export async function getTaskById(taskid) {
    const params = { select: "*", id: `eq.${taskid}` };
    const response = await apiClient.get("/tasks", { params });
    return response.data[0];
}

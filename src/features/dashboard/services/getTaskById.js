import { getAccessToken } from "./tasksApiServices"
import { apiClient } from "../../../lib/apiClient";

export async function getTaskById(taskid) {

    const accessToken = await getAccessToken();

    const params = {
        select: "*",
        id: `eq.${taskid}`
    };


    const response = await apiClient.get("/tasks", {
        params,
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });

    return response.data[0];

}
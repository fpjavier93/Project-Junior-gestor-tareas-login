import { apiClient } from "../../../lib/apiClient";
import { getSession } from "../../auth/services";
import { getAccessToken } from "./tasksApiServices";

export async function createProject(project) {

    const access_token = await getAccessToken();

    const response = await apiClient.post("/projects", project, {
        headers: {
            Authorization: `Bearer ${access_token}`,
            Prefer: "return=representation",
        },
    })
    return response.data[0];

}

export async function getProject() {

    const access_token = await getAccessToken();

    const params = {
        select: "*",
        order: "created_at.desc",
    };

    const response = await apiClient.get("/projects", {
        params,
        headers: {
            Authorization: `Bearer ${access_token}`,
        },
    });

    return response.data;

}

export async function getProjectByID(projects_id) {

    const access_token = await getAccessToken();

    const params = {
        select: "*",
        order: "created_at.desc",
        id: `eq.${projects_id}`
    };

    const response = await apiClient.get("/projects", {
        params,
        headers: {
            Authorization: `Bearer ${access_token}`,
        },
    });

    return response.data[0];
}

export async function deleteProjectByID(project_id) {

    const access_token = await getAccessToken();

    const response = await apiClient.delete("/projects", {
        params: {
            id: `eq.${project_id}`,
        },
        headers: {
            Authorization: `Bearer ${access_token}`,
            Prefer: "return=representation",
        },
    });

    const deletedProject = response.data?.[0];

    if (!deletedProject) {
        const error = new Error("Supabase no eliminó el proyecto");
        error.code = "PROJECT_NOT_DELETED";
        throw error;
    }

    return deletedProject;
}
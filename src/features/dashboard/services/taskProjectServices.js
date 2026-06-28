import { apiClient } from "../../../lib/apiClient";
import { getSession } from "../../auth/services";

export async function getAccessToken() {

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
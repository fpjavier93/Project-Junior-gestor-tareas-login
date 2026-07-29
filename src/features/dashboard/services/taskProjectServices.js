import { apiClient } from "../../../lib/apiClient";

export async function createProject(project) {
    const response = await apiClient.post("/projects", project, {
        headers: { Prefer: "return=representation" },
    });
    return response.data[0];
}

export async function getProject() {
    const params = { select: "*", order: "created_at.desc" };
    const response = await apiClient.get("/projects", { params });
    return response.data;
}

export async function getProjectByID(projects_id) {
    const params = {
        select: "*",
        order: "created_at.desc",
        id: `eq.${projects_id}`,
    };
    const response = await apiClient.get("/projects", { params });
    return response.data[0];
}

export async function deleteProjectByID(project_id) {
    const response = await apiClient.delete("/projects", {
        params: { id: `eq.${project_id}` },
        headers: { Prefer: "return=representation" },
    });

    const deletedProject = response.data?.[0];
    if (!deletedProject) {
        const error = new Error("Supabase no eliminó el proyecto");
        error.code = "PROJECT_NOT_DELETED";
        throw error;
    }
    return deletedProject;
}

import getUserID from "../services/CreateTaskServices";
import { createProject } from "../services/taskProjectServices";
import { useState } from "react";
import { getProject } from "../services/taskProjectServices";

export function useProject() {
    const [loading, setloading] = useState(false);
    const [project, setProject] = useState([]);
    const [projectSelected, setprojectSelected] = useState("Sin proyecto");


    async function handleSubmitCreateProjectForm(e) {
        e.preventDefault();

        const formData = new FormData(e.target);
        const dataProject = Object.fromEntries(formData.entries());

        const newDataForm = {
            user_id: await getUserID(),
            ...dataProject,
        };

        try {
            setloading(true);

            await createProject(newDataForm);

            e.target.reset()

        } catch (error) {
            console.log(error.response?.data || error);
        } finally {
            setloading(false)
        }

    }

    async function handleProjects() {
        setloading(true);

        try {
            const response = await getProject();
            setProject(response);


        } catch (error) {
            console.error("Error al cargar los proyectos:", error.response?.data || error);
        } finally {
            setloading(false)
        }
    }

    function hanldeProjectSelected(value) {

        setprojectSelected(value);

    }



    return { handleSubmitCreateProjectForm, loading, setloading, project, setProject, handleProjects, projectSelected, hanldeProjectSelected };
};



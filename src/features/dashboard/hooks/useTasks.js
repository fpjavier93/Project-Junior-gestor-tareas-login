import { useState } from "react";
import { editTask, getTasks, createTask } from "../services/tasksApiServices";
import { TASK_ERROR_TYPES } from "../constants/taskErrorTypes";
import getUserID from "../services/CreateTaskServices";

export function useTasks() {

    const [userTasks, setUserTasks] = useState([]);
    const [error, setError] = useState({ status: false, type: 0 });
    const [loading, setLoading] = useState(true);
    const [select, setSelect] = useState("todas");
    const [searching, setSearching] = useState("");
    const [createTaskPriority, setCreateTaskPriority] = useState("");
    const [editTaskPriority, setEditTaskPriority] = useState("")
    const [taskPriorityFilter, setTaskPriorityFilter] = useState("");
    const [submitError, setSubmitError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [updatingStatusId, setUpdatingStatusId] = useState(null);
    const [titleEditTask, setTitleEditTask] = useState("");
    const [descriptionEditTask, setDescriptionEditTask] = useState("");
    const [taskType, setTaskType] = useState("");



    function getStatusFilter(status) {
        return status === "todas" ? undefined : status;
    }

    async function handleTaskStatusChange(task, select) {

        try {
            setSubmitError("");
            setUpdatingStatusId(task.id);

            const nextStatus = task.status === "completed" ? "pending" : "completed";
            const updatedTaskFromApi = await editTask(task.id, { status: nextStatus });
            const updatedTask = updatedTaskFromApi || { ...task, status: nextStatus };

            setUserTasks((currentTasks) => {
                if (select !== "todas" && updatedTask.status !== select) {
                    return currentTasks.filter((currentTask) => currentTask.id !== updatedTask.id);
                }

                return currentTasks.map((currentTask) =>
                    currentTask.id === updatedTask.id ? updatedTask : currentTask
                );
            });

        } catch (error) {
            console.error("Error al actualizar el estado de la tarea:", error.response?.data || error);
            setSubmitError("No se pudo actualizar el estado de la tarea");
        } finally {
            setUpdatingStatusId(null);
        }
    }

    async function loadTasks() {

        setError({ status: false, type: 0 })

        try {

            const getUserTasks = await getTasks();

            setUserTasks(getUserTasks);
        }
        catch (error) {
            console.error("Error al cargar las tareas:", error.response?.data || error);

            setError({ status: true, type: TASK_ERROR_TYPES.LOAD })
        }
        finally {
            setLoading(false);
        }
    };

    async function handleSelect(value) {

        setSelect(value);

        try {

            const task = await getTasks(
                getStatusFilter(value),
                searching,
                taskPriorityFilter,
                taskType
            );

            setUserTasks(task);


        } catch (error) {
            console.error("Error al filtrar tareas por estado:", error.response?.data || error);
            setError({ status: true, type: TASK_ERROR_TYPES.LOAD })
            setSelect("todas")
        }
    }

    async function handleSearch(value) {

        try {

            setSearching(value)


            const tasks = await getTasks(
                getStatusFilter(select),
                value,
                taskPriorityFilter,
                taskType
            );

            setUserTasks(tasks)

        } catch (error) {
            console.error("Error al buscar tareas:", error.response?.data || error);

            setError({ status: true, type: TASK_ERROR_TYPES.LOAD })

        }
    }


    function handleCreateTaskPriorityChange(priority) {

        return setCreateTaskPriority(priority)

    };


    async function handleTaskPriorityFilterChange(value) {

        try {

            setTaskPriorityFilter(value);

            const priorityTask = await getTasks(
                getStatusFilter(select),
                searching,
                value,
                taskType)

            setUserTasks(priorityTask);

        } catch (error) {
            console.error("Error al filtrar tareas por prioridad:", error.response?.data || error);

            setError({ status: true, type: TASK_ERROR_TYPES.LOAD })
            setTaskPriorityFilter("")
        }

    }

    async function handleSubmitCreateTaskForm(data, setSelectedImage, reset) {

        setIsSubmitting(true)

        const newDataTask = {
            user_id: await getUserID(),
            ...data
        };

        if (newDataTask.project_id === "") {
            newDataTask.project_id = null;
        }

        try {
            await createTask(newDataTask);

            setSelectedImage("");
            reset();


        } catch (error) {
            console.error("Error al crear la tarea:", error.response?.data || error);

            setError({ status: true, type: TASK_ERROR_TYPES.CREATE })

        } finally {

            setIsSubmitting(false);
        }
    }

    function selectTypeTask(value) {

        setTaskType(value);

    }

    async function hanldeSearchTypeTask(value) {

        setTaskType(value);

        try {

            const typeTask = await getTasks(
                getStatusFilter(select),
                searching,
                taskPriorityFilter,
                value
            )

            setUserTasks(typeTask)
        } catch (error) {
            console.error("Error al filtrar tareas por tipo:", error.response?.data || error);
            setError({ status: true, type: TASK_ERROR_TYPES.LOAD })

        }

    }




    return {
        userTasks, setUserTasks, error, setError, handleTaskStatusChange, loadTasks, loading, handleSelect, select,
        searching, handleSearch, handleCreateTaskPriorityChange, createTaskPriority, taskPriorityFilter,
        setCreateTaskPriority, handleTaskPriorityFilterChange, handleSubmitCreateTaskForm, isSubmitting, submitError,
        titleEditTask, descriptionEditTask, setTitleEditTask, setDescriptionEditTask, editTaskPriority, setEditTaskPriority,
        updatingStatusId, selectTypeTask, taskType, hanldeSearchTypeTask
    };

};



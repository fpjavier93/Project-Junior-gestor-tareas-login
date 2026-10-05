import { useState } from "react";
import { editTask, getTasks, createTask } from "../services/tasksApiServices";
import { TASK_ERROR_TYPES } from "../constants/taskErrorTypes";
import getUserID from "../services/CreateTaskServices";
import { Toast } from "radix-ui";
import { toast } from "sonner";

const TASKS_PER_PAGE = 10;

export function useTasks() {

    const [userTasks, setUserTasks] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalTasks, setTotalTasks] = useState(0);
    const [error, setError] = useState({ status: false, type: 0 });
    const [loading, setLoading] = useState(true);
    const [select, setSelect] = useState("todas");
    const [searching, setSearching] = useState("");
    const [createTaskPriority, setCreateTaskPriority] = useState("");
    const [editTaskPriority, setEditTaskPriority] = useState("");
    const [taskPriorityFilter, setTaskPriorityFilter] = useState("");
    const [submitError, setSubmitError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [titleEditTask, setTitleEditTask] = useState("");
    const [descriptionEditTask, setDescriptionEditTask] = useState("");
    const [updatingStatusId, setUpdatingStatusId] = useState(null)
    const [taskType, setTaskType] = useState("");



    function getStatusFilter(status) {
        return status === "todas" ? undefined : status;
    }

    async function handleTaskStatusChange(task, select) {

        try {
            setSubmitError("");
            setUpdatingStatusId(task.id);

            const nextStatus = task.status === "completed" ? "pending" : "completed";

            const completedAt =
                nextStatus === "completed"
                    ? new Date().toISOString()
                    : null;

            const updatedTaskFromApi = await editTask(task.id, {
                status: nextStatus,
                completed_at: nextStatus === "completed"
                    ? new Date().toISOString()
                    : null
            });

            const updatedTask = updatedTaskFromApi || {
                ...task,
                status: nextStatus,
                completed_at: completedAt,
            };

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

            const { tasks, total } = await getTasks(
                getStatusFilter(select),
                searching,
                taskPriorityFilter,
                taskType,
                currentPage,
                TASKS_PER_PAGE
            );

            setUserTasks(tasks);
            setTotalTasks(total);
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

            const { tasks, total } = await getTasks(
                getStatusFilter(value),
                searching,
                taskPriorityFilter,
                taskType,
                0,
                TASKS_PER_PAGE
            );

            setUserTasks(tasks);
            setTotalTasks(total);
            setCurrentPage(0);


        } catch (error) {
            console.error("Error al filtrar tareas por estado:", error.response?.data || error);
            setError({ status: true, type: TASK_ERROR_TYPES.LOAD })
            setSelect("todas")
        }
    }

    async function handleSearch(value) {

        try {

            setSearching(value)

            const { tasks, total } = await getTasks(
                getStatusFilter(select),
                value,
                taskPriorityFilter,
                taskType,
                0,
                TASKS_PER_PAGE
            );

            setUserTasks(tasks);
            setTotalTasks(total);
            setCurrentPage(0);

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

            const { tasks, total } = await getTasks(
                getStatusFilter(select),
                searching,
                value,
                taskType,
                0,
                TASKS_PER_PAGE
            );

            setUserTasks(tasks);
            setTotalTasks(total);
            setCurrentPage(0);

        } catch (error) {
            console.error("Error al filtrar tareas por prioridad:", error.response?.data || error);

            setError({ status: true, type: TASK_ERROR_TYPES.LOAD })
            setTaskPriorityFilter("")
        }

    }

    async function handleSubmitCreateTaskForm(data, setSelectedImage, reset) {

        setIsSubmitting(true)

        try {
            const newDataTask = {
                user_id: await getUserID(),
                ...data
            };

            if (!newDataTask.has_due_date || newDataTask.due_date === "") {
                newDataTask.due_date = null;
            }

            if (newDataTask.task_type === "") {
                newDataTask.task_type = null;
            }

            delete newDataTask.has_due_date;

            if (newDataTask.project_id === "") {
                newDataTask.project_id = null;
            }

            await createTask(newDataTask);
            toast.success("tarea creada con Exito!")


            setSelectedImage("");
            reset();

        } catch (error) {
            console.error("Error al crear la tarea:", error.response?.data || error);

            setError({ status: true, type: TASK_ERROR_TYPES.CREATE })

        } finally {

            setIsSubmitting(false);
        }
    }


    async function handleSearchTypeTask(value) {

        setTaskType(value);

        try {
            const { tasks, total } = await getTasks(
                getStatusFilter(select),
                searching,
                taskPriorityFilter,
                value,
                0,
                TASKS_PER_PAGE
            );

            setUserTasks(tasks);
            setTotalTasks(total);
            setCurrentPage(0);

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
        updatingStatusId, handleSearchTypeTask, taskType, setSubmitError
    };

};



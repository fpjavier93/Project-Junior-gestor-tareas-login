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
    const [titleEditTask, setTitleEditTask] = useState("");
    const [descriptionEditTask, setDescriptionEditTask] = useState("");



    function getStatusFilter(status) {
        return status === "todas" ? undefined : status;
    }

    async function handleTaskStatusChange(task, select) {

        try {

            const nextStatus = task.status === "completed" ? "pending" : "completed";
            await editTask(task.id, { status: nextStatus });


            const updatedUserTasks = await getTasks(
                getStatusFilter(select),
                searching,
                taskPriorityFilter)

            setUserTasks(updatedUserTasks);
        } catch {

            setError({ status: true, type: TASK_ERROR_TYPES.UPDATE_STATUS })
        }
    }

    async function loadTasks() {

        setError({ status: false, type: 0 })

        try {

            const getUserTasks = await getTasks();

            setUserTasks(getUserTasks);
        }
        catch {

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
                taskPriorityFilter);

            setUserTasks(task);


        } catch {
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
                taskPriorityFilter);

            setUserTasks(tasks)

        } catch {

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
                value)

            setUserTasks(priorityTask);

        } catch {

            setError({ status: true, type: TASK_ERROR_TYPES.LOAD })
            setTaskPriorityFilter("")
        }

    }

    async function handleSubmitCreateTaskForm(e) {


        setIsSubmitting(true);
        e.preventDefault();
        setSubmitError("");

        const formData = new FormData(e.target);

        const dataTask = Object.fromEntries([...formData.entries()].map(([key, value]) => {
            return [key,
                typeof value === "string" ? value.trim() : value
            ]

        }))

        const newDataTask = {
            user_id: await getUserID(),
            ...dataTask
        };

        try {

            await createTask(newDataTask);
            e.target.reset()

        } catch {

            setError({ status: true, type: TASK_ERROR_TYPES.CREATE })

        } finally {

            setIsSubmitting(false);
        }
    }



    return {
        userTasks, setUserTasks, error, setError, handleTaskStatusChange, loadTasks, loading, handleSelect, select,
        searching, handleSearch, handleCreateTaskPriorityChange, createTaskPriority, taskPriorityFilter,
        setCreateTaskPriority, handleTaskPriorityFilterChange, handleSubmitCreateTaskForm, isSubmitting, submitError,
        titleEditTask, descriptionEditTask, setTitleEditTask, setDescriptionEditTask, editTaskPriority, setEditTaskPriority,
    };

};

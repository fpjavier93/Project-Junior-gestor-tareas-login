import { useState } from "react";
import { editTask, getTasks } from "../services/tasksApiServices";
import { TASK_ERROR_TYPES } from "../constants/taskErrorTypes";

export function useTasks() {

    const [userTasks, setUserTasks] = useState([]);
    const [error, setError] = useState({ status: false, type: 0 });
    const [loading, setLoading] = useState(true);
    const [select, setSelect] = useState("todas");
    const [searching, setSearching] = useState("");
    const [isCheckedPriotity, setIsCheckedPriotity] = useState("");
    const [selectPriority, setSelectPriority] = useState("");

    function getStatusFilter(status) {
        return status === "todas" ? undefined : status;

    }

    async function handleTaskStatusChange(task, select) {

        try {
            const nextStatus = task.status === "completed" ? "pending" : "completed";
            await editTask(task.id, { status: nextStatus });


            const updatedUserTasks = await getTasks(getStatusFilter(select))

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

            const task = await getTasks(getStatusFilter(value), searching, selectPriority);

            setUserTasks(task);


        } catch {
            setError({ status: true, type: TASK_ERROR_TYPES.LOAD })
            setSelect("todas")
        }
    }

    async function handleSearch(value) {

        try {

            setSearching(value)


            const tasks = await getTasks(getStatusFilter(select), value, selectPriority);

            setUserTasks(tasks)

        } catch {

            setError({ status: true, type: TASK_ERROR_TYPES.LOAD })

        }
    }


    function handleIsChecked(priority) {

        return setIsCheckedPriotity(priority)

    };


    async function handleSelectPriority(value) {



        try {

            setSelectPriority(value);

            const priorityTask = await getTasks(getStatusFilter(select), searching, value)
            console.log((priorityTask));

            setUserTasks(priorityTask);

        } catch {

            setError({ status: true, type: TASK_ERROR_TYPES.LOAD })
            setIsCheckedPriotity("")
        }

    }



    return {
        userTasks, setUserTasks, error, setError, handleTaskStatusChange, loadTasks, loading, handleSelect, select, searching, handleSearch, handleIsChecked, isCheckedPriotity, selectPriority, setIsCheckedPriotity, handleSelectPriority
    };

};

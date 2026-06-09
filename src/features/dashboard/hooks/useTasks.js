import { useState } from "react";
import { editTask, getTasks } from "../services/tasksApiServices";



export function useTasks() {

    const [userTasks, setUserTasks] = useState([]);
    const [error, setError] = useState({ status: false, type: 0 });
    const [loading, setLoading] = useState(true);
    const [select, setSelect] = useState("todas");
    const [searching, setSearching] = useState("");

    async function handleTaskStatusChange(task, select) {

        try {
            const nextStatus = task.status === "completed" ? "pending" : "completed";
            await editTask(task.id, { status: nextStatus });


            const updatedUserTasks = await getTasks(select === "todas" ? undefined : select)

            setUserTasks(updatedUserTasks);
        } catch {

            setError({ status: true, type: 3 })
        }
    }

    async function loadTasks() {

        setError({ status: false, type: 0 })

        try {

            const getUserTasks = await getTasks();

            setUserTasks(getUserTasks);
        }
        catch {

            setError({ status: true, type: 1 })
        }
        finally {
            setLoading(false);
        }
    };

    async function handleSelect(value) {

        setSelect(value);

        let tasks;

        try {

            if (value === "todas") {

                tasks = await getTasks()
            }
            if (value === "pending") {

                tasks = await getTasks(value)

            }
            if (value === "completed") {

                tasks = await getTasks(value)
            }

            setUserTasks(tasks);
        } catch {
            setError({ status: true, type: 1 })
            setSelect("todas")
        }
    }

    async function handleSearch(value) {

        try {
            setSearching(value)
            let tasks = [];

            tasks = await getTasks(select === "todas" ? undefined : select, value);

            setUserTasks(tasks)

        } catch {

            setError({ status: true, type: 1 })

        }
    }


    return {
        userTasks, setUserTasks, error, setError, handleTaskStatusChange, loadTasks, loading, setLoading, handleSelect, select, setSelect, searching, setSearching, handleSearch
    };

};

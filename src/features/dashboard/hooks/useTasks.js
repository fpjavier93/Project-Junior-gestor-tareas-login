import { useState } from "react";
import { editTask, getTasks } from "../services/tasksApiServices";

export function useTasks() {

    const [userTasks, setUserTasks] = useState([]);
    const [error, setError] = useState({ status: false, type: 0 });
    const [loading, setLoading] = useState(true);

    async function handleTaskStatusChange(task, select) {

        try {
            const nextStatus = task.status === "completed" ? "pending" : "completed";
            const updatedTask = await editTask(task.id, { status: nextStatus });


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

    return {
        userTasks, setUserTasks, error, setError, handleTaskStatusChange, loadTasks, loading, setLoading
    };

};
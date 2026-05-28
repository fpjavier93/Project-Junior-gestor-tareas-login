import { supabase } from "../../../../utils/supabase";

async function getUserID() {
    const { data, error } = await supabase.auth.getUser();

    if (error) {
        console.log('Error al recibir datos')
        return;
    }

    const userID = data.user.id;

    return userID;

}

async function createTask(task) {
    const { data, error } = await supabase
        .from("tasks")
        .insert(task)
        .select()
        .single();

    if (error) {
        console.log("Error al crear la tarea", error.message);
        throw error;
    }

    return data;
}

async function updateTask(task) {


    const { data, error } = await supabase

        .from("tasks")

        .update(task)

        .eq("id", task.id)

        .select()

        .single();

    if (error) {

        console.log("Error al actualizar la tarea", error.message);

        throw error;

    }
    console.log(data);
    return data;

}

export { getUserID, updateTask, createTask };

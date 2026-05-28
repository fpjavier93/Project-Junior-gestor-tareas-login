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

export async function createTask(task) {
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

export default getUserID;

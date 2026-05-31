import { supabase } from "../../../../utils/supabase";
import { signOut } from "../../auth/services";



async function getUserDataId() {
    const { data, error } = await supabase.auth.getUser();

    if (error) {
        console.log('ocurrio un error')
    }

    const userName = data.user.id;

    return userName;
}




async function handlesignOut(navigate) {
    const result = await signOut();
    if (result.success) {
        console.log('deslogin con succeso')
        navigate("/")
    }
}




async function getTasksUserData(userID, status) {

    let query = supabase //consulta a la BD
        .from("tasks")
        .select("*")
        .eq("user_id", userID)

    if (status) {
        query = query.eq("status", status);
    }

    const { data, error } = await query;

    if (error) {
        console.log('Ocurrio un error al traer las tareas')
    }

    return data;

}

export { getUserDataId, handlesignOut, getTasksUserData };
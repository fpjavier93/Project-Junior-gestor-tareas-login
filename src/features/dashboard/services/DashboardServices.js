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




async function getTasksUserData(userID) {

    console.log('ejecutando getTasksUserData');
    console.log("Mostrando user ID " + userID);

    const { data, error } = await supabase
        .from("tasks")
        .select("*")
        .eq("user_id", userID);

    if (error) {
        console.log('Ocurrio un error al traer las tareas')
    }
    return data;

}

export { getUserDataId, handlesignOut, getTasksUserData };
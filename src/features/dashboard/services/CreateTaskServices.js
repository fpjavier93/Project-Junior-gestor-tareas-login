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

export default getUserID;
import { supabase } from "../../../../utils/supabase";

async function getUserID() {
    const { data, error } = await supabase.auth.getUser();

    if (error) {
        return;
    }

    const userID = data.user.id;

    return userID;

}


export default getUserID;

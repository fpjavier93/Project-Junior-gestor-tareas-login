import { supabase } from "../../../../utils/supabase";
import { signOut } from "../../auth/services";



async function getUserDataId() {
    const { data, error } = await supabase.auth.getUser();

    if (error) {
    }

    const userName = data.user.id;

    return userName;
}




async function handlesignOut(navigate) {
    const result = await signOut();
    if (result.success) {
        navigate("/")
    }
}





export { getUserDataId, handlesignOut };
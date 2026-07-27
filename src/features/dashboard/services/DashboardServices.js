import { supabase } from "../../../../utils/supabase";
import { signOut } from "../../auth/services";


async function handleSignOut(navigate) {
    const result = await signOut();
    if (result.success) {
        navigate("/")
    }
}


export { getUserDataId, handleSignOut };
import { supabase } from "../../../../utils/supabase";
import { signOut } from "../../auth/services";



async function getUsername() {
    const { data, error } = await supabase.auth.getUser();

    if (error) {
        console.log('ocurrio un error')
    }

    const userName = data.user.user_metadata.nombre;

    console.log("nombre de usuario " + userName);
    return userName;
}

async function handlesignOut(navigate) {
    const result = await signOut();
    if (result.success) {
        console.log('deslogin con succeso')
        navigate("/")
    }

}

export { getUsername, handlesignOut };
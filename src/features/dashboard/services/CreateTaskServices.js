import { supabase } from "../../../../utils/supabase"

async function getUserId() {
    const { data, error } = await supabase.auth.getUser()

    if (error) {
        throw new Error("No se pudo obtener el usuario autenticado.", {
            cause: error,
        })
    }

    if (!data.user) {
        throw new Error("No hay una sesión activa.")
    }

    return data.user.id
}

export default getUserId

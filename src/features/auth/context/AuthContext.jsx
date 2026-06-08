import { createContext, useContext, useEffect, useState } from "react";
import { getSession, onAuthStateChange } from "../services";


const AuthContext = createContext();


export function AuthProvider({ children }) {
    const [session, setSession] = useState(null);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadSession() {
            const result = await getSession();

            if (result.success) {
                setSession(result.session);               //Ese ?. se llama optional chaining.
                setUser(result.session?.user ?? null);    //si result.session existe, dame result.session.user
            }                                             //si result.session no existe, devuelve undefined

            setLoading(false);
        }

        loadSession();

        const { data } = onAuthStateChange((_event, session) => {  //Lo escribimos como _event porque no lo estamos usando. 
            // El _ es una forma común de decir “este parámetro existe, pero no me interesa ahora”.
            setSession(session);
            setUser(session?.user ?? null);
            setLoading(false);
        });

        return () => {

            data.subscription.unsubscribe();
        };

    }, []);

    const value = {
        session,
        user,
        loading,
        isAuthenticated: Boolean(user), //Boolean pregunta: si dentro de user hay algo devuelve true, si no hay nada, devuelve false,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}



export function useAuth() {
    return useContext(AuthContext);
}
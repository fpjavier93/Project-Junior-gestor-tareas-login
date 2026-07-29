import { createContext, useContext, useEffect, useState, useMemo } from "react";
import { getSession, onAuthStateChange } from "../services";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [session, setSession] = useState(null);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadSession() {
            const result = await getSession();

            if (result.success && result.session) {
                setSession(result.session);
                setUser(result.session.user ?? null);
            } else {
                setSession(null);
                setUser(null);
            }

            setLoading(false);
        }

        loadSession();

        const { data } = onAuthStateChange((_event, session) => {
            setSession(session);
            setUser(session?.user ?? null);
            setLoading(false);
        });

        return () => {
            data.subscription.unsubscribe();
        };

    }, []);

    const value = useMemo(() => ({
        session,
        user,
        loading,
        isAuthenticated: Boolean(user)
    }), [session, user, loading])

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);

    if (context === undefined) {
        throw new Error(
            'useAuth debe usarse dentro de un AuthProvider'
        );
    }

    return context;
}
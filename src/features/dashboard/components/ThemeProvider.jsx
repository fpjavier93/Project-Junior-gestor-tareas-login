import { createContext, useContext, useEffect, useState } from "react"

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
    // Al abrir la app:
    // - usa el tema guardado previamente;
    // - si no existe, comienza en modo claro.

    const [theme, setTheme] = useState(() => {
        return localStorage.getItem("taskflow-theme") || "light"
    });

    useEffect(() => {

        const html = document.documentElement;

        html.classList.remove("light", "dark") // Garantiza que solo haya un tema activo.

        html.classList.add(theme) // Si theme vale "dark", <html> tendrá class="dark".

        localStorage.setItem("taskflow-theme", theme)

        return () => {
            html.classList.remove("light", "dark");
        }

    }, [theme]);

    return (

        <ThemeContext.Provider value={{ theme, setTheme }} >
            {children}
        </ThemeContext.Provider>
    )
};

export function useTheme() {
    const context = useContext(ThemeContext)

    if (!context) {
        throw new Error("useTheme debe usarse dentro de ThemeProvider")
    }

    return context
}


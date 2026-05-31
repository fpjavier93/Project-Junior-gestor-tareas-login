import axios from "axios";

export const apiClient = axios.create({
    baseURL: `${import.meta.env.VITE_SUPABASE_URL}/rest/v1`,
    headers: {
        apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
        "Content-Type": "application/json",
    },
});
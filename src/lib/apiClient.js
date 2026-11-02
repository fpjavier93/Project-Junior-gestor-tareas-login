import axios from "axios";
import { supabase } from "../../utils/supabase";

export const apiClient = axios.create({
    baseURL: `${import.meta.env.VITE_SUPABASE_URL}/rest/v1`,
    headers: {
        apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
        "Content-Type": "application/json",
    },
});

apiClient.interceptors.request.use(async (config) => {
    const { data } = await supabase.auth.getSession();
    const accessToken = data.session?.access_token;

    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
});

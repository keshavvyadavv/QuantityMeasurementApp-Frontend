import axios from "axios";

export const API_BASE_URL =
    import.meta.env.VITE_API_BASE_URL || "https://quantity-measurement-api-gateway.onrender.com";

export const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");

    const publicRoutes = [
        "/auth/register",
        "/auth/login",
        "/oauth2/authorization/github",
    ];

    const isPublicRoute = publicRoutes.some((route) =>
        config.url?.includes(route)
    );

    if (token && !isPublicRoute) {
        config.headers.Authorization = `Bearer ${token}`;
    } else if (config.headers?.Authorization) {
        delete config.headers.Authorization;
    }

    return config;
});
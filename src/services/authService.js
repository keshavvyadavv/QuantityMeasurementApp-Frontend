import { api, API_BASE_URL } from "./api";

export const register = async (data) => {
    const res = await api.post("/auth/register", data);
    return res.data;
};

export const login = async (data) => {
    const res = await api.post("/auth/login", data);
    return res.data;
};

export const loginWithGithub = () => {
    window.location.href = `${API_BASE_URL}/oauth2/authorization/github`;
};
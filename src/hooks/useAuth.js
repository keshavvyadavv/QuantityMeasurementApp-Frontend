import { useNavigate } from "react-router-dom";

export default function useAuth() {
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem("token");
        navigate("/");
    };

    const isLoggedIn = () => !!localStorage.getItem("token");

    return { logout, isLoggedIn };
}
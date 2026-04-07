import { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
    const navigate = useNavigate();

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const tokenFromUrl = params.get("token");
        if (tokenFromUrl) {
            localStorage.setItem("token", tokenFromUrl);
            navigate("/dashboard", { replace: true });
        }
    }, [navigate]);

    const token = localStorage.getItem("token");
    return token ? children : <Navigate to="/" replace />;
}
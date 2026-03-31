import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthPage from "../pages/AuthPage";
import DashboardPage from "../pages/DashboardPage";
import ProtectedRoute from "./ProtectedRoute";

export default function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<AuthPage />} />
                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <DashboardPage />
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
}
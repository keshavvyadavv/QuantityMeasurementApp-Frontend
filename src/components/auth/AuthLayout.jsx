import { useState } from "react";
import Login from "./Login";
import Signup from "./Signup";
import Toast from "../common/Toast";
import useToast from "../../hooks/useToast";
// Place your shopingimg.png at: src/assets/shopingimg.png
import img from "../../assets/shopingimg.png";

export default function AuthLayout() {
    const [tab, setTab] = useState("signup");
    const { toast, showToast } = useToast();

    // expose switchTab so Login/Signup can call it via the switch-link
    window.__switchAuthTab = setTab;

    return (
        <div className="auth-body">
            {/* Card wrapper */}
            <div
                style={{
                    display: "flex",
                    borderRadius: "18px",
                    background: "transparent",
                    maxWidth: "780px",
                    width: "100%",
                    minHeight: "520px",
                    alignItems: "center",
                }}
            >
                {/* ── LEFT PANEL ───────────────────────────────── */}
                <div
                    style={{
                        width: "300px",
                        minHeight: "300px",
                        borderBottomLeftRadius: "25px",
                        borderTopLeftRadius: "25px",
                        flexShrink: 0,
                        background: "#ffffff",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        borderRight: "1px solid #f0f0f0",
                    }}
                >
                    <div className="illustration-circle">
                        <img src={img} alt="shopping" style={{ width: "170px", height: "170px", objectFit: "contain" }} />
                    </div>
                    <p
                        style={{
                            fontFamily: "var(--font-body)",
                            fontSize: "15px",
                            fontWeight: 700,
                            letterSpacing: "0.06em",
                            color: "#1a1a1a",
                            textAlign: "center",
                            lineHeight: 1.4,
                            textTransform: "uppercase",
                        }}
                    >
                        Quantity Measurement App
                    </p>
                </div>

                {/* ── RIGHT PANEL ──────────────────────────────── */}
                <div
                    style={{
                        flex: 1,
                        padding: "40px 22px",
                        display: "flex",
                        background: "#ffffff",
                        flexDirection: "column",
                        borderRadius: "10px",
                        boxShadow: "0 0px 20px rgba(0.2,0.2,0.2,0.2)",
                        alignSelf: "stretch",
                        justifyContent: "center",
                    }}
                >
                    {/* Tabs */}
                    <div
                        style={{
                            display: "flex",
                            gap: "32px",
                            marginBottom: "32px",
                            borderBottom: "1px solid #e5e7eb",
                            paddingBottom: 0,
                        }}
                    >
                        <button
                            className={`auth-tab-btn ${tab === "login" ? "active" : ""}`}
                            onClick={() => setTab("login")}
                        >
                            LOGIN
                        </button>
                        <button
                            className={`auth-tab-btn ${tab === "signup" ? "active" : ""}`}
                            onClick={() => setTab("signup")}
                        >
                            SIGNUP
                        </button>
                    </div>

                    {/* Form */}
                    {tab === "login" ? (
                        <Login showToast={showToast} />
                    ) : (
                        <Signup showToast={showToast} onSwitchToLogin={() => setTab("login")} />
                    )}
                </div>
            </div>

            {/* Toast */}
            <Toast message={toast.message} type={toast.type} show={toast.show} />
        </div>
    );
}
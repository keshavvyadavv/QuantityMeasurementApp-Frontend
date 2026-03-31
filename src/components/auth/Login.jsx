import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../services/authService";
import { validateLogin } from "../../utils/validation";
import { useAuthContext } from "../../context/AuthContext";
import Loader from "../common/Loader";

// ── Eye icons ─────────────────────────────────────────
const EyeOff = () => (
    <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="none"
         stroke="currentColor" strokeWidth="2">
        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
        <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
        <line x1="1" y1="1" x2="23" y2="23"/>
    </svg>
);
const EyeOn = () => (
    <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="none"
         stroke="currentColor" strokeWidth="2">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
        <circle cx="12" cy="12" r="3"/>
    </svg>
);

export default function Login({ showToast }) {
    const navigate = useNavigate();
    const { saveToken } = useAuthContext();

    const [data, setData] = useState({ email: "", password: "" });
    const [errors, setErrors] = useState({});
    const [showPw, setShowPw] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleChange = (field) => (e) => {
        setData((prev) => ({ ...prev, [field]: e.target.value }));
        if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
    };

    const handleLogin = async () => {
        const errs = validateLogin(data);
        if (Object.keys(errs).length) { setErrors(errs); return; }

        setLoading(true);
        try {
            const res = await login(data);
            saveToken(res.token);
            showToast("Logged in successfully!", "success");
            setTimeout(() => navigate("/dashboard"), 900);
        } catch (err) {
            const msg =
                err?.response?.data || err?.response?.data?.message || "Invalid credentials.";
            setErrors({ email: typeof msg === "string" ? msg : "Invalid credentials." });
            showToast("Login failed.", "error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="form-section">
            {/* Email */}
            <div className="field-group">
                <label htmlFor="loginEmail">Email Id</label>
                <input
                    id="loginEmail"
                    type="email"
                    value={data.email}
                    onChange={handleChange("email")}
                    className={errors.email ? "error-field" : ""}
                />
                {errors.email && (
                    <span className="text-[12px] text-[#dc2626] min-h-[16px]">{errors.email}</span>
                )}
            </div>

            {/* Password */}
            <div className="field-group">
                <label htmlFor="loginPassword">Password</label>
                <div className="relative">
                    <input
                        id="loginPassword"
                        type={showPw ? "text" : "password"}
                        value={data.password}
                        onChange={handleChange("password")}
                        className={`pr-11 ${errors.password ? "error-field" : ""}`}
                        style={{ paddingRight: "44px" }}
                    />
                    <button
                        type="button"
                        onClick={() => setShowPw((v) => !v)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 bg-transparent border-none
                       cursor-pointer text-[#6b7280] hover:text-[#8b1a1a] flex items-center p-[2px]
                       transition-colors duration-[0.25s]"
                        aria-label="Toggle password visibility"
                    >
                        {showPw ? <EyeOn /> : <EyeOff />}
                    </button>
                </div>
                {errors.password && (
                    <span className="text-[12px] text-[#dc2626] min-h-[16px]">{errors.password}</span>
                )}
            </div>

            <button
                className="submit-btn"
                onClick={handleLogin}
                disabled={loading}
            >
                {loading ? <Loader /> : "Login"}
            </button>

            <p className="text-[13px] text-[#6b7280] text-center mt-[2px]">
                Don't have an account?{" "}
                <a
                    href="#"
                    onClick={(e) => { e.preventDefault(); window.__switchAuthTab?.("signup"); }}
                    className="text-[#8b1a1a] font-semibold no-underline hover:underline"
                >
                    Sign up
                </a>
            </p>
        </div>
    );
}
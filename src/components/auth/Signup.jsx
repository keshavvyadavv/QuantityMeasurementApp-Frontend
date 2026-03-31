import { useState } from "react";
import { register } from "../../services/authService";
import { validateSignup } from "../../utils/validation";
import Loader from "../common/Loader";

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

function PasswordInput({ id, label, value, onChange, error, show, onToggle }) {
    return (
        <div className="field-group">
            <label htmlFor={id}>{label}</label>
            <div className="relative">
                <input
                    id={id}
                    type={show ? "text" : "password"}
                    value={value}
                    onChange={onChange}
                    className={error ? "error-field" : ""}
                    style={{ paddingRight: "44px" }}
                />
                <button
                    type="button"
                    onClick={onToggle}
                    className="absolute right-3 top-1/2 -translate-y-1/2 bg-transparent border-none
                     cursor-pointer text-[#6b7280] hover:text-[#8b1a1a] flex items-center p-[2px]
                     transition-colors duration-[0.25s]"
                    aria-label="Toggle password visibility"
                >
                    {show ? <EyeOn /> : <EyeOff />}
                </button>
            </div>
            {error && <span className="text-[12px] text-[#dc2626] min-h-[16px]">{error}</span>}
        </div>
    );
}

export default function Signup({ showToast, onSwitchToLogin }) {
    const [data, setData] = useState({
        name: "", email: "", password: "", confirmPassword: "", mobileNumber: "",
    });
    const [errors, setErrors]   = useState({});
    const [show, setShow]       = useState({ password: false, confirm: false });
    const [loading, setLoading] = useState(false);

    const handleChange = (field) => (e) => {
        setData((prev) => ({ ...prev, [field]: e.target.value }));
        if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
    };
    const toggleShow = (field) => () =>
        setShow((prev) => ({ ...prev, [field]: !prev[field] }));

    const handleSignup = async () => {
        const errs = validateSignup(data);
        if (Object.keys(errs).length) { setErrors(errs); return; }

        setLoading(true);
        try {
            await register({
                name: data.name,
                email: data.email,
                password: data.password,
                mobileNumber: data.mobileNumber,
            });
            showToast("Account created successfully!", "success");
            // reset
            setData({ name: "", email: "", password: "", confirmPassword: "", mobileNumber: "" });
            setErrors({});
            setTimeout(() => onSwitchToLogin?.(), 1000);
        } catch (err) {
            const msg =
                err?.response?.data?.message ||
                err?.response?.data ||
                "Signup failed.";
            showToast(typeof msg === "string" ? msg : "Signup failed.", "error");
            if (typeof msg === "string" && msg.toLowerCase().includes("email")) {
                setErrors({ email: msg });
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="form-section">
            {/* Full Name */}
            <div className="field-group">
                <label htmlFor="fullName">Full Name</label>
                <input
                    id="fullName"
                    type="text"
                    value={data.name}
                    onChange={handleChange("name")}
                    className={errors.name ? "error-field" : ""}
                />
                {errors.name && (
                    <span className="text-[12px] text-[#dc2626] min-h-[16px]">{errors.name}</span>
                )}
            </div>

            {/* Email */}
            <div className="field-group">
                <label htmlFor="emailId">Email Id</label>
                <input
                    id="emailId"
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
            <PasswordInput
                id="password"
                label="Password"
                value={data.password}
                onChange={handleChange("password")}
                error={errors.password}
                show={show.password}
                onToggle={toggleShow("password")}
            />

            {/* Confirm Password */}
            <PasswordInput
                id="confirmPassword"
                label="Confirm Password"
                value={data.confirmPassword}
                onChange={handleChange("confirmPassword")}
                error={errors.confirmPassword}
                show={show.confirm}
                onToggle={toggleShow("confirm")}
            />

            {/* Mobile */}
            <div className="field-group">
                <label htmlFor="mobile">Mobile Number</label>
                <input
                    id="mobile"
                    type="tel"
                    value={data.mobileNumber}
                    onChange={handleChange("mobileNumber")}
                    className={errors.mobileNumber ? "error-field" : ""}
                />
                {errors.mobileNumber && (
                    <span className="text-[12px] text-[#dc2626] min-h-[16px]">{errors.mobileNumber}</span>
                )}
            </div>

            <button className="submit-btn" onClick={handleSignup} disabled={loading}>
                {loading ? <Loader /> : "Signup"}
            </button>

            <p className="text-[13px] text-[#6b7280] text-center mt-[2px]">
                Already have an account?{" "}
                <a
                    href="#"
                    onClick={(e) => { e.preventDefault(); onSwitchToLogin?.(); }}
                    className="text-[#8b1a1a] font-semibold no-underline hover:underline"
                >
                    Login
                </a>
            </p>
        </div>
    );
}
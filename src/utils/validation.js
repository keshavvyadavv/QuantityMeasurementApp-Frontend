
export const isValidEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

export const isValidMobile = (mobile) =>
    /^(\+91|0)?[6-9]\d{9}$/.test(mobile.trim());

// Password: min 6 chars, 1 uppercase, 1 digit, 1 special char
export const isStrongPassword = (password) =>
    password.length >= 6 &&
    /[A-Z]/.test(password) &&
    /\d/.test(password) &&
    /[!@#$^&]/.test(password);

// ── Validate login fields ────────────────────────────
export function validateLogin({ email, password }) {
    const errors = {};
    if (!email)                     errors.email    = "Email required.";
    else if (!isValidEmail(email))  errors.email    = "Invalid email.";
    if (!password)                  errors.password = "Password required.";
    else if (!isStrongPassword(password)) errors.password = "Weak password.";
    return errors;
}

// ── Validate signup fields ───────────────────────────
export function validateSignup({ name, email, password, confirmPassword, mobileNumber }) {
    const errors = {};
    if (!name)              errors.name    = "Full name is required.";
    else if (name.length < 2) errors.name  = "Name must be at least 2 characters.";

    if (!email)                    errors.email    = "Email is required.";
    else if (!isValidEmail(email)) errors.email    = "Invalid email.";

    if (!password)                       errors.password = "Password required.";
    else if (!isStrongPassword(password)) errors.password = "Weak password.";

    if (!confirmPassword)                errors.confirmPassword = "Confirm password.";
    else if (password !== confirmPassword) errors.confirmPassword = "Passwords do not match.";

    if (!mobileNumber)                    errors.mobileNumber = "Mobile required.";
    else if (!isValidMobile(mobileNumber)) errors.mobileNumber = "Invalid mobile.";

    return errors;
}
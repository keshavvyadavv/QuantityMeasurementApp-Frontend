import useAuth from "../../hooks/useAuth";

// Logout SVG icon (white)
const LogoutIcon = () => (
    <img
        src="https://img.icons8.com/?size=30&id=82792&format=png&color=ffffff"
        alt="logout"
        style={{ width: 24, height: 24 }}
    />
);

export default function Header() {
    const { logout } = useAuth();

    return (
        <div className="dash-header">
            <h1>Welcome To Quantity Measurement</h1>

            {/* Desktop logout button */}
            <button
                onClick={logout}
                style={{
                    position: "absolute",
                    right: "2%",
                    borderColor: "white",
                    cursor: "pointer",
                    padding: "10px 15px",
                    background: "transparent",
                    borderRadius: "20px",
                    color: "white",
                    fontSize: "15px",
                    border: "1px solid white",
                }}
                className="hidden sm:block"
            >
                Logout
            </button>

            {/* Mobile logout icon */}
            <button
                onClick={logout}
                style={{
                    position: "absolute",
                    right: "3%",
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                    padding: "8px",
                }}
                className="block sm:hidden"
                aria-label="Logout"
            >
                <LogoutIcon />
            </button>
        </div>
    );
}
export default function Toast({ message, type, show }) {
    return (
        <div className={`toast-container ${show ? "show" : ""} ${type}`}>
            {message}
        </div>
    );
}
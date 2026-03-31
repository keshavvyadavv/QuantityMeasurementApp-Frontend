import { useState, useCallback, useRef } from "react";

export default function useToast() {
    const [toast, setToastState] = useState({ message: "", type: "", show: false });
    const timerRef = useRef(null);

    const showToast = useCallback((message, type = "success", duration = 3000) => {
        if (timerRef.current) clearTimeout(timerRef.current);
        setToastState({ message, type, show: true });
        timerRef.current = setTimeout(() => {
            setToastState((prev) => ({ ...prev, show: false }));
        }, duration);
    }, []);

    return { toast, showToast };
}
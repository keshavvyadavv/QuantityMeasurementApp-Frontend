import { UNITS } from "../../utils/constants";

export default function ResultBox({ result, resultUnit, setResultUnit, type, action, loading }) {
    const units = UNITS[type] || [];
    const showUnit = action !== "Comparison";

    if (!result && !loading) return null;

    // style for result text
    const isWarn    = result?.startsWith?.("⚠");
    const isText    = typeof result === "string" && !isWarn && isNaN(Number(result));

    const resultStyle = {
        fontSize:      isWarn ? "14px" : isText ? "18px" : "32px",
        fontWeight:    700,
        color:         isWarn ? "#ef4444" : "#4A55C9",
        letterSpacing: isText || isWarn ? 0 : "-0.5px",
    };

    return (
        <div className="result-box">
            <div>
                <div className="text-[10px] font-bold tracking-[1px] text-[#8a96a8] uppercase mb-1">
                    Result
                </div>
                {loading ? (
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-[#4A55C9] border-t-transparent rounded-full animate-spin" />
                        <span className="text-sm text-[#6b7280]">Calculating…</span>
                    </div>
                ) : (
                    <div style={resultStyle}>{result ?? "—"}</div>
                )}
            </div>

            {showUnit && !loading && (
                <select
                    className="result-unit-select"
                    value={resultUnit}
                    onChange={(e) => setResultUnit(e.target.value)}
                >
                    {units.map((u) => (
                        <option key={u} value={u}>{u}</option>
                    ))}
                </select>
            )}
        </div>
    );
}
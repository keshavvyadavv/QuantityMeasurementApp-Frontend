import { UNITS, OP_SYMBOL, OP_CYCLE } from "../../utils/constants";

export default function InputBox({
                                     action,
                                     type,
                                     v1, setV1, unit1, setUnit1,
                                     v2, setV2, unit2, setUnit2,
                                     op, setOp,
                                 }) {
    const units = UNITS[type] || [];

    const cycleOp = () => {
        const idx = OP_CYCLE.indexOf(op);
        setOp(OP_CYCLE[(idx + 1) % OP_CYCLE.length]);
    };

    // Grid layout matching original CSS
    const gridStyle = {
        display: "grid",
        gap: "10px",
        marginBottom: "20px",
        alignItems: "end",
        ...(action === "Arithmetic"  && { gridTemplateColumns: "1fr 44px 1fr" }),
        ...(action === "Comparison"  && { gridTemplateColumns: "1fr 1fr" }),
        ...(action === "Conversion"  && { gridTemplateColumns: "1fr" }),
    };

    const label1 = action === "Comparison" ? "From" : action === "Conversion" ? "Value" : "Value 1";
    const label2 = action === "Comparison" ? "To" : "Value 2";

    return (
        <>
            <style>{`
        @media (max-width: 520px) {
          .inputs-responsive {
            grid-template-columns: 1fr !important;
          }
          .op-center { margin: 0 auto; }
        }
      `}</style>

            <div style={gridStyle} className="inputs-responsive">
                {/* ── Value 1 ── */}
                <div>
                    <div className="text-[10px] font-bold tracking-[1px] text-[#8a96a8] uppercase mb-[6px]">
                        {label1}
                    </div>
                    <input
                        className="num-input"
                        type="number"
                        value={v1}
                        onChange={(e) => setV1(e.target.value)}
                    />
                    <select
                        className="unit-select"
                        value={unit1}
                        onChange={(e) => setUnit1(e.target.value)}
                    >
                        {units.map((u) => (
                            <option key={u} value={u}>{u}</option>
                        ))}
                    </select>
                </div>

                {/* ── Operator badge (Arithmetic only) ── */}
                {action === "Arithmetic" && (
                    <div
                        className="operator-box op-center"
                        onClick={cycleOp}
                        title="Click to change operation"
                    >
                        <span id="opSymbol">{OP_SYMBOL[op]}</span>
                        <span className="op-hint">tap</span>
                    </div>
                )}

                {/* ── Value 2 (Arithmetic + Comparison) ── */}
                {action !== "Conversion" && (
                    <div>
                        <div className="text-[10px] font-bold tracking-[1px] text-[#8a96a8] uppercase mb-[6px]">
                            {label2}
                        </div>
                        <input
                            className="num-input"
                            type="number"
                            value={v2}
                            onChange={(e) => setV2(e.target.value)}
                        />
                        <select
                            className="unit-select"
                            value={unit2}
                            onChange={(e) => setUnit2(e.target.value)}
                        >
                            {units.map((u) => (
                                <option key={u} value={u}>{u}</option>
                            ))}
                        </select>
                    </div>
                )}
            </div>
        </>
    );
}
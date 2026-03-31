import { ACTIONS } from "../../utils/constants";

export default function ActionTabs({ selected, onSelect }) {
    return (
        <div>
            <div className="text-[10px] font-bold tracking-[1.2px] text-[#8a96a8] uppercase mb-3">
                Choose Action
            </div>
            <div className="action-tabs" style={{ marginBottom: "20px" }}>
                {ACTIONS.map((a) => (
                    <button
                        key={a}
                        className={`action-tab-btn ${selected === a ? "active" : ""}`}
                        onClick={() => onSelect(a)}
                    >
                        {a}
                    </button>
                ))}
            </div>
        </div>
    );
}
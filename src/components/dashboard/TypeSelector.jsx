import { TYPES } from "../../utils/constants";

export default function TypeSelector({ selected, onSelect }) {
    return (
        <div>
            <div
                className="text-[10px] font-bold tracking-[1.2px] text-[#8a96a8] uppercase mb-3"
            >
                Choose Type
            </div>
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(4, 1fr)",
                    gap: "12px",
                    marginBottom: "28px",
                }}
                className="type-grid-responsive"
            >
                {TYPES.map(({ key, icon, label }) => (
                    <div
                        key={key}
                        className={`type-card ${selected === key ? "active" : ""}`}
                        onClick={() => onSelect(key)}
                    >
                        <span style={{ fontSize: "30px", lineHeight: 1 }}>{icon}</span>
                        <span style={{ fontSize: "13px", fontWeight: 600, color: "#1e2533" }}>
              {label}
            </span>
                    </div>
                ))}
            </div>

            <style>{`
        @media (max-width: 768px) {
          .type-grid-responsive { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 420px) {
          .type-grid-responsive { grid-template-columns: 1fr !important; }
        }
      `}</style>
        </div>
    );
}
import { useState, useEffect } from "react";
import Header from "./Header";
import TypeSelector from "./TypeSelector";
import ActionTabs from "./ActionTabs";
import InputBox from "./InputBox";
import ResultBox from "./ResultBox";
import Toast from "../common/Toast";
import useToast from "../../hooks/useToast";
import { convert, compare, add, subtract, divide } from "../../services/quantityService";
import { UNITS, MEASUREMENT_TYPE_MAP } from "../../utils/constants";

export default function Dashboard() {
    const [type,       setType]       = useState("Length");
    const [action,     setAction]     = useState("Arithmetic");
    const [op,         setOp]         = useState("add");

    const [v1,    setV1]    = useState("1");
    const [unit1, setUnit1] = useState("FEET");
    const [v2,    setV2]    = useState("1");
    const [unit2, setUnit2] = useState("INCHES");

    const [resultUnit, setResultUnit] = useState("FEET");
    const [result,     setResult]     = useState(null);
    const [loading,    setLoading]    = useState(false);

    const { toast, showToast } = useToast();

    // ── Reset units when type changes ──────────────────
    useEffect(() => {
        const units = UNITS[type];
        setUnit1(units[0]);
        setUnit2(units[1] ?? units[0]);
        setResultUnit(units[0]);
        setResult(null);
    }, [type]);

    // ── Reset result when action changes ───────────────
    useEffect(() => {
        setResult(null);
    }, [action]);

    // ── Auto-calculate on any input change ─────────────
    useEffect(() => {
        const timer = setTimeout(() => {
            if (v1 !== "" && !isNaN(v1)) {
                if (action !== "Conversion" && (v2 === "" || isNaN(v2))) return;
                handleCalc();
            }
        }, 300);
        return () => clearTimeout(timer);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [v1, v2, unit1, unit2, resultUnit, action, op, type]);

    // ── API call ───────────────────────────────────────
    const handleCalc = async () => {
        const measurementType = MEASUREMENT_TYPE_MAP[type];

        const payload = {
            value1: parseFloat(v1),
            unit1: unit1,
            value2: parseFloat(v2 ?? v1),
            unit2: action === "Conversion" ? resultUnit : unit2,
            measurementType,
        };

        setLoading(true);
        try {
            let res;

            if (action === "Conversion") {
                res = await convert(payload);
                if (res.error) {
                    setResult("⚠ " + res.errorMessage);
                } else {
                    setResult(fmt(res.resultValue));
                }

            } else if (action === "Comparison") {
                res = await compare(payload);
                if (res.error) {
                    setResult("⚠ " + res.errorMessage);
                } else {
                    // resultString is "true" / "false"
                    const equal = res.resultString === "true";
                    if (equal) setResult("Value 1  =  Value 2");
                    else {
                        // compare base values client-side for > / <
                        const b1 = toBase(parseFloat(v1), unit1, type);
                        const b2 = toBase(parseFloat(v2), unit2, type);
                        setResult(b1 > b2 ? "Value 1  >  Value 2" : "Value 1  <  Value 2");
                    }
                }

            } else {
                // Arithmetic
                if (op === "add") {
                    res = await add({ ...payload, unit2: unit2 });
                } else if (op === "subtract") {
                    res = await subtract({ ...payload, unit2: unit2 });
                } else {
                    res = await divide({ ...payload, unit2: unit2 });
                }

                if (res.error) {
                    setResult("⚠ " + res.errorMessage);
                } else if (op === "divide") {
                    setResult(fmt(res.resultValue));
                } else {
                    setResult(fmt(res.resultValue));
                }
            }
        } catch (err) {
            const msg =
                err?.response?.data?.message ||
                err?.response?.data ||
                "Calculation error.";
            setResult("⚠ " + (typeof msg === "string" ? msg : "Error"));
            showToast("Calculation failed.", "error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="dash-body">
            <Header />

            <div
                style={{
                    background: "transparent",
                    width: "100%",
                    paddingTop: "10px",
                    maxWidth: "800px",
                }}
            >
                <div style={{ padding: "10px 20px 0px 20px" }}>
                    <TypeSelector selected={type} onSelect={setType} />
                    <ActionTabs   selected={action} onSelect={setAction} />
                    <InputBox
                        action={action}
                        type={type}
                        v1={v1} setV1={setV1} unit1={unit1} setUnit1={setUnit1}
                        v2={v2} setV2={setV2} unit2={unit2} setUnit2={setUnit2}
                        op={op} setOp={setOp}
                    />
                    <ResultBox
                        result={result}
                        resultUnit={resultUnit}
                        setResultUnit={setResultUnit}
                        type={type}
                        action={action}
                        loading={loading}
                    />
                </div>
            </div>

            <Toast message={toast.message} type={toast.type} show={toast.show} />
        </div>
    );
}

// ── Helpers ────────────────────────────────────────────
function fmt(n) {
    if (!isFinite(n)) return "∞";
    const abs = Math.abs(n);
    if (abs === 0) return "0";
    if (abs >= 0.001 && abs < 1e7) return parseFloat(n.toPrecision(6)).toString();
    return n.toExponential(4);
}

const FACTORS = {
    Length:  { FEET: 12, INCHES: 1, YARDS: 36, CENTIMETERS: 0.393701 },
    Weight:  { MILLIGRAM: 0.001, GRAM: 1, KILOGRAM: 1000, POUND: 453.592, TONNE: 1_000_000 },
    Volume:  { LITRE: 1, MILLILITRE: 0.001, GALLON: 3.78541 },
    Temperature: {},
};

function toBase(value, unit, type) {
    if (type === "Temperature") {
        if (unit === "CELSIUS")    return value;
        if (unit === "FAHRENHEIT") return (value - 32) * 5 / 9;
        if (unit === "KELVIN")     return value - 273.15;
    }
    return value * (FACTORS[type]?.[unit] ?? 1);
}
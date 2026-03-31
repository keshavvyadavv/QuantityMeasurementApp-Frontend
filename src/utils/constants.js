// ── Measurement types with icons ─────────────────────
export const TYPES = [
    { key: "Length",      icon: "📏", label: "Length" },
    { key: "Weight",      icon: "⚖️", label: "Weight" },
    { key: "Temperature", icon: "🌡️", label: "Temperature" },
    { key: "Volume",      icon: "🧪", label: "Volume" },
];

// ── Units per type  (matches backend enums exactly) ──
export const UNITS = {
    Length:      ["FEET", "INCHES", "YARDS", "CENTIMETERS"],
    Weight:      ["MILLIGRAM", "GRAM", "KILOGRAM", "POUND", "TONNE"],
    Temperature: ["CELSIUS", "FAHRENHEIT", "KELVIN"],
    Volume:      ["LITRE", "MILLILITRE", "GALLON"],
};

// ── measurementType string for API payload ────────────
export const MEASUREMENT_TYPE_MAP = {
    Length:      "LengthUnit",
    Weight:      "WeightUnit",
    Temperature: "TemperatureUnit",
    Volume:      "VolumeUnit",
};

// ── Actions ───────────────────────────────────────────
export const ACTIONS = ["Comparison", "Conversion", "Arithmetic"];

// ── Arithmetic operators ──────────────────────────────
export const OP_CYCLE  = ["add", "subtract", "divide"];
export const OP_SYMBOL = { add: "+", subtract: "−", divide: "÷" };
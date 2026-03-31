import { api } from "./api";

/**
 * Backend expects:
 * {
 *   thisQuantityDTO: { value, unit, measurementType },
 *   thatQuantityDTO: { value, unit, measurementType }
 * }
 */

const buildPayload = ({ value1, unit1, value2, unit2, measurementType }) => ({
    thisQuantityDTO: {
        value: parseFloat(value1),
        unit: unit1,
        measurementType,
    },
    thatQuantityDTO: {
        value: parseFloat(value2 ?? value1), // for convert, value2 is a placeholder
        unit: unit2,
        measurementType,
    },
});

export const convert = (d) =>
    api.post("/api/v1/quantities/convert", buildPayload(d)).then((r) => r.data);

export const compare = (d) =>
    api.post("/api/v1/quantities/compare", buildPayload(d)).then((r) => r.data);

export const add = (d) =>
    api.post("/api/v1/quantities/add", buildPayload(d)).then((r) => r.data);

export const subtract = (d) =>
    api.post("/api/v1/quantities/subtract", buildPayload(d)).then((r) => r.data);

export const divide = (d) =>
    api.post("/api/v1/quantities/divide", buildPayload(d)).then((r) => r.data);
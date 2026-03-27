import { Metric, MetricKey } from "../types/analytics.types";

export const DEPARTMENT_COLORS = [
  "#1a3a6e",
  "#0ea5e9",
  "#22c55e",
  "#f59e0b",
  "#ef4444",
];

export const DIAGNOSIS_COLORS = [
  "#1a3a6e",
  "#0ea5e9",
  "#0d9488",
  "#22c55e",
  "#f59e0b",
  "#ef4444",
  "#8b5cf6",
  "#f97316",
];

export const METRIC_META: Record<MetricKey, Omit<Metric, "key">> = {
  heartRate: {
    label: "Heart Rate",
    unit: "bpm",
    color: "#1a3a6e",
    normalMin: 60,
    normalMax: 100,
  },
  bpSys: {
    label: "BP (Sys)",
    unit: "mmHg",
    color: "#38bdf8",
    normalMin: 90,
    normalMax: 130,
  },
  bpDia: {
    label: "BP (Dia)",
    unit: "mmHg",
    color: "#0ea5e9",
    normalMin: 60,
    normalMax: 85,
  },
  spo2: {
    label: "SpO2",
    unit: "%",
    color: "#0d9488",
    normalMin: 95,
    normalMax: 100,
  },
};

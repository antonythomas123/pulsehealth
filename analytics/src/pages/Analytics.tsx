import React, { useState } from "react";
import Filters from "../components/Filters";
import type {
  FiltersState,
  LineData,
  Metric,
  MetricKey,
} from "../types/analytics.types";
import LineCard from "../components/LineCard";
import vitals from "../data/vitals.json";
import PieCard from "../components/PieCard";

const DEPARTMENT_COLORS = [
  "#1a3a6e",
  "#0ea5e9",
  "#22c55e",
  "#f59e0b",
  "#ef4444",
];

const METRIC_META: Record<MetricKey, Omit<Metric, "key">> = {
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

const Analytics = () => {
  const [filters, setFilters] = useState<FiltersState>({
    date_range: "30",
    department: "ALL",
    group: "",
  });

  const vitalsData: LineData[] = vitals?.vitals || [];

  const departmentData = Object.entries(
    vitalsData.reduce<Record<string, number>>((counts, entry) => {
      counts[entry.department] = (counts[entry.department] || 0) + 1;
      return counts;
    }, {}),
  ).map(([name, value], index) => ({
    name,
    value,
    color: DEPARTMENT_COLORS[index % DEPARTMENT_COLORS.length],
  }));

  const metrics: Metric[] = vitalsData.length
    ? (Object.keys(vitalsData[0]) as Array<keyof (typeof vitalsData)[number]>)
        .filter(
          (key): key is MetricKey =>
            key !== "id" && key !== "time" && key !== "department",
        )
        .map((key) => ({
          key,
          ...METRIC_META[key],
        }))
    : [];

  return (
    <div>
      <header className="mb-10">
        <h1 className="font-headline text-2xl font-extrabold tracking-tight text-on-surface">
          Population Health Analytics
        </h1>
      </header>

      <Filters filters={filters} setFilters={setFilters} />

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        <LineCard
          title="Patient Vitals Trends"
          subtitle=" Mean Heart Rate & Blood Pressure across cohort"
          metrics={metrics}
          data={vitalsData}
        />

        <PieCard
          title="Department Distribution"
          totalCount={String(vitalsData.length)}
          placeholder="TOTAL PATIENTS"
          totalPatients={vitalsData.length}
          data={departmentData}
        />
      </div>
    </div>
  );
};

export default Analytics;

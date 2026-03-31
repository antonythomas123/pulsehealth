import React, { useState } from "react";
import Filters from "../components/Filters";
import type {
  DiagnosisData,
  FiltersState,
  LineData,
  Metric,
  MetricKey,
} from "../types/analytics.types";
import LineCard from "../components/LineCard";
import vitals from "../data/vitals.json";
import PieCard from "../components/PieCard";
import MedicalAdherence from "../components/MedicalAdherence";
import { DEPARTMENT_COLORS, DIAGNOSIS_COLORS, METRIC_META } from "../constants";

const Analytics = () => {
  const [filters, setFilters] = useState<FiltersState>({
    timeRange: "ALL",
    department: "ALL",
    diagnosis: "ALL",
  });

  const vitalsData: LineData[] = vitals?.vitals || [];

  const departmentOptions = [
    { label: "All Departments", value: "ALL" },
    ...Array.from(new Set(vitalsData.map((entry) => entry.department))).map(
      (department) => ({
        label: department,
        value: department,
      }),
    ),
  ];

  const diagnosisOptions = [
    { label: "All Diagnoses", value: "ALL" },
    ...Array.from(new Set(vitalsData.map((entry) => entry.diagnosis))).map(
      (diagnosis) => ({
        label: diagnosis,
        value: diagnosis,
      }),
    ),
  ];

  const filteredVitalsData = vitalsData.filter((entry, index, dataset) => {
    const matchesDepartment =
      filters.department === "ALL" || entry.department === filters.department;
    const matchesDiagnosis =
      filters.diagnosis === "ALL" || entry.diagnosis === filters.diagnosis;

    if (!matchesDepartment || !matchesDiagnosis) {
      return false;
    }

    if (filters.timeRange === "ALL") {
      return true;
    }

    const hoursToInclude = Number(filters.timeRange);
    const startIndex = Math.max(dataset.length - hoursToInclude / 2, 0);

    return index >= startIndex;
  });

  const departmentData = Object.entries(
    filteredVitalsData.reduce<Record<string, number>>((counts, entry) => {
      counts[entry.department] = (counts[entry.department] || 0) + 1;
      return counts;
    }, {}),
  ).map(([name, value], index) => ({
    name,
    value,
    color: DEPARTMENT_COLORS[index % DEPARTMENT_COLORS.length],
  }));

  const diagnosisData: DiagnosisData[] = Object.entries(
    filteredVitalsData.reduce<Record<string, number>>((counts, entry) => {
      counts[entry.diagnosis] = (counts[entry.diagnosis] || 0) + 1;
      return counts;
    }, {}),
  )
    .map(([name, count], index) => ({
      name,
      count,
      percentage: Math.round((count / filteredVitalsData.length) * 100),
      color: DIAGNOSIS_COLORS[index % DIAGNOSIS_COLORS.length],
    }))
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name))
    .slice(0, 4);

  const metrics: Metric[] = filteredVitalsData.length
    ? (Object.keys(filteredVitalsData[0]) as Array<
        keyof (typeof filteredVitalsData)[number]
      >)
        .filter(
          (key): key is MetricKey =>
            key !== "id" &&
            key !== "time" &&
            key !== "department" &&
            key !== "diagnosis",
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

      <Filters
        filters={filters}
        setFilters={setFilters}
        departmentOptions={departmentOptions}
        diagnosisOptions={diagnosisOptions}
      />

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        <LineCard
          title="Patient Vitals Trends"
          subtitle=" Mean Heart Rate & Blood Pressure across cohort"
          metrics={metrics}
          data={filteredVitalsData}
        />

        <PieCard
          title="Department Distribution"
          totalCount={String(filteredVitalsData.length)}
          placeholder="TOTAL PATIENTS"
          totalPatients={filteredVitalsData.length}
          data={departmentData}
        />

        <MedicalAdherence data={diagnosisData} reportRows={filteredVitalsData} />
      </div>
    </div>
  );
};

export default Analytics;

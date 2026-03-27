export interface FiltersState {
  date_range: string;
  department: string;
  group: string;
}

export interface LineData {
  id: string;
  time: string;
  heartRate: number;
  bpSys: number;
  bpDia: number;
  spo2: number;
  department: string;
  diagnosis: string;
}

export type MetricKey = keyof Omit<
  LineData,
  "id" | "time" | "department" | "diagnosis"
>;

export interface Metric {
  key: MetricKey;
  label: string;
  unit: string;
  color: string;
  normalMin: number;
  normalMax: number;
}

export interface DiagnosisData {
  name: string;
  count: number;
  percentage: number;
  color: string;
}

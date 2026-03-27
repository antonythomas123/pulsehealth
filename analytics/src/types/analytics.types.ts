export interface FiltersState {
  date_range: string;
  department: string;
  group: string;
}

export interface LineData {
  time: string;
  heartRate: number;
  bpSys: number;
  bpDia: number;
  spo2: number;
}

export type MetricKey = keyof Omit<LineData, "time">;

export interface Metric {
  key: MetricKey;
  label: string;
  unit: string;
  color: string;
  normalMin: number;
  normalMax: number;
}

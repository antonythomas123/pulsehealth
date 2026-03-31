export type StatusVariant = "URGENT" | "STABLE" | "CRITICAL" | "DISCHARGED";

export interface Column<T> {
  key: keyof T | string;
  header: string;
  align?: "left" | "right" | "center";
  render?: (row: T) => React.ReactNode;
}

export type Patient = {
  id: string;
  img?: string;
  name: string;
  status: StatusVariant;
  age?: number | string;
  gender?: "M" | "F";
  diagnosis?: string;
  lastVisit?: string;
};

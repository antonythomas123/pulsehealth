import React from "react";
import { Card } from "main/components";
import { MdOutlineFileDownload } from "react-icons/md";
import type { DiagnosisData, LineData } from "../types/analytics.types";

type Props = {
  data: DiagnosisData[];
  reportRows: LineData[];
};

const EXCEL_COLUMNS: Array<{ key: keyof LineData; label: string }> = [
  { key: "id", label: "Patient ID" },
  { key: "time", label: "Time" },
  { key: "department", label: "Department" },
  { key: "diagnosis", label: "Diagnosis" },
  { key: "heartRate", label: "Heart Rate (bpm)" },
  { key: "bpSys", label: "BP Systolic (mmHg)" },
  { key: "bpDia", label: "BP Diastolic (mmHg)" },
  { key: "spo2", label: "SpO2 (%)" },
];

const escapeXml = (value: string | number) =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");

const downloadExcelReport = (rows: LineData[]) => {
  if (!rows.length) {
    return;
  }

  const headerRow = EXCEL_COLUMNS.map(
    ({ label }) => `<Cell><Data ss:Type="String">${escapeXml(label)}</Data></Cell>`,
  ).join("");

  const dataRows = rows
    .map(
      (row) =>
        `<Row>${EXCEL_COLUMNS.map(({ key }) => {
          const value = row[key];
          const isNumber = typeof value === "number";

          return `<Cell><Data ss:Type="${isNumber ? "Number" : "String"}">${escapeXml(
            value,
          )}</Data></Cell>`;
        }).join("")}</Row>`,
    )
    .join("");

  const workbook = `<?xml version="1.0"?>
    <Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet"
    xmlns:o="urn:schemas-microsoft-com:office:office"
    xmlns:x="urn:schemas-microsoft-com:office:excel"
    xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet">
    <Worksheet ss:Name="Filtered Vitals">
      <Table>
      <Row>${headerRow}</Row>
      ${dataRows}
      </Table>
    </Worksheet>
    </Workbook>`;

  const blob = new Blob([workbook], {
    type: "application/vnd.ms-excel;charset=utf-8;",
  });
  
  const timestamp = new Date().toISOString().slice(0, 10);
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = `filtered-vitals-report-${timestamp}.xls`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

const MedicalAdherence = ({ data, reportRows }: Props) => {
  return (
    <Card className="md:col-span-12 border border-outline-variant/10">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h3 className="text-xl font-headline font-bold text-on-surface">
            Diagnosis Distribution
          </h3>
          <p className="text-sm text-outline">
            Percentage share of each diagnosis in the current vitals dataset
          </p>
        </div>
        <button
          className="text-primary text-sm font-bold flex items-center gap-1 hover:underline disabled:opacity-50 disabled:no-underline"
          onClick={() => downloadExcelReport(reportRows)}
          type="button"
          disabled={!reportRows.length}
        >
          Download Report
          <MdOutlineFileDownload className="text-sm" />
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {data.map((diagnosis) => (
          <div key={diagnosis.name} className="space-y-4">
            <div className="flex justify-between items-end gap-4">
              <div>
                <span className="text-xs font-label font-bold text-outline tracking-tighter uppercase">
                  {diagnosis.name}
                </span>
                <p className="text-sm text-outline mt-1">
                  {diagnosis.count} patient{diagnosis.count === 1 ? "" : "s"}
                </p>
              </div>
              <span
                className="text-2xl font-headline font-bold"
                style={{ color: diagnosis.color }}
              >
                {diagnosis.percentage}%
              </span>
            </div>
            <div className="h-2 w-full bg-surface-container-high rounded-full overflow-hidden">
              <div
                className="h-full rounded-full"
                style={{
                  width: `${diagnosis.percentage}%`,
                  backgroundColor: diagnosis.color,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default MedicalAdherence;

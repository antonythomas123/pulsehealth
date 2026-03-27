import React from "react";
import { Card } from "main/components";
import { MdOutlineFileDownload } from "react-icons/md";
import type { DiagnosisData } from "../types/analytics.types";

type Props = {
  data: DiagnosisData[];
};

const MedicalAdherence = ({ data }: Props) => {
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
        <button className="text-primary text-sm font-bold flex items-center gap-1 hover:underline">
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

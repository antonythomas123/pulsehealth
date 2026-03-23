import React from "react";
import { Card } from "main/components";
import type { StatusVariant } from "../types/patients.types";

type Props = {
  img?: string;
  status: StatusVariant;
  id: string;
  name?: string;
  age?: number | string;
  gender?: "M" | "F";
  diagnosis?: string;
  lastVisit?: string;
};

const PatientCard = ({
  img,
  status,
  id,
  name,
  age,
  gender,
  diagnosis,
  lastVisit,
}: Props) => {
  return (
    <Card className="bg-surface-container-lowest p-6 rounded-xl border border-transparent shadow-[0px_12px_32px_rgba(25,28,30,0.08)] transform -translate-y-1 transition-all">
      <div className="flex items-start justify-between mb-6">
        <div className="relative">
          {img ? (
            <img
              alt=""
              className="w-16 h-16 rounded-full object-cover"
              src={img}
            />
          ) : (
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xl">
              {name ? name.charAt(0) : ""}
            </div>
          )}
          <span className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></span>
        </div>
        <div className="flex flex-col items-end">
          <span
            className={`${status === "URGENT" ? "bg-tertiary-fixed text-on-tertiary-fixed" : status === "STABLE" ? "bg-secondary-fixed text-on-secondary-fixed" : status === "DISCHARGED" ? "bg-surface-variant text-on-surface-variant" : "bg-on-tertiary-fixed text-white"} text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider`}
          >
            {status}
          </span>
          <span className="text-[10px] text-outline mt-2 font-label uppercase tracking-[0.05em]">
            ID: #{id}
          </span>
        </div>
      </div>
      <h3 className="font-headline text-xl font-bold text-on-surface mb-1">
        {name || ""}
      </h3>
      <div className="flex items-center gap-3 text-on-surface-variant text-sm mb-4">
        <span>{age} Years</span>
        <span className="w-1 h-1 bg-outline-variant rounded-full"></span>
        <span>{gender === "M" ? "Male" : "Female"}</span>
      </div>
      <div className="mb-6 space-y-3">
        <div className="flex justify-between items-center bg-surface-container-low p-3 rounded-lg">
          <span className="text-xs font-label uppercase tracking-wider text-outline">
            Diagnosis
          </span>
          <span className="text-xs font-semibold text-primary">
            {diagnosis || "N/A"}
          </span>
        </div>
        <div className="flex justify-between items-center px-1">
          <span className="text-xs font-label uppercase tracking-wider text-outline">
            Last Visit
          </span>
          <span className="text-xs font-medium text-on-surface">
            {lastVisit || "N/A"}
          </span>
        </div>
      </div>
      <button className="w-full py-2.5 rounded-lg border border-primary text-primary font-semibold text-sm hover:bg-primary/5 active:scale-95 transition-all">
        View Profile
      </button>
    </Card>
  );
};

export default PatientCard;

import React from "react";
import { MdCalendarMonth, MdApartment, MdNotes } from "react-icons/md";
import { Select } from "main/components";
import type { FiltersState } from "../types/analytics.types";

const DATE_RANGE_OPTIONS = [
  { label: "Last 30 Days", value: "30" },
  { label: "Last 90 Days", value: "90" },
  { label: "Current Year", value: "CURRENT_YEAR" },
];

const departments = [
  { label: "All Departments", value: "ALL" },
  { label: "Cardiology", value: "CARDIOLOGY" },
  { label: "Neurology", value: "NEUROLOGY" },
  { label: "Oncology", value: "ONCOLOGY" },
];

const groups = [
  { label: "Chronic Care", value: "CHRONIC_CARE" },
  { label: "Post-Operative", value: "POST_OPERATIVE" },
  { label: "Outpatient", value: "OUTPATIENT" },
];

type Props = {
  filters: FiltersState;
  setFilters: React.Dispatch<React.SetStateAction<FiltersState>>;
};

const Filters = ({ filters, setFilters }: Props) => {
  return (
    <section className="bg-surface-container-low p-4 rounded-xl mb-8 flex flex-wrap items-center gap-4">
      <div className="flex flex-col gap-1 min-w-[180px]">
        <Select
          label="DATE RANGE"
          value={filters?.date_range || ""}
          onChange={(value: string) =>
            setFilters((prev: FiltersState) => ({
              ...prev,
              date_range: value,
            }))
          }
          options={DATE_RANGE_OPTIONS}
          icon={<MdCalendarMonth />}
        />
      </div>

      <div className="flex flex-col gap-1 min-w-[180px]">
        <Select
          label="DEPARTMENT"
          value={filters?.department}
          onChange={(value: string) =>
            setFilters((prev: FiltersState) => ({
              ...prev,
              department: value,
            }))
          }
          options={departments}
          icon={<MdApartment />}
        />
      </div>
      <div className="flex flex-col gap-1 min-w-[180px]">
        <Select
          label="PATIENT GROUP"
          value={filters?.group}
          onChange={(value: string) =>
            setFilters((prev: FiltersState) => ({
              ...prev,
              group: value,
            }))
          }
          placeholder="PATIENT GROUP"
          options={groups}
          icon={<MdNotes />}
        />
      </div>
      <button className="mt-5 ml-auto px-6 py-2.5 bg-secondary text-white rounded-lg font-bold text-sm shadow-sm hover:opacity-90 transition-opacity">
        Apply Filters
      </button>
    </section>
  );
};

export default Filters;

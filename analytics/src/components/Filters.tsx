import React from "react";
import { MdCalendarMonth, MdApartment, MdNotes } from "react-icons/md";
import { Select } from "main/components";
import type { FiltersState } from "../types/analytics.types";

const TIME_RANGE_OPTIONS = [
  { label: "Full Day", value: "ALL" },
  { label: "Last 12 Hours", value: "12" },
  { label: "Last 6 Hours", value: "6" },
];

type FilterOption = {
  label: string;
  value: string;
};

type Props = {
  filters: FiltersState;
  setFilters: React.Dispatch<React.SetStateAction<FiltersState>>;
  departmentOptions: FilterOption[];
  diagnosisOptions: FilterOption[];
};

const Filters = ({
  filters,
  setFilters,
  departmentOptions,
  diagnosisOptions,
}: Props) => {
  return (
    <section className="bg-surface-container-low p-4 rounded-xl mb-8 flex flex-wrap items-center gap-4">
      <div className="flex flex-col gap-1 min-w-[180px]">
        <Select
          label="TIME RANGE"
          value={filters.timeRange}
          onChange={(value: string) =>
            setFilters((prev) => ({
              ...prev,
              timeRange: value,
            }))
          }
          options={TIME_RANGE_OPTIONS}
          icon={<MdCalendarMonth />}
        />
      </div>

      <div className="flex flex-col gap-1 min-w-[180px]">
        <Select
          label="DEPARTMENT"
          value={filters.department}
          onChange={(value: string) =>
            setFilters((prev) => ({
              ...prev,
              department: value,
            }))
          }
          options={departmentOptions}
          icon={<MdApartment />}
        />
      </div>
      <div className="flex flex-col gap-1 min-w-[180px]">
        <Select
          label="DIAGNOSIS"
          value={filters.diagnosis}
          onChange={(value: string) =>
            setFilters((prev) => ({
              ...prev,
              diagnosis: value,
            }))
          }
          placeholder="DIAGNOSIS"
          options={diagnosisOptions}
          icon={<MdNotes />}
        />
      </div>
      <button
        className="mt-5 ml-auto px-6 py-2.5 bg-secondary text-white rounded-lg font-bold text-sm shadow-sm hover:opacity-90 transition-opacity"
        onClick={() =>
          setFilters({
            timeRange: "ALL",
            department: "ALL",
            diagnosis: "ALL",
          })
        }
        type="button"
      >
        Clear Filters
      </button>
    </section>
  );
};

export default Filters;

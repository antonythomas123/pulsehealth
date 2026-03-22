import React from "react";
import { MdOutlineArrowForward, MdMoreVert } from "react-icons/md";
import { Record } from "../types/records.types";

type Props = {
  records: Record[];
};

const RecentActivity = ({ records }: Props) => {
  
  return (
    <div className="lg:col-span-2 space-y-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-headline text-md font-bold text-on-surface">
          Recent Patient Activity
        </h2>
        <button className="text-primary font-bold text-sm flex items-center gap-1 hover:underline">
          View All Records <MdOutlineArrowForward className="text-sm" />
        </button>
      </div>
      <div className="space-y-4">
        {records.slice(0, 3).map((record) => (
          <div
            key={record?.id}
            className="group flex items-center justify-between p-5 bg-surface-container-lowest rounded-xl hover:bg-surface-container transition-colors duration-200 cursor-pointer"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full overflow-hidden bg-surface-container-high border-2 border-white">
                <img
                  alt="Patient Avatar"
                  className="w-full h-full object-cover"
                  src={record?.img}
                />
              </div>
              <div>
                <h4 className="font-headline font-bold text-on-surface">
                  {record?.name || ""}
                </h4>
                <p className="text-sm text-outline">
                  {record?.type || ""} • {record?.time || ""}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className={`px-3 py-1 text-xs font-bold rounded-full ${record.status === "COMPLETED" ? "bg-secondary-fixed text-on-secondary-fixed-variant" : record.status === "SCHEDULED" ? "bg-tertiary-fixed text-on-tertiary-fixed-variant" : "bg-surface-container-high text-on-surface-variant"}`}>
                {record?.status === "COMPLETED" ? "Completed" : record?.status === "SCHEDULED" ? "Scheduled" : "In Progress"}
              </span>
              <MdMoreVert className="text-outline group-hover:text-primary transition-colors" />
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default RecentActivity;

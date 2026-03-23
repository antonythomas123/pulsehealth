import React from "react";
import { MdOutlinePerson, MdOutlineTrendingUp } from "react-icons/md";
import { Card } from "main/components";

type Props = {
  icon?: React.ReactNode;
  iconType: "primary" | "secondary" | "error";
  title: string;
  count?: string;
  subtitle?: string;
  trendingCount?: number;
  label?: string;
  className?: string;
};

const StatusCard = ({
  icon,
  iconType,
  title,
  count,
  subtitle,
  trendingCount,
  label,
  className
}: Props) => {
  return (
    <Card className={`md:col-span-4 p-6 ${className}`}>
      <div className="flex justify-between items-start mb-4">
        {icon && (
          <span className={`p-2 rounded-lg ${iconType === "primary" ? "bg-primary-fixed text-primary" : iconType === "secondary" ? "bg-secondary-fixed text-on-secondary-container" : "bg-white text-error"}`}>
            {icon}
          </span>
        )}
        {trendingCount && (
          <div className="flex items-center text-secondary font-bold text-sm">
            <MdOutlineTrendingUp className="text-sm" />
            {trendingCount}%
          </div>
        )}
        {label && (
          <span
            className={`px-2 py-1 text-[10px] font-bold rounded-full uppercase tracking-tighter ${label.toLowerCase() === "urgent" ? "bg-error text-white" : ""}`}
          >
            {label}
          </span>
        )}
      </div>
      <h3 className="font-label text-outline text-xs uppercase tracking-widest font-bold mb-1">
        {title || ""}
      </h3>
      <p className="font-headline text-4xl font-bold text-on-surface">
        {count}
      </p>
      <p className="text-sm text-outline mt-2">{subtitle}</p>
    </Card>
  );
};

export default StatusCard;

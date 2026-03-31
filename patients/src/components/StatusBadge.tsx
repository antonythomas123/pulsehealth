import type { StatusVariant } from "../types/patients.types";

interface StatusConfig {
  label: string;
  containerClass: string;
  dotClass: string;
}

interface StatusBadgeProps {
  status: StatusVariant;
  label?: string;
  config?: Partial<StatusConfig>;
}

const STATUS_MAP: Record<string, StatusConfig> = {
  urgent: {
    label: "Urgent",
    containerClass: "bg-error-container text-on-error-container",
    dotClass: "bg-error",
  },
  stable: {
    label: "Stable",
    containerClass: "bg-secondary-fixed text-on-secondary-fixed-variant",
    dotClass: "bg-secondary",
  },
  discharged: {
    label: "Discharged",
    containerClass: "bg-surface-variant text-outline",
    dotClass: "bg-outline",
  },
};

const StatusBadge = ({ status, label, config }: StatusBadgeProps) => {
  const base = STATUS_MAP[status.toLowerCase()] ?? {
    label: status,
    containerClass: "bg-surface-variant text-outline",
    dotClass: "bg-outline",
  };

  const resolved: StatusConfig = {
    label: label ?? config?.label ?? base.label,
    containerClass: config?.containerClass ?? base.containerClass,
    dotClass: config?.dotClass ?? base.dotClass,
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${resolved.containerClass}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full mr-2 ${resolved.dotClass}`} />
      {resolved.label}
    </span>
  );
};

export default StatusBadge;

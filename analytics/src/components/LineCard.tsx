import React, { useState } from "react";
import { Card } from "main/components";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import type { Metric, MetricKey, LineData } from "../types/analytics.types";

type Props = {
  title?: string;
  subtitle?: string;
  metrics?: Metric[];
  data?: LineData[];
};

type ActiveMetrics = Record<MetricKey, boolean>;

interface TooltipPayloadEntry {
  dataKey: string;
  value: number;
  color: string;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: TooltipPayloadEntry[];
  label?: string;
  metrics?: Metric[];
}

const CustomTooltip = ({
  active,
  payload,
  label,
  metrics = [],
}: CustomTooltipProps) => {
  if (!active || !payload?.length) return null;

  return (
    <div className="bg-white border border-[#e2e8f0] rounded-xl py-2.5 px-4 shadow-[0 4px 16px rgba(0,0,0,0.10)] min-w-[160]">
      <p className="font-semibold text-sm text-[#1a3a6e]">{label}</p>
      {payload.map((entry) => {
        const metric = metrics.find((m) => m.key === entry.dataKey);
        return (
          <div
            key={entry.dataKey as string}
            className="flex justify-between gap-6 text-sm text-[#374151] mb-1.5"
          >
            <span className="flex items-center gap-2">
              <span
                className="w-2 h-2 rounded-[50%] inline-block"
                style={{
                  background: entry.color,
                }}
              />
              {metric?.label}
            </span>
            <span style={{ fontWeight: 600, color: entry.color }}>
              {entry.value} {metric?.unit}
            </span>
          </div>
        );
      })}
    </div>
  );
};

const LineCard = ({ title, subtitle, metrics = [], data = [] }: Props) => {
  const [activeMetrics, setActiveMetrics] = useState<ActiveMetrics>(
    metrics.reduce(
      (acc, m) => ({ ...acc, [m.key]: true }),
      {} as ActiveMetrics,
    ),
  );

  const toggleMetric = (key: MetricKey): void => {
    setActiveMetrics((prev) => {
      const next: ActiveMetrics = { ...prev, [key]: !prev[key] };
      if (Object.values(next).every((v) => !v)) return prev;
      return next;
    });
  };

  return (
    <Card className="md:col-span-8 p-8 border border-outline-variant/10">
      <div className="flex justify-between items-start mb-8">
        <div>
          <h3 className="text-xl font-headline font-bold text-on-surface">
            {title || ""}
          </h3>
          <p className="text-sm text-outline">{subtitle || ""}</p>
        </div>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 10,
            marginBottom: 18,
          }}
        >
          {metrics?.map((m) => (
            <button
              key={m.key}
              onClick={() => toggleMetric(m.key)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 7,
                padding: "5px 14px",
                borderRadius: 20,
                border: `1.5px solid ${activeMetrics[m.key] ? m.color : "#d1d5db"}`,
                background: activeMetrics[m.key] ? m.color + "15" : "#f9fafb",
                color: activeMetrics[m.key] ? m.color : "#9ca3af",
                fontSize: 12,
                fontWeight: 600,
                cursor: "pointer",
                transition: "all 0.15s",
                letterSpacing: 0.2,
              }}
            >
              <span
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: activeMetrics[m.key] ? m.color : "#d1d5db",
                }}
              />
              {m.label}
            </button>
          ))}
        </div>
      </div>

      <ResponsiveContainer width="100%" height={320}>
        <LineChart
          data={data}
          margin={{ top: 4, right: 16, left: 0, bottom: 4 }}
        >
          <CartesianGrid
            stroke="#f1f5f9"
            strokeDasharray="4 4"
            vertical={false}
          />
          <XAxis
            dataKey="time"
            tick={{ fontSize: 11, fill: "#9ca3af" }}
            axisLine={false}
            tickLine={false}
            dy={6}
          />
          <YAxis
            tick={{ fontSize: 11, fill: "#9ca3af" }}
            axisLine={false}
            tickLine={false}
            width={36}
          />
          <Tooltip content={<CustomTooltip metrics={metrics} />} />
          <ReferenceLine
            y={100}
            stroke="#fca5a5"
            strokeDasharray="3 3"
            strokeWidth={1}
          />
          {metrics?.map((m) =>
            activeMetrics[m.key] ? (
              <Line
                key={m.key}
                type="monotone"
                dataKey={m.key}
                stroke={m.color}
                strokeWidth={2.5}
                dot={false}
                activeDot={{ r: 5, strokeWidth: 0, fill: m.color }}
              />
            ) : null,
          )}
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default LineCard;

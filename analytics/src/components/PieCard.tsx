import React from "react";
import { Card } from "main/components";
import { ResponsiveContainer, PieChart, Pie, Cell, Label } from "recharts";

interface DepartmentEntry {
  name: string;
  value: number;
  color: string;
}

type Props = {
  title?: string;
  totalCount?: string;
  placeholder?: string;
  data: DepartmentEntry[];
  totalPatients?: number;
};

const PieCard = ({
  title,
  totalCount,
  placeholder,
  data = [],
  totalPatients = 0,
}: Props) => {
  const total = data.reduce((sum, d) => sum + d.value, 0);

  return (
    <Card className="md:col-span-4 border border-outline-variant/10 flex flex-col items-center">
      <h3 className="text-xl font-headline font-bold text-on-surface w-full mb-6 text-start">
        {title || ""}
      </h3>
      <div className="relative w-48 h-48 flex items-center justify-center">
        <ResponsiveContainer width={200} height={200}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={62}
              outerRadius={88}
              dataKey="value"
              startAngle={90}
              endAngle={-270}
              strokeWidth={0}
            >
              {data.map((entry, index) => (
                <Cell key={index} fill={entry.color} />
              ))}
              <Label
                content={({ viewBox }) => {
                  const { cx, cy } = viewBox as { cx: number; cy: number };
                  return (
                    <g>
                      <text
                        x={cx}
                        y={cy - 8}
                        textAnchor="middle"
                        dominantBaseline="middle"
                        style={{
                          fontSize: 22,
                          fontWeight: 700,
                          fill: "#1a3a6e",
                        }}
                      >
                        {totalCount || ""}
                      </text>
                      <text
                        x={cx}
                        y={cy + 14}
                        textAnchor="middle"
                        dominantBaseline="middle"
                        style={{
                          fontSize: 10,
                          fontWeight: 500,
                          fill: "#9ca3af",
                          letterSpacing: 0.8,
                        }}
                      >
                        {placeholder || ""}
                      </text>
                    </g>
                  );
                }}
              />
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-8 w-full space-y-3">
        {data.map((dept) => {
          const pct = Math.round((dept.value / total) * 100);
          const patientCount = Math.round((pct / 100) * totalPatients);
          return (
            <div
              key={dept.name}
              className="flex items-center justify-between"
            >
              <span style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: "50%",
                    background: dept.color,
                    flexShrink: 0,
                  }}
                />
                <span
                  style={{ fontSize: 13, color: "#374151", fontWeight: 500 }}
                >
                  {dept.name}
                </span>
              </span>
              <span style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <span
                  style={{
                    fontSize: 13,
                    fontWeight: 700,
                    color: dept.color,
                    minWidth: 36,
                    textAlign: "right",
                  }}
                >
                  {pct}%
                </span>
              </span>
            </div>
          );
        })}
      </div>
    </Card>
  );
};

export default PieCard;

"use client";

import { useLocale } from "@/presentation/hooks/use-locale";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface ChartDataPoint {
  year: number;
  rate: number | null;
  submitted: number | null;
  accepted: number | null;
}

interface AcceptanceRateChartProps {
  data: ChartDataPoint[];
}

export function AcceptanceRateChart({ data }: AcceptanceRateChartProps) {
  const { isKorean } = useLocale();
  const chartData = [...data]
    .filter((d) => d.rate != null)
    .sort((a, b) => a.year - b.year);

  if (chartData.length < 2) return null;

  return (
    <div className="w-full h-[250px]">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={chartData} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#d9d5ca" />
          <XAxis
            dataKey="year"
            tick={{ fontSize: 12, fill: "#69675f" }}
            tickLine={false}
          />
          <YAxis
            domain={[0, "auto"]}
            tick={{ fontSize: 12, fill: "#69675f" }}
            tickLine={false}
            tickFormatter={(v) => `${v}%`}
          />
          <Tooltip
            contentStyle={{
              borderRadius: 12,
              border: "1px solid #d9d5ca",
              fontSize: 13,
            }}
            formatter={(value) => [`${value}%`, isKorean ? "채택률" : "Acceptance Rate"]}
            labelFormatter={(label) => isKorean ? `${label}년` : String(label)}
          />
          <Area
            type="monotone"
            dataKey="rate"
            stroke="#913e30"
            fill="#913e30"
            fillOpacity={0.1}
            strokeWidth={2}
            dot={{ r: 4, fill: "#913e30" }}
            activeDot={{ r: 6 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

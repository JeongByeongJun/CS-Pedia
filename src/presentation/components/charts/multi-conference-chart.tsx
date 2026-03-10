"use client";

import { useState, useMemo } from "react";
import { useLocale } from "@/presentation/hooks/use-locale";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

interface ConferenceRateData {
  slug: string;
  acronym: string;
  field: string;
  rates: { year: number; rate: number }[];
}

interface MultiConferenceChartProps {
  conferences: ConferenceRateData[];
  fields: string[];
}

const COLORS = [
  "#6366f1", "#ec4899", "#f59e0b", "#10b981", "#ef4444",
  "#8b5cf6", "#06b6d4", "#f97316", "#84cc16", "#e879f9",
  "#14b8a6", "#fb923c", "#a78bfa", "#22d3ee", "#fbbf24",
];

export function MultiConferenceChart({
  conferences,
  fields,
}: MultiConferenceChartProps) {
  const { isKorean } = useLocale();
  const [selectedField, setSelectedField] = useState<string>("전체");
  const [selectedSlugs, setSelectedSlugs] = useState<Set<string>>(() => {
    const top = conferences.slice(0, 6).map((c) => c.slug);
    return new Set(top);
  });

  const filtered = useMemo(() => {
    if (selectedField === "전체") return conferences;
    return conferences.filter((c) => c.field === selectedField);
  }, [conferences, selectedField]);

  const active = filtered.filter((c) => selectedSlugs.has(c.slug));

  // Build unified year axis
  const allYears = useMemo(() => {
    const years = new Set<number>();
    active.forEach((c) => c.rates.forEach((r) => years.add(r.year)));
    return [...years].sort();
  }, [active]);

  const chartData = useMemo(() => {
    return allYears.map((year) => {
      const point: Record<string, number | string> = { year };
      active.forEach((c) => {
        const r = c.rates.find((r) => r.year === year);
        if (r) point[c.slug] = r.rate;
      });
      return point;
    });
  }, [allYears, active]);

  const toggleSlug = (slug: string) => {
    setSelectedSlugs((prev) => {
      const next = new Set(prev);
      if (next.has(slug)) next.delete(slug);
      else next.add(slug);
      return next;
    });
  };

  return (
    <div>
      {/* Field filter */}
      <div className="flex flex-wrap gap-2 mb-4">
        {["전체", ...fields].map((f) => (
          <button
            key={f}
            onClick={() => setSelectedField(f)}
            className={`px-3 py-1.5 text-xs rounded-lg transition-colors ${
              selectedField === f
                ? "bg-indigo-600 text-white"
                : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200"
            }`}
          >
            {f === "전체" ? (isKorean ? "전체" : "All") : f}
          </button>
        ))}
      </div>

      {/* Conference toggle */}
      <div className="flex flex-wrap gap-1.5 mb-6">
        {filtered.map((c) => (
          <button
            key={c.slug}
            onClick={() => toggleSlug(c.slug)}
            className={`px-2.5 py-1 text-xs rounded-md transition-colors border ${
              selectedSlugs.has(c.slug)
                ? "bg-indigo-50 border-indigo-300 text-indigo-700"
                : "bg-white border-zinc-200 text-zinc-400 hover:border-zinc-300"
            }`}
          >
            {c.acronym}
          </button>
        ))}
      </div>

      {/* Chart */}
      {active.length > 0 && chartData.length >= 2 ? (
        <div className="w-full h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e4e4e7" />
              <XAxis
                dataKey="year"
                tick={{ fontSize: 12, fill: "#71717a" }}
                tickLine={false}
              />
              <YAxis
                domain={[0, "auto"]}
                tick={{ fontSize: 12, fill: "#71717a" }}
                tickLine={false}
                tickFormatter={(v) => `${v}%`}
              />
              <Tooltip
                contentStyle={{
                  borderRadius: 12,
                  border: "1px solid #e4e4e7",
                  fontSize: 13,
                }}
                formatter={(value, slug) => {
                  const conf = active.find((c) => c.slug === slug);
                  return [`${value}%`, conf?.acronym ?? slug];
                }}
                labelFormatter={(label) => isKorean ? `${label}년` : String(label)}
              />
              <Legend
                formatter={(slug) => {
                  const conf = active.find((c) => c.slug === slug);
                  return conf?.acronym ?? slug;
                }}
              />
              {active.map((c, i) => (
                <Line
                  key={c.slug}
                  type="monotone"
                  dataKey={c.slug}
                  stroke={COLORS[i % COLORS.length]}
                  strokeWidth={2}
                  dot={{ r: 3 }}
                  connectNulls
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <div className="text-center py-12 text-zinc-400 text-sm">
          {isKorean ? "학회를 선택하면 차트가 표시됩니다" : "Select conferences to display chart"}
        </div>
      )}
    </div>
  );
}

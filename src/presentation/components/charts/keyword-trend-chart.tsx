"use client";

import { useState, useMemo } from "react";
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

interface KeywordTrendData {
  conferenceSlug: string;
  conferenceAcronym: string;
  conferenceField: string;
  year: number;
  keyword: string;
  count: number;
}

interface TopKeyword {
  keyword: string;
  totalCount: number;
}

interface KeywordTrendChartProps {
  data: KeywordTrendData[];
  topKeywords: TopKeyword[];
  fields: string[];
}

const COLORS = [
  "#6366f1", "#ec4899", "#f59e0b", "#10b981", "#ef4444",
  "#8b5cf6", "#06b6d4", "#f97316", "#84cc16", "#e879f9",
  "#14b8a6", "#fb923c", "#a78bfa", "#22d3ee", "#fbbf24",
];

export function KeywordTrendChart({
  data,
  topKeywords,
  fields,
}: KeywordTrendChartProps) {
  const [selectedField, setSelectedField] = useState<string>("전체");
  const [selectedKeywords, setSelectedKeywords] = useState<Set<string>>(() => {
    return new Set(topKeywords.slice(0, 6).map((k) => k.keyword));
  });

  // Filter data by field
  const filteredData = useMemo(() => {
    if (selectedField === "전체") return data;
    return data.filter((d) => d.conferenceField === selectedField);
  }, [data, selectedField]);

  // Aggregate: for each (year, keyword), sum count across selected conferences
  const aggregated = useMemo(() => {
    const map = new Map<string, number>(); // "year|keyword" -> total count
    for (const d of filteredData) {
      if (!selectedKeywords.has(d.keyword)) continue;
      const key = `${d.year}|${d.keyword}`;
      map.set(key, (map.get(key) ?? 0) + d.count);
    }
    return map;
  }, [filteredData, selectedKeywords]);

  // Build chart data
  const allYears = useMemo(() => {
    const years = new Set<number>();
    for (const d of filteredData) {
      if (selectedKeywords.has(d.keyword)) years.add(d.year);
    }
    return [...years].sort();
  }, [filteredData, selectedKeywords]);

  const chartData = useMemo(() => {
    return allYears.map((year) => {
      const point: Record<string, number | string> = { year };
      for (const kw of selectedKeywords) {
        const val = aggregated.get(`${year}|${kw}`);
        if (val) point[kw] = val;
      }
      return point;
    });
  }, [allYears, selectedKeywords, aggregated]);

  const toggleKeyword = (kw: string) => {
    setSelectedKeywords((prev) => {
      const next = new Set(prev);
      if (next.has(kw)) next.delete(kw);
      else next.add(kw);
      return next;
    });
  };

  const activeKeywords = topKeywords.filter((k) =>
    selectedKeywords.has(k.keyword),
  );

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
            {f}
          </button>
        ))}
      </div>

      {/* Keyword toggle */}
      <div className="flex flex-wrap gap-1.5 mb-6">
        {topKeywords.map((k) => (
          <button
            key={k.keyword}
            onClick={() => toggleKeyword(k.keyword)}
            className={`px-2.5 py-1 text-xs rounded-md transition-colors border ${
              selectedKeywords.has(k.keyword)
                ? "bg-indigo-50 border-indigo-300 text-indigo-700"
                : "bg-white border-zinc-200 text-zinc-400 hover:border-zinc-300"
            }`}
          >
            {k.keyword}
            <span className="ml-1 opacity-50">{k.totalCount}</span>
          </button>
        ))}
      </div>

      {/* Chart */}
      {activeKeywords.length > 0 && chartData.length >= 2 ? (
        <div className="w-full h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={chartData}
              margin={{ top: 5, right: 5, left: -20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e4e4e7" />
              <XAxis
                dataKey="year"
                tick={{ fontSize: 12, fill: "#71717a" }}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 12, fill: "#71717a" }}
                tickLine={false}
                label={{
                  value: "논문 수",
                  angle: -90,
                  position: "insideLeft",
                  offset: 30,
                  style: { fontSize: 11, fill: "#a1a1aa" },
                }}
              />
              <Tooltip
                contentStyle={{
                  borderRadius: 12,
                  border: "1px solid #e4e4e7",
                  fontSize: 13,
                }}
                labelFormatter={(label) => `${label}년`}
              />
              <Legend />
              {activeKeywords.map((k, i) => (
                <Line
                  key={k.keyword}
                  type="monotone"
                  dataKey={k.keyword}
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
          키워드를 선택하면 트렌드 차트가 표시됩니다
        </div>
      )}
    </div>
  );
}

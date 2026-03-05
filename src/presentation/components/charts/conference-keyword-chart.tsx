"use client";

import { useState, useMemo } from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import type { KeywordTrend } from "@/domain/entities/keyword-trend";

const COLORS = [
  "#6366f1", "#ec4899", "#f59e0b", "#10b981", "#ef4444",
  "#8b5cf6", "#06b6d4", "#f97316", "#84cc16", "#e879f9",
  "#14b8a6", "#fb923c",
];

interface ConferenceKeywordChartProps {
  data: KeywordTrend[];
}

export function ConferenceKeywordChart({ data }: ConferenceKeywordChartProps) {
  const topKeywords = useMemo(() => {
    const map = new Map<string, number>();
    for (const d of data) {
      map.set(d.keyword, (map.get(d.keyword) ?? 0) + d.count);
    }
    return [...map.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, 15)
      .map(([keyword, totalCount]) => ({ keyword, totalCount }));
  }, [data]);

  const years = useMemo(() => {
    return [...new Set(data.map((d) => d.year))].sort();
  }, [data]);

  const [selectedKeywords, setSelectedKeywords] = useState<Set<string>>(
    () => new Set(topKeywords.slice(0, 6).map((k) => k.keyword)),
  );

  const toggleKeyword = (kw: string) => {
    setSelectedKeywords((prev) => {
      const next = new Set(prev);
      if (next.has(kw)) next.delete(kw);
      else next.add(kw);
      return next;
    });
  };

  if (topKeywords.length === 0) {
    return (
      <div className="text-center py-10 text-zinc-400 text-sm">
        키워드 데이터가 없습니다
      </div>
    );
  }

  // 1년치: BarChart로 top 15 표시
  if (years.length === 1) {
    return (
      <div>
        <p className="text-xs text-zinc-400 mb-4">{years[0]}년 채택 논문 키워드 빈도</p>
        <div style={{ width: "100%", height: 400 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={topKeywords}
              layout="vertical"
              margin={{ top: 5, right: 20, left: 5, bottom: 5 }}
            >
              <XAxis
                type="number"
                tick={{ fontSize: 12, fill: "#71717a" }}
                tickLine={false}
              />
              <YAxis
                type="category"
                dataKey="keyword"
                tick={{ fontSize: 12, fill: "#3f3f46" }}
                tickLine={false}
                width={140}
              />
              <Tooltip
                contentStyle={{ borderRadius: 12, border: "1px solid #e4e4e7", fontSize: 13 }}
                formatter={(value) => [`${Number(value).toLocaleString()}건`, "논문 수"]}
              />
              <Bar dataKey="totalCount" radius={[0, 6, 6, 0]} barSize={18}>
                {topKeywords.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
  }

  // 2년 이상: LineChart with keyword toggle
  const activeKeywords = topKeywords.filter((k) => selectedKeywords.has(k.keyword));
  const chartData = years.map((year) => {
    const point: Record<string, number | string> = { year };
    for (const kw of selectedKeywords) {
      const entry = data.find((d) => d.year === year && d.keyword === kw);
      if (entry) point[kw] = entry.count;
    }
    return point;
  });

  return (
    <div>
      <div className="flex flex-wrap gap-1.5 mb-5">
        {topKeywords.map((k, i) => (
          <button
            key={k.keyword}
            onClick={() => toggleKeyword(k.keyword)}
            className={`px-2.5 py-1 text-xs rounded-md transition-colors border ${
              selectedKeywords.has(k.keyword)
                ? "border-indigo-300 text-indigo-700"
                : "bg-white border-zinc-200 text-zinc-400 hover:border-zinc-300"
            }`}
            style={
              selectedKeywords.has(k.keyword)
                ? { backgroundColor: COLORS[i % COLORS.length] + "18", borderColor: COLORS[i % COLORS.length] + "80", color: COLORS[i % COLORS.length] }
                : undefined
            }
          >
            {k.keyword}
            <span className="ml-1 opacity-50">{k.totalCount}</span>
          </button>
        ))}
      </div>

      {activeKeywords.length > 0 ? (
        <div style={{ width: "100%", height: 300 }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e4e4e7" />
              <XAxis dataKey="year" tick={{ fontSize: 12, fill: "#71717a" }} tickLine={false} />
              <YAxis
                tick={{ fontSize: 12, fill: "#71717a" }}
                tickLine={false}
                label={{ value: "논문 수", angle: -90, position: "insideLeft", offset: 30, style: { fontSize: 11, fill: "#a1a1aa" } }}
              />
              <Tooltip
                contentStyle={{ borderRadius: 12, border: "1px solid #e4e4e7", fontSize: 13 }}
                labelFormatter={(label) => `${label}년`}
              />
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
        <div className="text-center py-10 text-zinc-400 text-sm">
          키워드를 선택하면 트렌드 차트가 표시됩니다
        </div>
      )}
    </div>
  );
}

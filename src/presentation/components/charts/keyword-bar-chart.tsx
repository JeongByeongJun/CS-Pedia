"use client";

import { useLocale } from "@/presentation/hooks/use-locale";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

interface TopKeyword {
  keyword: string;
  totalCount: number;
}

interface KeywordBarChartProps {
  topKeywords: TopKeyword[];
}

const BAR_COLORS = [
  "#6366f1", "#818cf8", "#a5b4fc", "#c7d2fe",
  "#8b5cf6", "#a78bfa", "#c4b5fd",
  "#ec4899", "#f472b6", "#f9a8d4",
  "#10b981", "#34d399", "#6ee7b7",
  "#f59e0b", "#fbbf24", "#fcd34d",
  "#06b6d4", "#22d3ee", "#67e8f9",
  "#ef4444",
];

export function KeywordBarChart({ topKeywords }: KeywordBarChartProps) {
  const { isKorean } = useLocale();
  const data = topKeywords.slice(0, 15);

  if (data.length === 0) {
    return (
      <div className="text-center py-12 text-zinc-400 text-sm">
        {isKorean ? "키워드 데이터가 없습니다" : "No keyword data available"}
      </div>
    );
  }

  return (
    <div className="w-full h-[420px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
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
            width={130}
          />
          <Tooltip
            contentStyle={{
              borderRadius: 12,
              border: "1px solid #e4e4e7",
              fontSize: 13,
            }}
            formatter={(value) => [`${Number(value).toLocaleString()}`, isKorean ? "총 등장 수" : "Total occurrences"]}
          />
          <Bar dataKey="totalCount" radius={[0, 6, 6, 0]} barSize={20}>
            {data.map((_, i) => (
              <Cell key={i} fill={BAR_COLORS[i % BAR_COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

const FIELD_COLORS: Record<string, string> = {
  "AI/ML": "bg-violet-100 text-violet-700 border-violet-200",
  NLP: "bg-blue-100 text-blue-700 border-blue-200",
  CV: "bg-emerald-100 text-emerald-700 border-emerald-200",
  Systems: "bg-amber-100 text-amber-700 border-amber-200",
  Security: "bg-red-100 text-red-700 border-red-200",
  SE: "bg-cyan-100 text-cyan-700 border-cyan-200",
  DB: "bg-orange-100 text-orange-700 border-orange-200",
  HCI: "bg-pink-100 text-pink-700 border-pink-200",
  Theory: "bg-slate-100 text-slate-700 border-slate-200",
  Networks: "bg-teal-100 text-teal-700 border-teal-200",
  Architecture: "bg-indigo-100 text-indigo-700 border-indigo-200",
  Graphics: "bg-fuchsia-100 text-fuchsia-700 border-fuchsia-200",
  Robotics: "bg-lime-100 text-lime-700 border-lime-200",
};

export function FieldBadge({ field }: { field: string }) {
  const colors =
    FIELD_COLORS[field] ?? "bg-zinc-100 text-zinc-600 border-zinc-200";

  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium border ${colors}`}
    >
      {field}
    </span>
  );
}

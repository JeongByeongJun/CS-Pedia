import { ExternalLink } from "lucide-react";

export interface ProfessorWithPublicationCount {
  id: string;
  nameKo: string;
  nameEn: string | null;
  university: string;
  department: string | null;
  rank: string;
  dblpPid: string | null;
  homepageUrl: string | null;
  dblpStatus: "confirmed" | "ambiguous" | "not_found";
  publicationCount: number;
}

interface ProfessorCardProps {
  professor: ProfessorWithPublicationCount;
}

const RANK_LABEL: Record<string, string> = {
  professor: "교수",
  associate_professor: "부교수",
  assistant_professor: "조교수",
  emeritus: "명예교수",
  lecturer: "강사",
};

export function ProfessorCard({ professor }: ProfessorCardProps) {
  const rankLabel = RANK_LABEL[professor.rank] ?? professor.rank;
  const hasPublications = professor.publicationCount > 0;

  return (
    <div className="bg-white rounded-2xl border border-zinc-200/80 transition-all hover:shadow-md hover:border-zinc-300/80 p-5 flex flex-col gap-3">
      {/* 상단: 이름 + 링크 */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <div className="font-bold text-lg text-zinc-900 leading-tight truncate">
            {professor.nameKo}
          </div>
          {professor.nameEn && (
            <div className="text-sm text-zinc-400 mt-0.5 truncate">
              {professor.nameEn}
            </div>
          )}
        </div>
        {professor.homepageUrl && (
          <a
            href={professor.homepageUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 p-1.5 rounded-lg text-zinc-400 hover:text-indigo-500 hover:bg-indigo-50 transition-colors"
            aria-label={`${professor.nameKo} 홈페이지`}
          >
            <ExternalLink size={15} />
          </a>
        )}
      </div>

      {/* 중단: 소속 */}
      <div className="flex flex-col gap-0.5">
        <div className="text-sm font-medium text-zinc-700">
          {professor.university}
        </div>
        <div className="flex items-center gap-2 text-xs text-zinc-400">
          {professor.department && (
            <span className="truncate">{professor.department}</span>
          )}
          {professor.department && (
            <span className="text-zinc-300">·</span>
          )}
          <span>{rankLabel}</span>
        </div>
      </div>

      {/* 하단: 배지 */}
      <div className="flex items-center gap-2 flex-wrap mt-auto pt-1 border-t border-zinc-100">
        {hasPublications ? (
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-indigo-50 text-indigo-600 text-xs font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 inline-block" />
            Tracked Conference 논문 {professor.publicationCount}편
          </span>
        ) : (
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-zinc-50 text-zinc-400 text-xs font-medium">
            논문 데이터 없음
          </span>
        )}
        {professor.dblpStatus === "ambiguous" && (
          <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium bg-amber-50 text-amber-500 border border-amber-100">
            DBLP 미확인
          </span>
        )}
        {professor.dblpPid && professor.dblpStatus === "confirmed" && (
          <a
            href={`https://dblp.org/pid/${professor.dblpPid}.html`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[10px] font-medium text-zinc-400 hover:text-indigo-500 hover:bg-indigo-50 transition-colors border border-zinc-200"
          >
            DBLP
            <ExternalLink size={9} />
          </a>
        )}
      </div>
    </div>
  );
}

"use client";

// 영문 대학명 → 한국어 표시명 매핑
// KAIST, POSTECH, UNIST, GIST, DGIST는 영문 유지
const UNIV_KO: Record<string, string> = {
  "Ajou University": "아주대학교",
  "Chonnam National University": "전남대학교",
  "Chung-Ang University": "중앙대학교",
  "Chungbuk National University": "충북대학교",
  "Chungnam National University": "충남대학교",
  "Dongguk University": "동국대학교",
  "Ewha Womans University": "이화여자대학교",
  "Gyeongsang National University": "경상국립대학교",
  "Hanyang University": "한양대학교",
  "Inha University": "인하대학교",
  "Jeju National University": "제주대학교",
  "Jeonbuk National University": "전북대학교",
  "Kangwon National University": "강원대학교",
  "Konkuk University": "건국대학교",
  "Kookmin University": "국민대학교",
  "Korea University": "고려대학교",
  "Kwangwoon University": "광운대학교",
  "Kyung Hee University": "경희대학교",
  "Kyungpook National University": "경북대학교",
  "Pukyong National University": "부경대학교",
  "Pusan National University": "부산대학교",
  "Sejong University": "세종대학교",
  "Seoul National University": "서울대학교",
  "Seoul National University of Science and Technology": "서울과학기술대학교",
  "Soongsil University": "숭실대학교",
  "Sungkyunkwan University": "성균관대학교",
  "SKKU": "성균관대학교",
  "University of Seoul": "서울시립대학교",
  "Yonsei University": "연세대학교",
  "Incheon National University": "인천대학교",
};

function displayName(uni: string): string {
  return UNIV_KO[uni] ?? uni;
}

interface UniversityFilterProps {
  universities: string[];
  selected: string | null;
  onSelect: (university: string | null) => void;
}

export function UniversityFilter({
  universities,
  selected,
  onSelect,
}: UniversityFilterProps) {
  // 한국어 이름으로 정렬 (영문 약칭은 뒤로)
  const sorted = [...universities].sort((a, b) => {
    const ka = displayName(a);
    const kb = displayName(b);
    // 한글 먼저, 영문 나중
    const aIsKo = /[가-힣]/.test(ka);
    const bIsKo = /[가-힣]/.test(kb);
    if (aIsKo && !bIsKo) return -1;
    if (!aIsKo && bIsKo) return 1;
    return ka.localeCompare(kb, "ko");
  });

  return (
    <div className="flex flex-wrap gap-1.5">
      <button
        onClick={() => onSelect(null)}
        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
          selected === null
            ? "bg-indigo-600 text-white shadow-sm"
            : "bg-zinc-100 text-zinc-500 hover:bg-zinc-200 hover:text-zinc-700"
        }`}
      >
        전체
      </button>
      {sorted.map((uni) => (
        <button
          key={uni}
          onClick={() => onSelect(selected === uni ? null : uni)}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
            selected === uni
              ? "bg-indigo-600 text-white shadow-sm"
              : "bg-zinc-100 text-zinc-500 hover:bg-zinc-200 hover:text-zinc-700"
          }`}
        >
          {displayName(uni)}
        </button>
      ))}
    </div>
  );
}

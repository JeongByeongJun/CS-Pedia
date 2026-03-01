import { useState } from "react";

const FIELDS = ["전체", "AI/ML", "NLP", "CV", "Systems", "Security", "SE", "DB", "HCI", "Theory"];
const INSTITUTIONS = ["BK21", "KIISE", "KAIST", "SNU", "POSTECH"];

const CONFERENCES = [
  { acronym: "NeurIPS", name: "Neural Information Processing Systems", field: "AI/ML", deadline: "2026-05-22", conf_date: "2026-12-06", venue: "Vancouver, Canada", bk21: "✓", kiise: "S", kaist: "S", snu: "✓", postech: "✓", best_paper_2025: "Scaling Laws for Precision in LLM Training", ddays: 82 },
  { acronym: "ICML", name: "International Conference on Machine Learning", field: "AI/ML", deadline: "2026-01-23", conf_date: "2026-07-06", venue: "Seoul, Korea", bk21: "✓", kiise: "S", kaist: "S", snu: "✓", postech: "✓", best_paper_2025: "Flow Matching for Generative Modeling", ddays: -37 },
  { acronym: "ACL", name: "Association for Computational Linguistics", field: "NLP", deadline: "2026-01-05", conf_date: "2026-07-02", venue: "San Diego, USA", bk21: "✓", kiise: "S", kaist: "S", snu: "✓", postech: "✓", best_paper_2025: "Multi-lingual Reasoning Chains", ddays: -55 },
  { acronym: "CVPR", name: "Computer Vision and Pattern Recognition", field: "CV", deadline: "2025-11-07", conf_date: "2026-06-15", venue: "Nashville, USA", bk21: "✓", kiise: "S", kaist: "S", snu: "✓", postech: "✓", best_paper_2025: "Neural Radiance Composition Fields", ddays: -114 },
  { acronym: "SOSP", name: "Symposium on Operating Systems Principles", field: "Systems", deadline: "2026-04-10", conf_date: "2026-10-25", venue: "Seoul, Korea", bk21: "✓", kiise: "S", kaist: "S", snu: "✓", postech: "✓", best_paper_2025: "Memory-Efficient OS Kernels via Verified Rust", ddays: 40 },
  { acronym: "CCS", name: "ACM Conference on Computer and Communications Security", field: "Security", deadline: "2026-04-15", conf_date: "2026-11-15", venue: "Taipei, Taiwan", bk21: "✓", kiise: "S", kaist: "S", snu: "✓", postech: "✓", best_paper_2025: "Breaking Post-Quantum TLS", ddays: 45 },
  { acronym: "SIGMOD", name: "ACM SIGMOD Conference", field: "DB", deadline: "2026-01-15", conf_date: "2026-06-22", venue: "Berlin, Germany", bk21: "✓", kiise: "S", kaist: "S", snu: "✓", postech: "✓", best_paper_2025: "Learned Query Optimization for Cloud DBs", ddays: -45 },
  { acronym: "CHI", name: "ACM CHI Conference on Human Factors", field: "HCI", deadline: "2025-09-12", conf_date: "2026-04-26", venue: "Yokohama, Japan", bk21: "✓", kiise: "S", kaist: "S", snu: "✓", postech: "✓", best_paper_2025: "Accessible AI Interfaces for Blind Users", ddays: -170 },
  { acronym: "EMNLP", name: "Empirical Methods in NLP", field: "NLP", deadline: "2026-05-15", conf_date: "2026-11-05", venue: "Suzhou, China", bk21: "✓", kiise: "A", kaist: "—", snu: "✓", postech: "✓", best_paper_2025: "Efficient Retrieval-Augmented Generation", ddays: 75 },
  { acronym: "ICLR", name: "International Conference on Learning Representations", field: "AI/ML", deadline: "2025-09-27", conf_date: "2026-04-24", venue: "Singapore", bk21: "✓", kiise: "S", kaist: "S", snu: "✓", postech: "✓", best_paper_2025: "Grokking and Double Descent Unified", ddays: -155 },
  { acronym: "OSDI", name: "USENIX Symposium on OS Design and Implementation", field: "Systems", deadline: "2026-05-08", conf_date: "2026-11-02", venue: "Santa Clara, USA", bk21: "✓", kiise: "S", kaist: "S", snu: "✓", postech: "✓", best_paper_2025: "Serverless at Exascale", ddays: 68 },
  { acronym: "FOCS", name: "Foundations of Computer Science", field: "Theory", deadline: "2026-04-03", conf_date: "2026-12-14", venue: "Sydney, Australia", bk21: "✓", kiise: "S", kaist: "S", snu: "✓", postech: "—", best_paper_2025: "Optimal Algorithms for Online Learning", ddays: 33 },
];

function Badge({ text, variant = "default" }) {
  const styles = {
    S: "bg-amber-100 text-amber-800 border border-amber-300",
    A: "bg-sky-100 text-sky-800 border border-sky-300",
    "✓": "bg-emerald-100 text-emerald-800 border border-emerald-300",
    "—": "bg-zinc-100 text-zinc-400 border border-zinc-200",
    deadline: "bg-rose-100 text-rose-700 border border-rose-200",
    soon: "bg-orange-100 text-orange-700 border border-orange-200",
    passed: "bg-zinc-100 text-zinc-400 border border-zinc-200",
    field: "bg-violet-100 text-violet-700 border border-violet-200",
  };
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium ${styles[variant] || styles[text] || "bg-zinc-100 text-zinc-600 border border-zinc-200"}`}>
      {text}
    </span>
  );
}

function DeadlineBadge({ ddays }) {
  if (ddays < 0) return <Badge text="마감" variant="passed" />;
  if (ddays <= 14) return <Badge text={`D-${ddays}`} variant="deadline" />;
  if (ddays <= 30) return <Badge text={`D-${ddays}`} variant="soon" />;
  return <span className="text-sm text-zinc-600 font-mono">D-{ddays}</span>;
}

export default function ConfKorea() {
  const [selectedField, setSelectedField] = useState("전체");
  const [selectedSchool, setSelectedSchool] = useState("전체");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("deadline");
  const [bookmarks, setBookmarks] = useState(new Set());
  const [showBestPaper, setShowBestPaper] = useState(null);

  const toggleBookmark = (acronym) => {
    setBookmarks(prev => {
      const next = new Set(prev);
      next.has(acronym) ? next.delete(acronym) : next.add(acronym);
      return next;
    });
  };

  const filtered = CONFERENCES.filter(c => {
    if (selectedField !== "전체" && c.field !== selectedField) return false;
    if (selectedSchool !== "전체") {
      const key = selectedSchool.toLowerCase();
      const val = c[key === "snu" ? "snu" : key === "kaist" ? "kaist" : key === "postech" ? "postech" : key === "bk21" ? "bk21" : "kiise"];
      if (val === "—") return false;
    }
    if (searchQuery && !c.acronym.toLowerCase().includes(searchQuery.toLowerCase()) && !c.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const sorted = [...filtered].sort((a, b) => {
    if (activeTab === "deadline") {
      if (a.ddays < 0 && b.ddays >= 0) return 1;
      if (a.ddays >= 0 && b.ddays < 0) return -1;
      if (a.ddays < 0 && b.ddays < 0) return b.ddays - a.ddays;
      return a.ddays - b.ddays;
    }
    return a.acronym.localeCompare(b.acronym);
  });

  const upcomingCount = filtered.filter(c => c.ddays >= 0).length;

  return (
    <div className="min-h-screen" style={{ background: "linear-gradient(135deg, #fafafa 0%, #f0f4ff 50%, #faf0ff 100%)", fontFamily: "'Pretendard Variable', 'Pretendard', -apple-system, BlinkMacSystemFont, system-ui, sans-serif" }}>
      
      {/* Header */}
      <header style={{ background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)" }} className="text-white">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg" style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)" }}>
                  🎓
                </div>
                <h1 className="text-2xl font-bold tracking-tight">ConfKorea</h1>
                <span className="text-xs px-2 py-1 rounded-full bg-white/10 text-white/70">Beta</span>
              </div>
              <p className="text-white/60 text-sm">한국 CS 연구자를 위한 학회 일정 · BK21 목록 · Best Paper 통합 플랫폼</p>
            </div>
            <div className="hidden sm:flex items-center gap-3">
              <button className="px-4 py-2 text-sm rounded-lg bg-white/10 hover:bg-white/20 transition-colors">로그인</button>
              <button className="px-4 py-2 text-sm rounded-lg text-white font-medium transition-colors" style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)" }}>내 학교 설정</button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mt-6">
            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <div className="text-2xl font-bold">{upcomingCount}</div>
              <div className="text-white/50 text-xs mt-1">다가오는 데드라인</div>
            </div>
            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <div className="text-2xl font-bold">{CONFERENCES.length}</div>
              <div className="text-white/50 text-xs mt-1">등록 학회</div>
            </div>
            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <div className="text-2xl font-bold">{bookmarks.size}</div>
              <div className="text-white/50 text-xs mt-1">내 북마크</div>
            </div>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="max-w-6xl mx-auto px-6 py-6">
        
        {/* Controls */}
        <div className="bg-white rounded-2xl shadow-sm border border-zinc-200/80 p-5 mb-5">
          {/* Search */}
          <div className="relative mb-4">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="학회명 검색 (예: NeurIPS, CVPR, ACL...)"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-zinc-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 transition-all bg-zinc-50"
            />
          </div>

          {/* Field Filter */}
          <div className="mb-3">
            <div className="text-xs text-zinc-500 mb-2 font-medium">분야</div>
            <div className="flex flex-wrap gap-1.5">
              {FIELDS.map(f => (
                <button
                  key={f}
                  onClick={() => setSelectedField(f)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    selectedField === f
                      ? "bg-indigo-600 text-white shadow-sm"
                      : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          {/* School Filter */}
          <div>
            <div className="text-xs text-zinc-500 mb-2 font-medium">기관 인정 학회만 보기</div>
            <div className="flex flex-wrap gap-1.5">
              <button
                onClick={() => setSelectedSchool("전체")}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  selectedSchool === "전체"
                    ? "bg-indigo-600 text-white shadow-sm"
                    : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200"
                }`}
              >
                전체
              </button>
              {INSTITUTIONS.map(inst => (
                <button
                  key={inst}
                  onClick={() => setSelectedSchool(inst)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    selectedSchool === inst
                      ? "bg-indigo-600 text-white shadow-sm"
                      : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200"
                  }`}
                >
                  {inst}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Tab */}
        <div className="flex gap-1 mb-4 bg-zinc-100 rounded-xl p-1 w-fit">
          {[
            { id: "deadline", label: "⏰ 데드라인순" },
            { id: "alpha", label: "🔤 이름순" },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-lg text-xs font-medium transition-all ${
                activeTab === tab.id
                  ? "bg-white text-zinc-900 shadow-sm"
                  : "text-zinc-500 hover:text-zinc-700"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Conference List */}
        <div className="space-y-3">
          {sorted.map(conf => (
            <div
              key={conf.acronym}
              className={`bg-white rounded-2xl border transition-all hover:shadow-md ${
                conf.ddays >= 0 && conf.ddays <= 14
                  ? "border-rose-200 shadow-sm shadow-rose-100"
                  : conf.ddays >= 0 && conf.ddays <= 30
                  ? "border-orange-200"
                  : "border-zinc-200/80"
              }`}
            >
              <div className="p-5">
                <div className="flex items-start justify-between gap-4">
                  {/* Left */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                      <span className="text-lg font-bold text-zinc-900">{conf.acronym}</span>
                      <Badge text={conf.field} variant="field" />
                      <DeadlineBadge ddays={conf.ddays} />
                    </div>
                    <div className="text-sm text-zinc-500 mb-2 truncate">{conf.name}</div>
                    <div className="flex items-center gap-4 text-xs text-zinc-400">
                      <span>📅 {conf.conf_date}</span>
                      <span>📍 {conf.venue}</span>
                      <span>⏰ 마감 {conf.deadline}</span>
                    </div>
                  </div>
                  
                  {/* Right - Institution badges */}
                  <div className="flex flex-col items-end gap-2 shrink-0">
                    <button
                      onClick={() => toggleBookmark(conf.acronym)}
                      className="text-lg hover:scale-110 transition-transform"
                    >
                      {bookmarks.has(conf.acronym) ? "⭐" : "☆"}
                    </button>
                    <div className="flex gap-1 flex-wrap justify-end">
                      <div className="text-center">
                        <div className="text-[10px] text-zinc-400 mb-0.5">BK21</div>
                        <Badge text={conf.bk21} />
                      </div>
                      <div className="text-center">
                        <div className="text-[10px] text-zinc-400 mb-0.5">KIISE</div>
                        <Badge text={conf.kiise} />
                      </div>
                      <div className="text-center">
                        <div className="text-[10px] text-zinc-400 mb-0.5">KAIST</div>
                        <Badge text={conf.kaist} />
                      </div>
                      <div className="text-center">
                        <div className="text-[10px] text-zinc-400 mb-0.5">SNU</div>
                        <Badge text={conf.snu} />
                      </div>
                      <div className="text-center">
                        <div className="text-[10px] text-zinc-400 mb-0.5">POST</div>
                        <Badge text={conf.postech} />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Best Paper Preview */}
                <div className="mt-3 pt-3 border-t border-zinc-100">
                  <button
                    onClick={() => setShowBestPaper(showBestPaper === conf.acronym ? null : conf.acronym)}
                    className="flex items-center gap-2 text-xs text-indigo-600 hover:text-indigo-700 font-medium transition-colors"
                  >
                    <span>🏆</span>
                    <span>2025 Best Paper</span>
                    <svg className={`w-3 h-3 transition-transform ${showBestPaper === conf.acronym ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {showBestPaper === conf.acronym && (
                    <div className="mt-2 p-3 bg-indigo-50 rounded-xl text-sm">
                      <div className="font-medium text-zinc-800">{conf.best_paper_2025}</div>
                      <div className="text-xs text-zinc-500 mt-1">* 예시 데이터입니다. 실제 서비스에서는 논문 링크, 저자 정보가 포함됩니다.</div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {sorted.length === 0 && (
          <div className="text-center py-16 text-zinc-400">
            <div className="text-4xl mb-3">🔍</div>
            <div className="text-sm">검색 결과가 없습니다</div>
          </div>
        )}

        {/* Footer */}
        <footer className="mt-12 pt-8 border-t border-zinc-200 text-center text-xs text-zinc-400 pb-8">
          <p className="mb-2">ConfKorea — 한국 CS 연구자를 위한 학회 통합 플랫폼</p>
          <p>데이터 출처: DBLP (CC0), OpenAlex (CC0), aideadlin.es (MIT), 한국연구재단, 한국정보과학회</p>
          <p className="mt-1">* 프로토타입 UI입니다. 실제 데이터와 다를 수 있습니다.</p>
        </footer>
      </main>
    </div>
  );
}

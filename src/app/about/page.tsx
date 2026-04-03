import type { Metadata } from "next";
import Link from "next/link";
import { headers } from "next/headers";
import { SiteHeader } from "@/presentation/components/layout/site-header";
import { SiteFooter } from "@/presentation/components/layout/site-footer";

export async function generateMetadata(): Promise<Metadata> {
  const country = (await headers()).get("x-vercel-ip-country");
  const isKorean = country === "KR";
  return {
    title: isKorean ? "소개" : "About",
    description: isKorean
      ? "CS-Pedia는 컴퓨터과학 연구자를 위한 학회 정보 통합 플랫폼입니다."
      : "CS-Pedia is a comprehensive conference information platform for CS researchers.",
  };
}

export default async function AboutPage() {
  const country = (await headers()).get("x-vercel-ip-country");
  const isKorean = country === "KR";

  const features = isKorean
    ? [
        { icon: "📅", text: "209개 CS 학회의 데드라인, 학회 일정, 개최지 정보" },
        { icon: "🕐", text: "마감 시간을 한국 시간(KST)으로 변환하여 표시" },
        { icon: "🏛️", text: "기관 인정 현황: BK21, KIISE, KAIST, SNU, POSTECH 등급 한눈에 비교" },
        { icon: "🌍", text: "해외 랭킹: CORE, CCF, CSRankings 등급 제공" },
        { icon: "📊", text: "채택률 트렌드: DBLP/OpenAlex 데이터 기반 연도별 채택률" },
        { icon: "🔍", text: "연구 키워드 트렌드: Semantic Scholar 논문 제목 분석" },
        { icon: "🏆", text: "Best Paper 아카이브: 2020년 이후 1,400편 이상 수록" },
      ]
    : [
        { icon: "📅", text: "209 CS conferences with deadlines, dates, and venues" },
        { icon: "🕐", text: "Deadline times converted to your local timezone" },
        { icon: "🌍", text: "International rankings: CORE, CCF, and CSRankings ratings at a glance" },
        { icon: "🏛️", text: "Korean institutional ratings: BK21, KIISE, KAIST, SNU, POSTECH" },
        { icon: "📊", text: "Acceptance rate trends: Year-over-year data from DBLP/OpenAlex" },
        { icon: "🔍", text: "Research keyword trends: Based on Semantic Scholar paper titles" },
        { icon: "🏆", text: "Best Paper archive: 1,400+ awards since 2020" },
      ];

  const sources = isKorean
    ? [
        { label: "데드라인", desc: "각 학회 공식 웹사이트에서 수동 검증" },
        { label: "채택률", desc: "DBLP + OpenAlex API 자동 수집 (매주 월요일)" },
        { label: "키워드 트렌드", desc: "Semantic Scholar 논문 제목 분석" },
        { label: "Best Paper", desc: "jeffhuang.com + 공식 학회 사이트" },
        { label: "기관 인정", desc: "한국연구재단(BK21), 한국정보과학회(KIISE), 각 대학 공식 목록" },
      ]
    : [
        { label: "Deadlines", desc: "Manually verified from official conference websites" },
        { label: "Acceptance rates", desc: "DBLP + OpenAlex API (updated every Monday)" },
        { label: "Keyword trends", desc: "Semantic Scholar paper title analysis" },
        { label: "Best Papers", desc: "jeffhuang.com + official conference sites" },
        { label: "Rankings", desc: "CORE (Australia), CCF (China), CSRankings, BK21 (Korea), KIISE (Korea)" },
      ];

  return (
    <div className="min-h-screen bg-page-gradient">
      <SiteHeader />

      <main className="max-w-3xl mx-auto px-4 py-8 sm:px-6">
        {/* Breadcrumb */}
        <div className="mb-6">
          <div className="text-[11px] tracking-[0.12em] uppercase text-indigo-400 mb-1.5 font-mono font-medium">
            {isKorean ? "소개" : "About"}
          </div>
          <h1 className="font-bold text-2xl tracking-[-0.025em] text-zinc-900">
            CS-Pedia
          </h1>
          <p className="text-sm text-zinc-500 mt-1">
            {isKorean
              ? "컴퓨터과학 연구자를 위한 학회 정보 통합 플랫폼"
              : "A comprehensive conference information platform for CS researchers"}
          </p>
        </div>

        <div className="space-y-4">
          {/* Why section */}
          <div className="bg-white rounded-2xl shadow-sm border border-zinc-200/80 p-6">
            <h2 className="text-xs font-semibold font-mono tracking-[0.1em] uppercase text-indigo-500 mb-3">
              {isKorean ? "왜 만들었나요?" : "Why CS-Pedia?"}
            </h2>
            <p className="text-sm text-zinc-600 leading-relaxed">
              {isKorean
                ? "한국 CS 대학원생이 학회를 선택할 때 필요한 정보 — 데드라인, BK21 점수, KIISE 등급 — 가 여기저기 흩어져 있어서, 한 곳에서 바로 확인할 수 있도록 만들었습니다."
                : "Conference information — deadlines, rankings, acceptance rates — is scattered across dozens of websites. CS-Pedia brings it all together so researchers can make informed decisions about where to submit."}
            </p>
          </div>

          {/* Features */}
          <div className="bg-white rounded-2xl shadow-sm border border-zinc-200/80 p-6">
            <h2 className="text-xs font-semibold font-mono tracking-[0.1em] uppercase text-indigo-500 mb-4">
              {isKorean ? "무엇을 제공하나요?" : "What We Offer"}
            </h2>
            <ul className="space-y-3">
              {features.map((f, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="text-base leading-none mt-0.5">{f.icon}</span>
                  <span className="text-sm text-zinc-600 leading-relaxed">{f.text}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Data sources */}
          <div className="bg-white rounded-2xl shadow-sm border border-zinc-200/80 p-6">
            <h2 className="text-xs font-semibold font-mono tracking-[0.1em] uppercase text-indigo-500 mb-4">
              {isKorean ? "데이터는 어디서 오나요?" : "Data Sources"}
            </h2>
            <div className="space-y-3">
              {sources.map((s, i) => (
                <div key={i} className="flex gap-3">
                  <span className="text-xs font-semibold font-mono text-zinc-400 w-28 shrink-0 pt-0.5 uppercase tracking-wide">
                    {s.label}
                  </span>
                  <span className="text-sm text-zinc-600">{s.desc}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div className="bg-white rounded-2xl shadow-sm border border-zinc-200/80 p-6">
            <h2 className="text-xs font-semibold font-mono tracking-[0.1em] uppercase text-indigo-500 mb-3">
              {isKorean ? "문의" : "Contact"}
            </h2>
            <p className="text-sm text-zinc-600">
              {isKorean ? "오류 신고, 학회 추가 요청, 기타 문의:" : "Bug reports, conference requests, or general inquiries:"}
              {" "}
              <a
                href="https://mail.google.com/mail/?view=cm&to=contact@cs-pedia.io"
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-500 hover:text-indigo-700 underline underline-offset-2 transition-colors"
              >
                contact@cs-pedia.io
              </a>
            </p>
          </div>
        </div>

        <SiteFooter />
      </main>
    </div>
  );
}

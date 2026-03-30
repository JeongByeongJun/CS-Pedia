import type { Metadata } from "next";
import Link from "next/link";
import { headers } from "next/headers";

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

  return (
    <div className="min-h-screen bg-page-gradient">
      <div className="max-w-3xl mx-auto px-4 py-12 sm:px-6">
        <Link href="/" className="text-sm text-zinc-400 hover:text-zinc-600 mb-6 inline-block">← {isKorean ? "홈으로" : "Back to Home"}</Link>

        {isKorean ? (
          <article className="prose prose-zinc prose-sm max-w-none">
            <h1>CS-Pedia 소개</h1>

            <p>CS-Pedia는 컴퓨터과학 연구자를 위한 <strong>학회 정보 통합 플랫폼</strong>입니다.</p>

            <h2>무엇을 제공하나요?</h2>
            <ul>
              <li><strong>209개 CS 학회</strong>의 데드라인, 학회 일정, 개최지 정보</li>
              <li><strong>마감 시간</strong>을 한국 시간(KST)으로 변환하여 표시</li>
              <li><strong>기관 인정 현황</strong>: BK21, KIISE, KAIST, SNU, POSTECH 등급 한눈에 비교</li>
              <li><strong>해외 랭킹</strong>: CORE, CCF, CSRankings 등급 제공</li>
              <li><strong>채택률 트렌드</strong>: DBLP/OpenAlex 데이터 기반 연도별 채택률</li>
              <li><strong>연구 키워드 트렌드</strong>: Semantic Scholar 논문 제목 분석</li>
              <li><strong>Best Paper 아카이브</strong>: 2020년 이후 1,400편 이상 수록</li>
            </ul>

            <h2>왜 만들었나요?</h2>
            <p>한국 CS 대학원생이 학회를 선택할 때 필요한 정보 — 데드라인, BK21 점수, KIISE 등급 — 가 여기저기 흩어져 있어서, 한 곳에서 바로 확인할 수 있도록 만들었습니다.</p>

            <h2>데이터는 어디서 오나요?</h2>
            <ul>
              <li><strong>데드라인</strong>: 각 학회 공식 웹사이트에서 수동 검증</li>
              <li><strong>채택률</strong>: DBLP + OpenAlex API 자동 수집 (매주 월요일)</li>
              <li><strong>키워드 트렌드</strong>: Semantic Scholar 논문 제목 분석</li>
              <li><strong>Best Paper</strong>: jeffhuang.com + 공식 학회 사이트</li>
              <li><strong>기관 인정</strong>: 한국연구재단(BK21), 한국정보과학회(KIISE), 각 대학 공식 목록</li>
            </ul>

            <h2>문의</h2>
            <p>오류 신고, 학회 추가 요청, 기타 문의: <a href="https://mail.google.com/mail/?view=cm&to=contact@cs-pedia.io" target="_blank" rel="noopener noreferrer">contact@cs-pedia.io</a></p>
          </article>
        ) : (
          <article className="prose prose-zinc prose-sm max-w-none">
            <h1>About CS-Pedia</h1>

            <p>CS-Pedia is a <strong>comprehensive conference information platform</strong> for computer science researchers.</p>

            <h2>What We Offer</h2>
            <ul>
              <li><strong>209 CS conferences</strong> with deadlines, dates, and venues</li>
              <li><strong>Deadline times</strong> converted to your local timezone</li>
              <li><strong>International rankings</strong>: CORE, CCF, and CSRankings ratings at a glance</li>
              <li><strong>Korean institutional ratings</strong>: BK21, KIISE, KAIST, SNU, POSTECH</li>
              <li><strong>Acceptance rate trends</strong>: Year-over-year data from DBLP/OpenAlex</li>
              <li><strong>Research keyword trends</strong>: Based on Semantic Scholar paper titles</li>
              <li><strong>Best Paper archive</strong>: 1,400+ awards since 2020</li>
            </ul>

            <h2>Why CS-Pedia?</h2>
            <p>Conference information — deadlines, rankings, acceptance rates — is scattered across dozens of websites. CS-Pedia brings it all together in one place so researchers can make informed decisions about where to submit their work.</p>

            <h2>Data Sources</h2>
            <ul>
              <li><strong>Deadlines</strong>: Manually verified from official conference websites</li>
              <li><strong>Acceptance rates</strong>: DBLP + OpenAlex API (updated weekly)</li>
              <li><strong>Keyword trends</strong>: Semantic Scholar paper title analysis</li>
              <li><strong>Best Papers</strong>: jeffhuang.com + official conference sites</li>
              <li><strong>Rankings</strong>: CORE (Australia), CCF (China), CSRankings, BK21 (Korea), KIISE (Korea)</li>
            </ul>

            <h2>Contact</h2>
            <p>Bug reports, conference requests, or general inquiries: <a href="https://mail.google.com/mail/?view=cm&to=contact@cs-pedia.io" target="_blank" rel="noopener noreferrer">contact@cs-pedia.io</a></p>
          </article>
        )}
      </div>
    </div>
  );
}

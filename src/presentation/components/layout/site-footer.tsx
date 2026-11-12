"use client";

import Link from "next/link";
import { useLocale } from "@/presentation/hooks/use-locale";

export function SiteFooter() {
  const { isKorean } = useLocale();

  return (
    <footer className="mt-12 pt-8 border-t border-zinc-200 pb-24 sm:pb-8">
      <div className="text-center text-xs text-zinc-400 space-y-2">
        <p>CS-Pedia — {isKorean ? "한국 CS 연구자를 위한 학회 통합 플랫폼" : "CS conference platform for researchers"}</p>
        <p>
          {isKorean ? (
            <>데이터 출처: DBLP (CC0), OpenAlex (CC0), <a href="https://www.semanticscholar.org/" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-zinc-600">Semantic Scholar</a>, aideadlin.es (MIT), 한국연구재단, 한국정보과학회, <a href="https://jeffhuang.com/best_paper_awards/" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-zinc-600">jeffhuang.com</a></>
          ) : (
            <>Data sources: DBLP (CC0), OpenAlex (CC0), <a href="https://www.semanticscholar.org/" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-zinc-600">Semantic Scholar</a>, aideadlin.es (MIT), NRF Korea, KIISE, <a href="https://jeffhuang.com/best_paper_awards/" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-zinc-600">jeffhuang.com</a></>
          )}
        </p>
        <p>{isKorean ? "제출 전 데드라인·학회 일정은 공식 웹사이트에서 반드시 확인하세요." : "Always verify deadlines on the official website before submitting."}</p>
        <div className="flex items-center justify-center gap-3 pt-1">
          <Link href="/about" className="underline underline-offset-2 hover:text-zinc-600 transition-colors py-2 inline-block">
            {isKorean ? "소개" : "About"}
          </Link>
          <span className="text-zinc-300">·</span>
          <Link href="/privacy" className="underline underline-offset-2 hover:text-zinc-600 transition-colors py-2 inline-block">
            {isKorean ? "개인정보 처리방침" : "Privacy"}
          </Link>
          <span className="text-zinc-300">·</span>
          <Link href="/terms" className="underline underline-offset-2 hover:text-zinc-600 transition-colors py-2 inline-block">
            {isKorean ? "이용약관" : "Terms"}
          </Link>
          <span className="text-zinc-300">·</span>
          <a
            href="https://mail.google.com/mail/?view=cm&to=contact@cs-pedia.io" target="_blank" rel="noopener noreferrer"
            className="underline underline-offset-2 hover:text-zinc-600 transition-colors py-2 inline-block"
          >
            {isKorean ? "문의" : "Contact"}
          </a>
        </div>
      </div>
    </footer>
  );
}

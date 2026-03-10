"use client";

import { useLocale } from "@/presentation/hooks/use-locale";

export function SiteFooter() {
  const { isKorean } = useLocale();

  return (
    <footer className="mt-12 pt-8 border-t border-zinc-200 pb-8">
      <div className="text-center text-xs text-zinc-400 space-y-2">
        <p>CS-Pedia — {isKorean ? "한국 CS 연구자를 위한 학회 통합 플랫폼" : "CS conference platform for researchers"}</p>
        <p>
          {isKorean ? (
            <>데이터 출처: DBLP (CC0), OpenAlex (CC0), aideadlin.es (MIT), 한국연구재단, 한국정보과학회, <a href="https://jeffhuang.com/best_paper_awards/" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-zinc-600">jeffhuang.com</a></>
          ) : (
            <>Data sources: DBLP (CC0), OpenAlex (CC0), aideadlin.es (MIT), NRF Korea, KIISE, <a href="https://jeffhuang.com/best_paper_awards/" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-zinc-600">jeffhuang.com</a></>
          )}
        </p>
        <p>{isKorean ? "제출 전 데드라인·학회 일정은 공식 웹사이트에서 반드시 확인하세요." : "Always verify deadlines on the official website before submitting."}</p>
        <p>
          <a
            href="mailto:contact@cs-pedia.io"
            className="underline underline-offset-2 hover:text-zinc-600 transition-colors"
          >
            {isKorean ? "피드백 보내기" : "Send feedback"}
          </a>
        </p>
      </div>
    </footer>
  );
}

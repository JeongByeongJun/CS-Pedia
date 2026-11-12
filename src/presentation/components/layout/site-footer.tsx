"use client";

import Link from "next/link";
import { useLocale } from "@/presentation/hooks/use-locale";
import styles from "./shell.module.css";

export function SiteFooter() {
  const { isKorean } = useLocale();

  return (
    <footer className={styles.footer}>
      <div className={styles.footerInner}>
        <div>
          <p className={styles.footerBrand}>CS-Pedia.</p>
          <p>{isKorean ? "연구자의 다음 논문을 위한 학회 색인." : "A conference index for your next paper."}</p>
          <div className={styles.footerLinks}>
            <Link href="/about">{isKorean ? "소개" : "About"}</Link>
            <Link href="/privacy">{isKorean ? "개인정보 처리방침" : "Privacy"}</Link>
            <Link href="/terms">{isKorean ? "이용약관" : "Terms"}</Link>
            <a href="https://mail.google.com/mail/?view=cm&to=contact@cs-pedia.io" target="_blank" rel="noopener noreferrer">{isKorean ? "문의" : "Contact"}</a>
          </div>
        </div>
        <div>
        <p className={styles.footerSources}>
          {isKorean ? (
            <>데이터 출처: DBLP (CC0), OpenAlex (CC0), <a href="https://www.semanticscholar.org/" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-zinc-600">Semantic Scholar</a>, aideadlin.es (MIT), 한국연구재단, 한국정보과학회, <a href="https://jeffhuang.com/best_paper_awards/" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-zinc-600">jeffhuang.com</a></>
          ) : (
            <>Data sources: DBLP (CC0), OpenAlex (CC0), <a href="https://www.semanticscholar.org/" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-zinc-600">Semantic Scholar</a>, aideadlin.es (MIT), NRF Korea, KIISE, <a href="https://jeffhuang.com/best_paper_awards/" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-zinc-600">jeffhuang.com</a></>
          )}
        </p>
        <p>{isKorean ? "제출 전 데드라인·학회 일정은 공식 웹사이트에서 반드시 확인하세요." : "Always verify deadlines on the official website before submitting."}</p>
        </div>
      </div>
    </footer>
  );
}

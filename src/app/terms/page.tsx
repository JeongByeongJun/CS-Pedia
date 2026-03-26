import type { Metadata } from "next";
import Link from "next/link";
import { headers } from "next/headers";

export async function generateMetadata(): Promise<Metadata> {
  const country = (await headers()).get("x-vercel-ip-country");
  const isKorean = country === "KR";
  return {
    title: isKorean ? "이용약관 — CS-Pedia" : "Terms of Service — CS-Pedia",
    description: isKorean
      ? "CS-Pedia 이용약관"
      : "CS-Pedia Terms of Service",
  };
}

export default async function TermsPage() {
  const country = (await headers()).get("x-vercel-ip-country");
  const isKorean = country === "KR";

  return (
    <div className="min-h-screen bg-page-gradient">
      <div className="max-w-3xl mx-auto px-4 py-12 sm:px-6">
        <Link href="/" className="text-sm text-zinc-400 hover:text-zinc-600 mb-6 inline-block">← {isKorean ? "홈으로" : "Back to Home"}</Link>

        {isKorean ? (
          <article className="prose prose-zinc prose-sm max-w-none">
            <h1>이용약관</h1>
            <p className="text-zinc-500">시행일: 2026년 3월 18일</p>

            <h2>1. 서비스 개요</h2>
            <p>CS-Pedia는 컴퓨터과학 분야 학회의 데드라인, 기관 인정 현황, 채택률, 연구 트렌드, Best Paper 정보를 제공하는 무료 플랫폼입니다.</p>

            <h2>2. 서비스 이용</h2>
            <ul>
              <li>서비스의 학회 정보는 참고 자료이며, 정확성을 보장하지 않습니다.</li>
              <li>논문 제출 전 반드시 학회 공식 웹사이트에서 마감일 및 일정을 확인하시기 바랍니다.</li>
              <li>서비스의 기관 인정 정보(BK21, KIISE 등)는 각 기관의 공식 발표 자료를 기반으로 하며, 기준이 변경될 수 있습니다.</li>
            </ul>

            <h2>3. 계정</h2>
            <ul>
              <li>소셜 로그인(Google, GitHub)을 통해 계정을 생성할 수 있습니다.</li>
              <li>계정은 북마크 기능 이용을 위해 필요하며, 비로그인 상태에서도 학회 정보를 열람할 수 있습니다.</li>
            </ul>

            <h2>4. 데이터 출처</h2>
            <p>서비스에서 제공하는 데이터의 출처는 다음과 같습니다:</p>
            <ul>
              <li>DBLP (CC0 라이선스)</li>
              <li>OpenAlex (CC0 라이선스)</li>
              <li>Semantic Scholar (API Terms of Use)</li>
              <li>jeffhuang.com (Best Paper Awards)</li>
              <li>한국연구재단 (BK21), 한국정보과학회 (KIISE)</li>
              <li>CORE Rankings (portal.core.edu.au)</li>
              <li>CCF (China Computer Federation)</li>
            </ul>

            <h2>5. 금지 행위</h2>
            <ul>
              <li>서비스 데이터의 대량 자동 수집(스크래핑)</li>
              <li>서비스의 정상적인 운영을 방해하는 행위</li>
              <li>타인의 계정을 무단으로 사용하는 행위</li>
            </ul>

            <h2>6. 면책</h2>
            <p>서비스는 제공되는 정보의 정확성, 완전성, 적시성을 보장하지 않으며, 이로 인한 손해에 대해 책임지지 않습니다.</p>

            <h2>7. 약관 변경</h2>
            <p>약관이 변경되는 경우 서비스 내 공지를 통해 안내합니다.</p>

            <h2>8. 문의</h2>
            <p>이용약관 관련 문의: <a href="https://mail.google.com/mail/?view=cm&to=contact@cs-pedia.io" target="_blank" rel="noopener noreferrer">contact@cs-pedia.io</a></p>
          </article>
        ) : (
          <article className="prose prose-zinc prose-sm max-w-none">
            <h1>Terms of Service</h1>
            <p className="text-zinc-500">Effective: March 18, 2026</p>

            <h2>1. Service Overview</h2>
            <p>CS-Pedia is a free platform providing information about computer science conference deadlines, institutional rankings, acceptance rates, research trends, and best paper awards.</p>

            <h2>2. Use of Service</h2>
            <ul>
              <li>Conference information is provided for reference only and accuracy is not guaranteed.</li>
              <li>Always verify deadlines and dates on the official conference website before submitting papers.</li>
              <li>Institutional rankings (BK21, KIISE, CORE, CCF, etc.) are based on publicly available data and may change.</li>
            </ul>

            <h2>3. Accounts</h2>
            <ul>
              <li>You may create an account via social login (Google, GitHub).</li>
              <li>An account is required for bookmark features. Conference information is accessible without login.</li>
            </ul>

            <h2>4. Data Sources</h2>
            <ul>
              <li>DBLP (CC0 License)</li>
              <li>OpenAlex (CC0 License)</li>
              <li>Semantic Scholar (API Terms of Use)</li>
              <li>jeffhuang.com (Best Paper Awards)</li>
              <li>CORE Rankings (portal.core.edu.au)</li>
              <li>CCF (China Computer Federation)</li>
            </ul>

            <h2>5. Prohibited Activities</h2>
            <ul>
              <li>Automated mass scraping of service data</li>
              <li>Interfering with normal service operations</li>
              <li>Unauthorized use of other users&apos; accounts</li>
            </ul>

            <h2>6. Disclaimer</h2>
            <p>The Service does not guarantee the accuracy, completeness, or timeliness of the information provided and shall not be liable for any damages arising from its use.</p>

            <h2>7. Changes to Terms</h2>
            <p>Any changes to these terms will be announced through the Service.</p>

            <h2>8. Contact</h2>
            <p>For inquiries: <a href="https://mail.google.com/mail/?view=cm&to=contact@cs-pedia.io" target="_blank" rel="noopener noreferrer">contact@cs-pedia.io</a></p>
          </article>
        )}
      </div>
    </div>
  );
}

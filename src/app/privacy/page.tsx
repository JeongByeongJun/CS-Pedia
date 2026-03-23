import type { Metadata } from "next";
import Link from "next/link";
import { headers } from "next/headers";

export async function generateMetadata(): Promise<Metadata> {
  const country = (await headers()).get("x-vercel-ip-country");
  const isKorean = !country || country === "KR";
  return {
    title: isKorean ? "개인정보 처리방침 — CS-Pedia" : "Privacy Policy — CS-Pedia",
    description: isKorean
      ? "CS-Pedia 개인정보 처리방침"
      : "CS-Pedia Privacy Policy",
  };
}

export default async function PrivacyPage() {
  const country = (await headers()).get("x-vercel-ip-country");
  const isKorean = !country || country === "KR";

  return (
    <div className="min-h-screen bg-page-gradient">
      <div className="max-w-3xl mx-auto px-4 py-12 sm:px-6">
        <Link href="/" className="text-sm text-zinc-400 hover:text-zinc-600 mb-6 inline-block">← {isKorean ? "홈으로" : "Back to Home"}</Link>

        {isKorean ? (
          <article className="prose prose-zinc prose-sm max-w-none">
            <h1>개인정보 처리방침</h1>
            <p className="text-zinc-500">시행일: 2026년 3월 18일</p>

            <p>CS-Pedia(이하 &quot;서비스&quot;)는 이용자의 개인정보를 소중히 다루며, 「개인정보 보호법」에 따라 다음과 같이 처리합니다.</p>

            <h2>1. 수집하는 개인정보</h2>
            <p>서비스는 소셜 로그인(Google, GitHub) 시 다음 정보를 수집합니다:</p>
            <ul>
              <li>이메일 주소</li>
              <li>이름 (프로필에서 제공하는 경우)</li>
              <li>프로필 사진 URL</li>
            </ul>
            <p>사용자가 직접 입력하는 정보:</p>
            <ul>
              <li>소속 기관</li>
              <li>관심 연구 분야</li>
            </ul>

            <h2>2. 개인정보의 이용 목적</h2>
            <ul>
              <li>서비스 이용을 위한 회원 식별 및 인증</li>
              <li>학회 북마크 기능 제공</li>
              <li>서비스 개선을 위한 통계 분석</li>
            </ul>

            <h2>3. 개인정보의 보유 및 파기</h2>
            <p>회원 탈퇴 시 개인정보는 즉시 파기됩니다. 관련 법령에 의해 보존이 필요한 경우 해당 기간 동안 보관 후 파기합니다.</p>

            <h2>4. 개인정보의 제3자 제공</h2>
            <p>서비스는 이용자의 개인정보를 제3자에게 제공하지 않습니다. 다만, 다음의 경우 예외로 합니다:</p>
            <ul>
              <li>이용자의 사전 동의가 있는 경우</li>
              <li>법령에 의해 요구되는 경우</li>
            </ul>

            <h2>5. 쿠키 및 분석 도구</h2>
            <p>서비스는 다음의 도구를 사용합니다:</p>
            <ul>
              <li><strong>Supabase Auth</strong>: 로그인 세션 관리를 위한 쿠키</li>
              <li><strong>Vercel Analytics</strong>: 익명화된 페이지 방문 통계</li>
              <li><strong>Vercel Speed Insights</strong>: 성능 모니터링</li>
              <li><strong>Google AdSense</strong>: 광고 서비스 (Google의 개인정보 처리방침 적용)</li>
            </ul>

            <h2>6. 이용자의 권리</h2>
            <p>이용자는 언제든지 자신의 개인정보에 대해 열람, 수정, 삭제를 요청할 수 있습니다.</p>

            <h2>7. 문의</h2>
            <p>개인정보 관련 문의: <a href="https://mail.google.com/mail/?view=cm&to=contact@cs-pedia.io" target="_blank" rel="noopener noreferrer">contact@cs-pedia.io</a></p>
          </article>
        ) : (
          <article className="prose prose-zinc prose-sm max-w-none">
            <h1>Privacy Policy</h1>
            <p className="text-zinc-500">Effective: March 18, 2026</p>

            <p>CS-Pedia (&quot;the Service&quot;) respects your privacy. This policy describes how we collect, use, and protect your information.</p>

            <h2>1. Information We Collect</h2>
            <p>When you sign in via Google or GitHub, we collect:</p>
            <ul>
              <li>Email address</li>
              <li>Display name (if provided)</li>
              <li>Profile picture URL</li>
            </ul>
            <p>You may also optionally provide:</p>
            <ul>
              <li>Institution/affiliation</li>
              <li>Research field of interest</li>
            </ul>

            <h2>2. How We Use Your Information</h2>
            <ul>
              <li>Authentication and account management</li>
              <li>Providing bookmark functionality</li>
              <li>Aggregated analytics to improve the service</li>
            </ul>

            <h2>3. Data Retention</h2>
            <p>Your data is deleted immediately upon account deletion. We do not retain personal data beyond what is required by law.</p>

            <h2>4. Third-Party Sharing</h2>
            <p>We do not sell or share your personal data with third parties, except as required by law or with your explicit consent.</p>

            <h2>5. Cookies & Analytics</h2>
            <ul>
              <li><strong>Supabase Auth</strong>: Session cookies for authentication</li>
              <li><strong>Vercel Analytics</strong>: Anonymous page visit statistics</li>
              <li><strong>Vercel Speed Insights</strong>: Performance monitoring</li>
              <li><strong>Google AdSense</strong>: Advertising (subject to Google&apos;s privacy policy)</li>
            </ul>

            <h2>6. Your Rights</h2>
            <p>You may request access, correction, or deletion of your personal data at any time.</p>

            <h2>7. Contact</h2>
            <p>For privacy inquiries: <a href="https://mail.google.com/mail/?view=cm&to=contact@cs-pedia.io" target="_blank" rel="noopener noreferrer">contact@cs-pedia.io</a></p>
          </article>
        )}
      </div>
    </div>
  );
}

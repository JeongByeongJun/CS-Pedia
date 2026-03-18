"use client";

import { useState } from "react";
import { useLocale } from "@/presentation/hooks/use-locale";

const CONTACT_OPTIONS = [
  {
    kr: "정보 오류 신고",
    en: "Report Error",
    subject: "[Error Report] CS-Pedia",
    body: "Please describe the error:\n\nConference:\nField:\nDetails:\n",
  },
  {
    kr: "학회 추가 요청",
    en: "Request Conference",
    subject: "[Conference Request] CS-Pedia",
    body: "Conference name:\nAcronym:\nWebsite:\nField:\n",
  },
  {
    kr: "기능 제안",
    en: "Feature Request",
    subject: "[Feature Request] CS-Pedia",
    body: "Feature description:\n\n",
  },
  {
    kr: "광고 문의",
    en: "Advertising",
    subject: "[Advertising] CS-Pedia",
    body: "Company/Organization:\nInquiry:\n",
  },
];

export function FeedbackButton({ isKorean = true }: { isKorean?: boolean }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex items-center gap-1.5 sm:gap-2 bg-indigo-600 text-white text-xs sm:text-sm font-medium px-4 py-2.5 sm:px-5 sm:py-3 rounded-full shadow-lg shadow-indigo-500/25 hover:bg-indigo-500 hover:shadow-indigo-500/40 hover:scale-105 cursor-pointer transition-all"
      >
        💬 {isKorean ? "문의" : "Contact"}
      </button>

      {open && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/30 z-50 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />

          {/* Bottom sheet */}
          <div className="fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-2xl shadow-2xl p-5 pb-8 sm:max-w-md sm:mx-auto sm:bottom-8 sm:rounded-2xl animate-in slide-in-from-bottom duration-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-zinc-800">
                {isKorean ? "문의 유형을 선택해 주세요" : "How can we help?"}
              </h3>
              <button
                onClick={() => setOpen(false)}
                className="text-zinc-300 hover:text-zinc-500 text-lg leading-none"
              >
                ✕
              </button>
            </div>

            <div className="space-y-2">
              {CONTACT_OPTIONS.map((opt, i) => (
                <a
                  key={i}
                  href={`https://mail.google.com/mail/?view=cm&to=contact@cs-pedia.io&su=${encodeURIComponent(opt.subject)}&body=${encodeURIComponent(opt.body)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl border border-zinc-100 hover:border-indigo-200 hover:bg-indigo-50 transition-all group"
                >
                  <span className="text-sm font-medium text-zinc-600 group-hover:text-indigo-600 transition-colors">
                    {isKorean ? opt.kr : opt.en}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
}

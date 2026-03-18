"use client";

import { useState, useEffect, useRef } from "react";
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
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  return (
    <div ref={ref}>
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex items-center gap-1.5 sm:gap-2 bg-indigo-600 text-white text-xs sm:text-sm font-medium px-4 py-2.5 sm:px-5 sm:py-3 rounded-full shadow-lg shadow-indigo-500/25 hover:bg-indigo-500 hover:shadow-indigo-500/40 hover:scale-105 cursor-pointer transition-all"
      >
        💬 {isKorean ? "문의" : "Contact"}
      </button>

      {open && (
        <div className="fixed bottom-16 right-4 sm:bottom-20 sm:right-6 z-50 bg-white rounded-xl shadow-xl border border-zinc-200 p-3 w-48">
          <div className="space-y-1">
            {CONTACT_OPTIONS.map((opt, i) => (
              <a
                key={i}
                href={`https://mail.google.com/mail/?view=cm&to=contact@cs-pedia.io&su=${encodeURIComponent(opt.subject)}&body=${encodeURIComponent(opt.body)}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="block px-3 py-2 rounded-lg text-xs font-medium text-zinc-500 hover:text-indigo-600 hover:bg-indigo-50 transition-all"
              >
                {isKorean ? opt.kr : opt.en}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

"use client";

import { useState, useEffect, useRef } from "react";
import { useLocale } from "@/presentation/hooks/use-locale";
import styles from "./shell.module.css";

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

export function FeedbackButton() {
  const { isKorean } = useLocale();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    function handleClick(e: PointerEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    }
    document.addEventListener("pointerdown", handleClick);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("pointerdown", handleClick);
      document.removeEventListener("keydown", handleKey);
    };
  }, [open]);

  return (
    <div className={styles.feedback}>
    <div ref={ref} className={styles.feedbackWrap} onBlur={(event) => {
      if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false);
    }}>
      <button
        ref={triggerRef}
        type="button"
        aria-expanded={open}
        aria-controls="feedback-options"
        onClick={() => setOpen(!open)}
        className={styles.authButton}
      >
        {isKorean ? "의견 보내기" : "Send feedback"} <span aria-hidden="true">↗</span>
      </button>

      {open && (
        <div id="feedback-options" className={styles.feedbackPanel}>
          <div className="space-y-1">
            {CONTACT_OPTIONS.map((opt, i) => (
              <a
                key={i}
                href={`https://mail.google.com/mail/?view=cm&to=contact@cs-pedia.io&su=${encodeURIComponent(opt.subject)}&body=${encodeURIComponent(opt.body)}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className={styles.feedbackOption}
              >
                {isKorean ? opt.kr : opt.en}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
    </div>
  );
}

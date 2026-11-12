"use client";

import { useState, useMemo, useRef, useEffect, useId } from "react";
import { useLocale } from "@/presentation/hooks/use-locale";
import styles from "./paper-archive.module.css";

const FIELDS = ["AI/ML", "NLP", "CV", "Systems", "Security", "SE", "DB", "HCI", "Theory", "Networks", "Architecture", "Graphics", "PL", "Robotics"];
const AWARDS = [
  ["best_paper", "Best Paper"],
  ["distinguished_paper", "Distinguished Paper"],
  ["honorable_mention", "Honorable Mention"],
  ["best_student_paper", "Student Paper"],
  ["test_of_time", "Test of Time"],
];

interface BestPaperFiltersProps {
  years: number[];
  conferencesWithField: Array<{ acronym: string; field: string }>;
  selectedYear: number | null;
  selectedConference: string;
  selectedField: string;
  selectedAwardType: string;
  onYearChange: (year: number | null) => void;
  onConferenceChange: (conference: string) => void;
  onFieldChange: (field: string) => void;
  onAwardTypeChange: (awardType: string) => void;
}

export function BestPaperFilters({
  years, conferencesWithField, selectedYear, selectedConference, selectedField,
  selectedAwardType, onYearChange, onConferenceChange, onFieldChange, onAwardTypeChange,
}: BestPaperFiltersProps) {
  const { isKorean } = useLocale();
  const [search, setSearch] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const id = useId();

  const filteredConferences = useMemo(() => conferencesWithField
    .filter((conference) => !selectedField || conference.field === selectedField)
    .filter((conference) => !search || conference.acronym.toLowerCase().includes(search.toLowerCase()))
    .map((conference) => conference.acronym), [conferencesWithField, selectedField, search]);

  useEffect(() => {
    function handleClick(event: PointerEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) setShowDropdown(false);
    }
    document.addEventListener("pointerdown", handleClick);
    return () => document.removeEventListener("pointerdown", handleClick);
  }, []);

  useEffect(() => {
    if (showDropdown && activeIndex >= 0) {
      document.getElementById(`${id}-option-${activeIndex}`)?.scrollIntoView({ block: "nearest" });
    }
  }, [activeIndex, id, showDropdown]);

  const selectConference = (conference: string) => {
    onConferenceChange(conference);
    setSearch("");
    setShowDropdown(false);
    setActiveIndex(-1);
  };
  const isOpen = showDropdown && !selectedConference;

  return (
    <div className={styles.filters} aria-label={isKorean ? "논문 필터" : "Paper filters"}>
      <label className={styles.filter}>
        <span>{isKorean ? "연도" : "Year"}</span>
        <select value={selectedYear ?? ""} onChange={(event) => onYearChange(event.target.value ? Number(event.target.value) : null)}>
          <option value="">{isKorean ? "모든 연도" : "All years"}</option>
          {years.map((year) => <option key={year} value={year}>{year}</option>)}
        </select>
      </label>
      <label className={styles.filter}>
        <span>{isKorean ? "분야" : "Field"}</span>
        <select value={selectedField} onChange={(event) => {
          onFieldChange(event.target.value); onConferenceChange(""); setSearch(""); setActiveIndex(-1);
        }}>
          <option value="">{isKorean ? "모든 분야" : "All fields"}</option>
          {FIELDS.map((field) => <option key={field} value={field}>{field}</option>)}
        </select>
      </label>
      <div className={`${styles.filter} ${styles.conferenceFilter}`} ref={dropdownRef}>
        <label htmlFor={`${id}-conference`}>{isKorean ? "학회" : "Conference"}</label>
        <div className={styles.searchWrap}>
          <input
            id={`${id}-conference`}
            ref={inputRef}
            role="combobox"
            aria-expanded={isOpen}
            aria-controls={`${id}-options`}
            aria-autocomplete="list"
            aria-activedescendant={isOpen && activeIndex >= 0 && filteredConferences[activeIndex] ? `${id}-option-${activeIndex}` : undefined}
            autoComplete="off"
            value={selectedConference || search}
            placeholder={isKorean ? "학회 검색…" : "Find a conference…"}
            onChange={(event) => {
              setSearch(event.target.value); onConferenceChange(""); setShowDropdown(true); setActiveIndex(-1);
            }}
            onFocus={() => setShowDropdown(true)}
            onBlur={(event) => {
              if (!dropdownRef.current?.contains(event.relatedTarget)) setShowDropdown(false);
            }}
            onKeyDown={(event) => {
              if (event.key === "Escape") setShowDropdown(false);
              if (event.key === "ArrowDown" || event.key === "ArrowUp") {
                event.preventDefault(); setShowDropdown(true);
                setActiveIndex((previous) => Math.max(0, Math.min(filteredConferences.length - 1, previous + (event.key === "ArrowDown" ? 1 : -1))));
              }
              if (event.key === "Enter" && isOpen && filteredConferences[activeIndex]) {
                event.preventDefault(); selectConference(filteredConferences[activeIndex]);
              }
            }}
          />
          {(selectedConference || search) && <button
            type="button"
            className={styles.clearSearch}
            aria-label={isKorean ? "학회 검색 초기화" : "Clear conference search"}
            onClick={() => { selectConference(""); inputRef.current?.focus(); }}
          >×</button>}
        </div>
        {isOpen && <div id={`${id}-options`} className={styles.dropdown} role="listbox" aria-label={isKorean ? "학회" : "Conference"}>
          {filteredConferences.length === 0
            ? <p className={styles.noOptions}>{isKorean ? "검색 결과 없음" : "No conferences found"}</p>
            : filteredConferences.map((conference, index) => <div
              key={conference}
              id={`${id}-option-${index}`}
              role="option"
              aria-selected={index === activeIndex}
              className={styles.option}
              onPointerDown={(event) => event.preventDefault()}
              onClick={() => selectConference(conference)}
            >{conference}</div>)}
        </div>}
      </div>
      <label className={styles.filter}>
        <span>{isKorean ? "수상 유형" : "Award"}</span>
        <select value={selectedAwardType} onChange={(event) => onAwardTypeChange(event.target.value)}>
          <option value="">{isKorean ? "모든 수상 유형" : "All awards"}</option>
          {AWARDS.map(([value, label]) => <option key={value} value={value}>{label}</option>)}
        </select>
      </label>
    </div>
  );
}

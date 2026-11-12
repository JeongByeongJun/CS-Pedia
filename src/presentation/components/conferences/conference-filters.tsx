"use client";

import { FIELDS } from "@/shared/constants/fields";
import { INSTITUTIONS_KR, INSTITUTIONS_INTL } from "@/shared/constants/institutions";
import { useLocale } from "@/presentation/hooks/use-locale";
import styles from "./conference-index.module.css";

interface ConferenceFiltersProps {
  selectedField: string;
  selectedInstitution: string;
  selectedSort: string;
  onFieldChange: (field: string) => void;
  onInstitutionChange: (institution: string) => void;
  onSortChange: (sort: string) => void;
}

export function ConferenceFilters({ selectedField, selectedInstitution, selectedSort, onFieldChange, onInstitutionChange, onSortChange }: ConferenceFiltersProps) {
  const { isKorean } = useLocale();
  const sortOptions = isKorean
    ? [{ id: "deadline", label: "마감일순" }, { id: "alphabetical", label: "이름순" }, { id: "bk21", label: "BK21순" }]
    : [{ id: "deadline", label: "By deadline" }, { id: "alphabetical", label: "Alphabetical" }, { id: "bk21", label: "CORE rank" }];

  return (
    <div className={styles.filters}>
      <fieldset className={styles.fieldset}>
        <legend>{isKorean ? "연구 분야" : "Research field"}</legend>
        <div className={styles.fieldOptions}>
          {FIELDS.map((field) => (
            <button key={field} onClick={() => onFieldChange(field === "전체" ? "" : field)} aria-pressed={(field === "전체" && !selectedField) || selectedField === field}>
              {field === "전체" ? (isKorean ? "전체" : "All") : field}
            </button>
          ))}
        </div>
      </fieldset>
      <div className={styles.secondaryFilters}>
        <fieldset className={styles.fieldset}>
          <legend>{isKorean ? "평가 기관" : "Ranked by"}</legend>
          <div className={styles.institutionOptions}>
            <button onClick={() => onInstitutionChange("")} aria-pressed={!selectedInstitution}>{isKorean ? "전체" : "All"}</button>
            {(isKorean ? INSTITUTIONS_KR : INSTITUTIONS_INTL).map((institution) => (
              <button key={institution} onClick={() => onInstitutionChange(institution)} aria-pressed={selectedInstitution === institution}>{institution}</button>
            ))}
          </div>
        </fieldset>
        <label className={styles.sortLabel}>
          <span>{isKorean ? "정렬" : "Sort"}</span>
          <select value={selectedSort} onChange={(event) => onSortChange(event.target.value)}>
            {sortOptions.map((option) => <option key={option.id} value={option.id}>{option.label}</option>)}
          </select>
        </label>
      </div>
    </div>
  );
}

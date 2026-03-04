"use client";

import { useTransition } from "react";
import { updateProfile } from "@/app/actions/profile";
import { FIELDS } from "@/shared/constants/fields";

interface ProfileFormProps {
  user: {
    name: string | null;
    email: string | null;
    institution: string | null;
    researchField: string | null;
  };
}


const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "8px 12px",
  fontSize: "13px",
  border: "1px solid rgba(0,0,0,0.08)",
  borderRadius: "10px",
  outline: "none",
  transition: "border-color 0.2s, box-shadow 0.2s",
  background: "#fafafa",
  color: "#18181b",
};

const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: "12px",
  fontWeight: 500,
  color: "#71717a",
  marginBottom: "6px",
};

export function ProfileForm({ user }: ProfileFormProps) {
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (formData: FormData) => {
    startTransition(async () => {
      await updateProfile(formData);
    });
  };

  return (
    <form action={handleSubmit} className="space-y-4">
      <div>
        <label style={labelStyle}>이름</label>
        <input
          name="name"
          type="text"
          defaultValue={user.name ?? ""}
          style={inputStyle}
          placeholder="이름을 입력하세요"
          className="focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/20"
        />
      </div>

      <div>
        <label style={labelStyle}>이메일</label>
        <input
          type="text"
          defaultValue={user.email ?? ""}
          disabled
          style={{
            ...inputStyle,
            background: "#f4f4f5",
            color: "#a1a1aa",
            border: "1px solid rgba(0,0,0,0.04)",
            cursor: "not-allowed",
          }}
        />
      </div>

      <div>
        <label style={labelStyle}>소속 기관</label>
        <input
          name="institution"
          type="text"
          defaultValue={user.institution ?? ""}
          style={inputStyle}
          placeholder="예: 서울대학교, KAIST, 고려대학교..."
          className="focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/20"
        />
      </div>

      <div>
        <label style={labelStyle}>관심 분야</label>
        <select
          name="researchField"
          defaultValue={user.researchField ?? ""}
          style={inputStyle}
          className="focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/20"
        >
          <option value="">선택하세요</option>
          {FIELDS.filter((f) => f !== "전체").map((field) => (
            <option key={field} value={field}>
              {field}
            </option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        disabled={isPending}
        style={{
          width: "100%",
          padding: "10px 16px",
          fontSize: "13px",
          fontWeight: 600,
          borderRadius: "10px",
          border: "none",
          background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
          color: "white",
          cursor: isPending ? "not-allowed" : "pointer",
          opacity: isPending ? 0.6 : 1,
          transition: "opacity 0.2s, transform 0.1s",
        }}
      >
        {isPending ? "저장 중..." : "프로필 저장"}
      </button>
    </form>
  );
}

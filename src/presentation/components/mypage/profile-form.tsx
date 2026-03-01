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

const KOREAN_INSTITUTIONS = [
  "",
  "KAIST",
  "서울대학교",
  "POSTECH",
  "고려대학교",
  "연세대학교",
  "성균관대학교",
  "한양대학교",
  "UNIST",
  "GIST",
  "DGIST",
  "기타",
] as const;

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
        <label className="block text-sm font-medium text-zinc-700 mb-1">
          이름
        </label>
        <input
          name="name"
          type="text"
          defaultValue={user.name ?? ""}
          className="w-full px-3 py-2 text-sm border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          placeholder="이름을 입력하세요"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-zinc-700 mb-1">
          이메일
        </label>
        <input
          type="text"
          defaultValue={user.email ?? ""}
          disabled
          className="w-full px-3 py-2 text-sm border border-zinc-100 rounded-lg bg-zinc-50 text-zinc-400"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-zinc-700 mb-1">
          소속 기관
        </label>
        <select
          name="institution"
          defaultValue={user.institution ?? ""}
          className="w-full px-3 py-2 text-sm border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        >
          {KOREAN_INSTITUTIONS.map((inst) => (
            <option key={inst} value={inst}>
              {inst || "선택하세요"}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-zinc-700 mb-1">
          관심 분야
        </label>
        <select
          name="researchField"
          defaultValue={user.researchField ?? ""}
          className="w-full px-3 py-2 text-sm border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
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
        className="w-full px-4 py-2.5 text-sm font-medium rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-colors disabled:opacity-50"
      >
        {isPending ? "저장 중..." : "프로필 저장"}
      </button>
    </form>
  );
}

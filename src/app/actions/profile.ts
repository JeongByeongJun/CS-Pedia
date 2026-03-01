"use server";

import { revalidatePath } from "next/cache";
import { createSupabaseServerClient } from "@/infrastructure/supabase/server";
import { userRepo } from "@/infrastructure/container";

export async function updateProfile(formData: FormData) {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "로그인이 필요합니다." };

  const name = (formData.get("name") as string) || null;
  const institution = (formData.get("institution") as string) || null;
  const researchField = (formData.get("researchField") as string) || null;

  try {
    await userRepo.update(user.id, { name, institution, researchField });
    revalidatePath("/mypage");
    return { success: true };
  } catch {
    return { error: "프로필 업데이트에 실패했습니다." };
  }
}

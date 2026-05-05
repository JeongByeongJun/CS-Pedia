import { createSupabaseServerClient } from "../server";
import { toDomainProfessor } from "../mappers/professor-mapper";
import type {
  ProfessorRepository,
  ProfessorWithPublicationCount,
} from "@/domain/repositories/professor-repository";

interface ProfessorRowWithCount {
  id: string;
  name_ko: string;
  name_en: string | null;
  university: string;
  department: string | null;
  rank: string;
  dblp_pid: string | null;
  homepage_url: string | null;
  dblp_status: string;
  created_at: string;
  professor_publications: Array<{ count: number }>;
}

function toWithCount(row: ProfessorRowWithCount): ProfessorWithPublicationCount {
  const count = row.professor_publications?.[0]?.count ?? 0;
  return {
    ...toDomainProfessor(row),
    publicationCount: count,
  };
}

export class SupabaseProfessorRepository implements ProfessorRepository {
  async findAll(): Promise<ProfessorWithPublicationCount[]> {
    const supabase = await createSupabaseServerClient();

    const { data, error } = await supabase
      .from("professors")
      .select("*, professor_publications(count)")
      .eq("dblp_status", "confirmed")
      .order("name_ko");

    if (error) throw error;

    return ((data as unknown as ProfessorRowWithCount[]) ?? []).map(toWithCount);
  }

  async findByUniversity(university: string): Promise<ProfessorWithPublicationCount[]> {
    const supabase = await createSupabaseServerClient();

    const { data, error } = await supabase
      .from("professors")
      .select("*, professor_publications(count)")
      .eq("dblp_status", "confirmed")
      .eq("university", university)
      .order("name_ko");

    if (error) throw error;

    return ((data as unknown as ProfessorRowWithCount[]) ?? []).map(toWithCount);
  }

  async getUniversities(): Promise<string[]> {
    const supabase = await createSupabaseServerClient();

    const { data, error } = await supabase
      .from("professors")
      .select("university")
      .eq("dblp_status", "confirmed")
      .order("university");

    if (error) throw error;

    const seen = new Set<string>();
    const result: string[] = [];
    for (const row of (data ?? []) as Array<{ university: string }>) {
      if (!seen.has(row.university)) {
        seen.add(row.university);
        result.push(row.university);
      }
    }
    return result;
  }
}

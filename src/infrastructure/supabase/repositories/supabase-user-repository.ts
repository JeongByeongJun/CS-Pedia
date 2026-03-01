import type { UserRepository } from "@/domain/repositories/user-repository";
import type { User } from "@/domain/entities/user";
import type { Database } from "../types/database.types";
import { createSupabaseServerClient } from "../server";

type UserRow = Database["public"]["Tables"]["users"]["Row"];

export class SupabaseUserRepository implements UserRepository {
  async findById(id: string): Promise<User | null> {
    const supabase = await createSupabaseServerClient();
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("id", id)
      .single<UserRow>();

    if (error || !data) return null;
    return {
      id: data.id,
      email: data.email,
      name: data.name,
      institution: data.institution,
      researchField: data.research_field,
    };
  }

  async update(
    id: string,
    updates: Partial<Pick<User, "name" | "institution" | "researchField">>,
  ): Promise<void> {
    const supabase = await createSupabaseServerClient();
    const row: Database["public"]["Tables"]["users"]["Update"] = {};
    if (updates.name !== undefined) row.name = updates.name;
    if (updates.institution !== undefined) row.institution = updates.institution;
    if (updates.researchField !== undefined)
      row.research_field = updates.researchField;

    const { error } = await supabase
      .from("users")
      .update(row as never)
      .eq("id", id);

    if (error) throw error;
  }
}

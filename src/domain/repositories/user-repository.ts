import type { User } from "../entities/user";

export interface UserRepository {
  findById(id: string): Promise<User | null>;
  update(
    id: string,
    data: Partial<Pick<User, "name" | "institution" | "researchField">>,
  ): Promise<void>;
}

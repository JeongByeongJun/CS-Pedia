import type { ProfessorRepository } from "../repositories/professor-repository";

export function createGetProfessorsUseCase(repo: ProfessorRepository) {
  return {
    getAll: () => repo.findAll(),
    getByUniversity: (university: string) => repo.findByUniversity(university),
    getUniversities: () => repo.getUniversities(),
  };
}

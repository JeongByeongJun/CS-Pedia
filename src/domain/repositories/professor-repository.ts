import type { Professor } from "../entities/professor";

export interface ProfessorWithPublicationCount extends Professor {
  publicationCount: number;
}

export interface ProfessorRepository {
  findAll(): Promise<ProfessorWithPublicationCount[]>;
  findByUniversity(university: string): Promise<ProfessorWithPublicationCount[]>;
  getUniversities(): Promise<string[]>;
}

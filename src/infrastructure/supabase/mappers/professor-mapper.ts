import { DblpStatusEnum } from "@/domain/entities/professor";
import type { Professor } from "@/domain/entities/professor";

interface ProfessorRow {
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
}

export function toDomainProfessor(row: ProfessorRow): Professor {
  return {
    id: row.id,
    nameKo: row.name_ko,
    nameEn: row.name_en,
    university: row.university,
    department: row.department,
    rank: row.rank,
    dblpPid: row.dblp_pid,
    homepageUrl: row.homepage_url,
    dblpStatus: DblpStatusEnum.parse(row.dblp_status),
  };
}

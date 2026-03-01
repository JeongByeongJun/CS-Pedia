import type { Database } from "../types/database.types";
import type { Conference } from "@/domain/entities/conference";
import type { ConferenceField } from "@/domain/entities/conference";

type ConferenceRow = Database["public"]["Tables"]["conferences"]["Row"];

export function toDomainConference(row: ConferenceRow): Conference {
  return {
    id: row.id,
    slug: row.slug,
    nameEn: row.name_en,
    nameKr: row.name_kr,
    acronym: row.acronym,
    field: row.field as ConferenceField,
    subField: row.sub_field,
    dblpKey: row.dblp_key,
    websiteUrl: row.website_url,
    description: row.description,
  };
}

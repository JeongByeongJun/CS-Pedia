import type { Database } from "../types/database.types";
import type { Deadline } from "@/domain/entities/deadline";
import { parseOptionalDate } from "@/shared/utils/date";

type DeadlineRow = Database["public"]["Tables"]["deadlines"]["Row"];

export function toDomainDeadline(row: DeadlineRow): Deadline {
  return {
    id: row.id,
    conferenceId: row.conference_id,
    year: row.year,
    cycle: row.cycle,
    abstractDeadline: parseOptionalDate(row.abstract_deadline),
    paperDeadline: parseOptionalDate(row.paper_deadline),
    notificationDate: parseOptionalDate(row.notification_date),
    cameraReady: parseOptionalDate(row.camera_ready),
    conferenceStart: parseOptionalDate(row.conference_start),
    conferenceEnd: parseOptionalDate(row.conference_end),
    venue: row.venue,
    timezone: row.timezone,
    notes: row.notes,
  };
}

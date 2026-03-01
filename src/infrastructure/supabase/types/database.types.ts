export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      conferences: {
        Row: {
          id: string;
          slug: string;
          name_en: string;
          name_kr: string | null;
          acronym: string;
          field: string;
          sub_field: string | null;
          dblp_key: string | null;
          website_url: string | null;
          description: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          slug: string;
          name_en: string;
          name_kr?: string | null;
          acronym: string;
          field: string;
          sub_field?: string | null;
          dblp_key?: string | null;
          website_url?: string | null;
          description?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          slug?: string;
          name_en?: string;
          name_kr?: string | null;
          acronym?: string;
          field?: string;
          sub_field?: string | null;
          dblp_key?: string | null;
          website_url?: string | null;
          description?: string | null;
          updated_at?: string;
        };
      };
      institution_ratings: {
        Row: {
          id: string;
          conference_id: string;
          institution: string;
          tier: string | null;
          year: number;
          notes: string | null;
        };
        Insert: {
          id?: string;
          conference_id: string;
          institution: string;
          tier?: string | null;
          year: number;
          notes?: string | null;
        };
        Update: {
          id?: string;
          conference_id?: string;
          institution?: string;
          tier?: string | null;
          year?: number;
          notes?: string | null;
        };
      };
      deadlines: {
        Row: {
          id: string;
          conference_id: string;
          year: number;
          cycle: string | null;
          abstract_deadline: string | null;
          paper_deadline: string | null;
          notification_date: string | null;
          camera_ready: string | null;
          conference_start: string | null;
          conference_end: string | null;
          venue: string | null;
          timezone: string;
          notes: string | null;
        };
        Insert: {
          id?: string;
          conference_id: string;
          year: number;
          cycle?: string | null;
          abstract_deadline?: string | null;
          paper_deadline?: string | null;
          notification_date?: string | null;
          camera_ready?: string | null;
          conference_start?: string | null;
          conference_end?: string | null;
          venue?: string | null;
          timezone?: string;
          notes?: string | null;
        };
        Update: {
          id?: string;
          conference_id?: string;
          year?: number;
          cycle?: string | null;
          abstract_deadline?: string | null;
          paper_deadline?: string | null;
          notification_date?: string | null;
          camera_ready?: string | null;
          conference_start?: string | null;
          conference_end?: string | null;
          venue?: string | null;
          timezone?: string;
          notes?: string | null;
        };
      };
      acceptance_rates: {
        Row: {
          id: string;
          conference_id: string;
          year: number;
          submitted: number | null;
          accepted: number | null;
          rate: number | null;
          notes: string | null;
        };
        Insert: {
          id?: string;
          conference_id: string;
          year: number;
          submitted?: number | null;
          accepted?: number | null;
          rate?: number | null;
          notes?: string | null;
        };
        Update: {
          id?: string;
          conference_id?: string;
          year?: number;
          submitted?: number | null;
          accepted?: number | null;
          rate?: number | null;
          notes?: string | null;
        };
      };
      best_papers: {
        Row: {
          id: string;
          conference_id: string;
          year: number;
          paper_title: string;
          authors: string | null;
          award_type: string;
          abstract: string | null;
          paper_url: string | null;
          doi: string | null;
          tags: string[] | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          conference_id: string;
          year: number;
          paper_title: string;
          authors?: string | null;
          award_type?: string;
          abstract?: string | null;
          paper_url?: string | null;
          doi?: string | null;
          tags?: string[] | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          conference_id?: string;
          year?: number;
          paper_title?: string;
          authors?: string | null;
          award_type?: string;
          abstract?: string | null;
          paper_url?: string | null;
          doi?: string | null;
          tags?: string[] | null;
        };
      };
      users: {
        Row: {
          id: string;
          email: string | null;
          name: string | null;
          institution: string | null;
          research_field: string | null;
          notification_preferences: Json;
          created_at: string;
        };
        Insert: {
          id: string;
          email?: string | null;
          name?: string | null;
          institution?: string | null;
          research_field?: string | null;
          notification_preferences?: Json;
          created_at?: string;
        };
        Update: {
          email?: string | null;
          name?: string | null;
          institution?: string | null;
          research_field?: string | null;
          notification_preferences?: Json;
        };
      };
      bookmarks: {
        Row: {
          id: string;
          user_id: string;
          conference_id: string;
          notify_before_days: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          conference_id: string;
          notify_before_days?: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          conference_id?: string;
          notify_before_days?: number;
        };
      };
    };
    Views: {
      conference_with_next_deadline: {
        Row: {
          id: string;
          slug: string;
          name_en: string;
          name_kr: string | null;
          acronym: string;
          field: string;
          sub_field: string | null;
          dblp_key: string | null;
          website_url: string | null;
          description: string | null;
          created_at: string;
          updated_at: string;
          next_deadline: string | null;
          deadline_year: number | null;
          next_venue: string | null;
          conference_start: string | null;
          conference_end: string | null;
          days_until_deadline: number | null;
        };
      };
    };
    Functions: Record<string, never>;
    Enums: Record<string, never>;
  };
}

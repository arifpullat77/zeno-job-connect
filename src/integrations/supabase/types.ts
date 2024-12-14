export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      applications: {
        Row: {
          applicant_email: string
          applicant_name: string
          created_at: string | null
          id: string
          job_id: string | null
          location: string | null
          phone_number: string | null
          referral_id: string | null
          resume_url: string | null
          status: string | null
          updated_at: string | null
        }
        Insert: {
          applicant_email: string
          applicant_name: string
          created_at?: string | null
          id?: string
          job_id?: string | null
          location?: string | null
          phone_number?: string | null
          referral_id?: string | null
          resume_url?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          applicant_email?: string
          applicant_name?: string
          created_at?: string | null
          id?: string
          job_id?: string | null
          location?: string | null
          phone_number?: string | null
          referral_id?: string | null
          resume_url?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "applications_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "jobs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "applications_referral_id_fkey"
            columns: ["referral_id"]
            isOneToOne: false
            referencedRelation: "referrals"
            referencedColumns: ["id"]
          },
        ]
      }
      feedback: {
        Row: {
          comment: string | null
          created_at: string | null
          id: string
          rating: number
          user_id: string
        }
        Insert: {
          comment?: string | null
          created_at?: string | null
          id?: string
          rating: number
          user_id: string
        }
        Update: {
          comment?: string | null
          created_at?: string | null
          id?: string
          rating?: number
          user_id?: string
        }
        Relationships: []
      }
      jobs: {
        Row: {
          company: string
          created_at: string | null
          description: string
          id: string
          location: string
          recruiter_id: string | null
          referral_bonus: number
          salary: string
          status: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          company: string
          created_at?: string | null
          description: string
          id?: string
          location: string
          recruiter_id?: string | null
          referral_bonus: number
          salary: string
          status?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          company?: string
          created_at?: string | null
          description?: string
          id?: string
          location?: string
          recruiter_id?: string | null
          referral_bonus?: number
          salary?: string
          status?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "jobs_recruiter_id_fkey"
            columns: ["recruiter_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string | null
          email: string | null
          full_name: string | null
          id: string
          is_admin: boolean | null
          role: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          id: string
          is_admin?: boolean | null
          role?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          id?: string
          is_admin?: boolean | null
          role?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      referrals: {
        Row: {
          clicks: number | null
          created_at: string | null
          id: string
          job_id: string | null
          referral_code: string
          referrer_id: string | null
          updated_at: string | null
        }
        Insert: {
          clicks?: number | null
          created_at?: string | null
          id?: string
          job_id?: string | null
          referral_code: string
          referrer_id?: string | null
          updated_at?: string | null
        }
        Update: {
          clicks?: number | null
          created_at?: string | null
          id?: string
          job_id?: string | null
          referral_code?: string
          referrer_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "referrals_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "jobs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "referrals_referrer_id_fkey"
            columns: ["referrer_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      subscriptions: {
        Row: {
          created_at: string | null
          id: string
          plan_type: string | null
          status: string
          trial_end: string | null
          trial_start: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          plan_type?: string | null
          status?: string
          trial_end?: string | null
          trial_start?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          plan_type?: string | null
          status?: string
          trial_end?: string | null
          trial_start?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

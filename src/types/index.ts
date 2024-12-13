export interface Job {
  id: string;
  recruiter_id: string;
  title: string;
  company: string;
  location: string;
  description: string;
  salary: string;
  referral_bonus: number;
  status: 'open' | 'closed';
  created_at?: string;
  updated_at?: string;
}

export interface Referral {
  id: string;
  job_id: string;
  referrer_id: string;
  referral_code: string;
  clicks: number;
  created_at?: string;
  updated_at?: string;
}

export interface Application {
  id: string;
  job_id: string;
  referral_id?: string;
  applicant_name: string;
  applicant_email: string;
  resume_url?: string;
  status: 'applied' | 'interviewing' | 'hired' | 'rejected';
  created_at?: string;
  updated_at?: string;
}

export interface Profile {
  id: string;
  full_name?: string;
  email?: string;
  role?: 'recruiter' | 'referrer';
  created_at?: string;
  updated_at?: string;
}
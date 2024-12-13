export type JobStatus = 'open' | 'closed' | 'filled';
export type ApplicationStatus = 'applied' | 'reviewing' | 'hired' | 'rejected';

export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  description: string;
  salary: string;
  referralBonus: number;
  status: JobStatus;
  createdAt: string;
  recruiterId: string;
}

export interface Application {
  id: string;
  jobId: string;
  applicantName: string;
  applicantEmail: string;
  status: ApplicationStatus;
  referrerId?: string;
  createdAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'recruiter' | 'referrer';
  walletBalance: number;
}
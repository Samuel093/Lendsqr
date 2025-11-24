export type UserStatus = "active" | "inactive" | "pending" | "blacklisted";

export interface User {
  id: string;
  profile: {
    username: string;
    organization: string;
    avatar?: string;
  };
  email: string;
  phone: string;
  status: UserStatus;
  created_at: string; // ISO string
  education_employment?: {
    education_level?: string;
    sector?: string;
    employment_status?: string;
    duration?: string;
    office_email?: string;
    monthly_income?: string[];
    loan_repayment?: string;
  };
  socials?: {
    twitter?: string;
    facebook?: string;
    instagram?: string;
  };
}



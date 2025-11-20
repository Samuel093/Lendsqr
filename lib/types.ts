export interface User {
  id: string;
  profile: {
    first_name: string;
    last_name: string;
    username: string;
    avatar: string;
    organization: string;
  };

  email: string;
  phone: string;
  status: "Active" | "Inactive" | "Pending" | "Blacklisted";
  created_at: string;

  education_employment: {
    education_level: string;
    sector: string;
    employment_status: string;
    duration: string;
    office_email: string;
    monthly_income: string[];
    loan_repayment: string;
  };

  socials: {
    twitter: string;
    facebook: string;
    instagram: string;
  };
}

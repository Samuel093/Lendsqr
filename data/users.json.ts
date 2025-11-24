{
  id: string,
  profile: {
    username: string,
    organization: string
  },
  email: string,
  phone: string,
  status: "active" | "inactive" | "pending" | "blacklisted",
  created_at: string
}

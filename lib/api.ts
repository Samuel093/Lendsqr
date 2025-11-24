import usersLocal from "@/data/users.json";
import { User } from "./types";

export const fetchUsersLocal = async (): Promise<User[]> => {
  // If usersLocal is not an array (parsing error), return empty array
  return Array.isArray(usersLocal) ? (usersLocal as User[]) : [];
};

// Optional remote fetch (if you host mocky/json elsewhere)
export const REMOTE_USERS_API = process.env.NEXT_PUBLIC_REMOTE_USERS_API || "";
export const fetchUsers = async (): Promise<User[]> => {
  if (!REMOTE_USERS_API) {
    return fetchUsersLocal();
  }
  const res = await fetch(REMOTE_USERS_API, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch remote users");
  const data = await res.json();
  return Array.isArray(data) ? (data as User[]) : [];
};



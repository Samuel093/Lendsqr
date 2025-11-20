import { API_URL, REMOTE_USERS_API } from "./constants";
import usersLocal from "@/data/users.json";
import { User } from "./types";

export const fetchUsers = async (): Promise<User[]> => {
  // If using local json, return immediately (no fetch)
  if (!REMOTE_USERS_API) {
    return usersLocal as User[];
  }

  // Otherwise fetch remote API
  const res = await fetch(API_URL, { cache: "no-store" });

  if (!res.ok) {
    throw new Error("Failed to fetch users");
  }

  return res.json();
};


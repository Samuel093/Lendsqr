// If you add a LIVE API:
export const REMOTE_USERS_API = process.env.NEXT_PUBLIC_USERS_API || "";

// Local dev fallback (500-records JSON file)
export const LOCAL_USERS_JSON_PATH = "/data/users.json";

// Choose best source depending on availability
export const API_URL = REMOTE_USERS_API !== "" ? REMOTE_USERS_API : LOCAL_USERS_JSON_PATH;

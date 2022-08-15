export type TAB_KEY = "profile" | "myRequest" | "works";
export type TAB_INDEX_KEY = "0" | "1" | "2";

export const TAB_INDEX_MAP: Record<TAB_INDEX_KEY, TAB_KEY> = {
  "0": "profile",
  "1": "myRequest",
  "2": "works",
};
export const TAB_MAP: Record<TAB_KEY, number> = {
  profile: 0,
  myRequest: 1,
  works: 2,
};

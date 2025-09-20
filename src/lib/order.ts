export interface User {
  name: string;
  avatar: string;
}

export interface Order {
  id: string;
  user: User;
  project: string;
  address: string;
  date: string;
  status: string;
}

export interface SortConfig {
  key: string | null;
  direction: "asc" | "desc";
}

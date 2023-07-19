export interface User {
  uid: string;
  isAdmin?: boolean;
}

export interface AuthContextValue {
  user: User | null;
  uid: string | null;
  login: () => void;
  logout: () => void;
}

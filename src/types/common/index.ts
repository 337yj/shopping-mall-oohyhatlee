export interface User {
  uid: string | null;
  isAdmin?: boolean;
}

export interface AuthContextValue extends User {
  user: User | null;
  login: () => void;
  logout: () => void;
}

export interface Product {
  id: string;
  title: string;
  price: string;
  category: string;
  description: string;
  options: string;
}

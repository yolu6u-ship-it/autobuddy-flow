import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  createdAt: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signup: (data: { name: string; email: string; phone: string; password: string }) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const USERS_STORAGE_KEY = "autoflow_users";
const CURRENT_USER_KEY = "autoflow_current_user";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const storedUser = localStorage.getItem(CURRENT_USER_KEY);
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        localStorage.removeItem(CURRENT_USER_KEY);
      }
    }
    setIsLoading(false);
  }, []);

  const getUsers = (): Record<string, { user: User; password: string }> => {
    try {
      const users = localStorage.getItem(USERS_STORAGE_KEY);
      return users ? JSON.parse(users) : {};
    } catch {
      return {};
    }
  };

  const saveUsers = (users: Record<string, { user: User; password: string }>) => {
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
  };

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const users = getUsers();
    const userData = users[email.toLowerCase()];

    if (!userData) {
      return { success: false, error: "No account found with this email. Please sign up first." };
    }

    if (userData.password !== password) {
      return { success: false, error: "Incorrect password. Please try again." };
    }

    setUser(userData.user);
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(userData.user));
    return { success: true };
  };

  const signup = async (data: { name: string; email: string; phone: string; password: string }): Promise<{ success: boolean; error?: string }> => {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const users = getUsers();
    const emailLower = data.email.toLowerCase();

    if (users[emailLower]) {
      return { success: false, error: "An account with this email already exists. Please login instead." };
    }

    const newUser: User = {
      id: crypto.randomUUID(),
      email: emailLower,
      name: data.name,
      phone: data.phone,
      createdAt: new Date().toISOString(),
    };

    users[emailLower] = { user: newUser, password: data.password };
    saveUsers(users);

    setUser(newUser);
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(newUser));
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(CURRENT_USER_KEY);
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

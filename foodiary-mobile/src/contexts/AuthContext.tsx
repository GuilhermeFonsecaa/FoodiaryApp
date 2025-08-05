import { createContext } from "react";

interface AuthContextProps {
  isLoggedIn: boolean;
  isLoading: boolean;
}

export const AuthContext = createContext({} as AuthContextProps);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  return (
    <AuthContext.Provider value={{ isLoggedIn: true, isLoading: false }}>
      {children}
    </AuthContext.Provider>
  );
}

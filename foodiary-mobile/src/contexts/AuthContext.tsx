import { useMutation } from "@tanstack/react-query";
import { createContext, useCallback } from "react";
import { httpClient } from "../services/httpClient";

type SignInParams = {
  email: string;
  password: string;
};

type SignUpParams = {
  goal: string;
  gender: string;
  birthDate: string;
  activityLevel: number;
  height: number;
  weight: number;
  account: {
    name: string;
    email: string;
    password: string;
  };
};

interface AuthContextProps {
  isLoggedIn: boolean;
  isLoading: boolean;
  signIn(params: SignInParams): Promise<void>;
  signUp(params: SignUpParams): Promise<void>;
}

export const AuthContext = createContext({} as AuthContextProps);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { mutateAsync: signIn } = useMutation({
    mutationFn: async (params: SignInParams) => {
      const { data } = await httpClient.post("/signin", params);
      console.log(data)
    },
  });

  const { mutateAsync: signUp } = useMutation({
    mutationFn: async (params: SignUpParams) => {
       const { data } = await httpClient.post("/signup", params);
       console.log(data)
    },
  });

  return (
    <AuthContext.Provider
      value={{ isLoggedIn: false, isLoading: false, signIn, signUp }}
    >
      {children}
    </AuthContext.Provider>
  );
}

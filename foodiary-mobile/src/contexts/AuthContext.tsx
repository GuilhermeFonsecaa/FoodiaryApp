import { useMutation, useQuery } from "@tanstack/react-query";
import { createContext, useCallback, useEffect, useState } from "react";
import { httpClient } from "../services/httpClient";
import AsyncStorage from "@react-native-async-storage/async-storage";

type SignInParams = {
  email: string;
  password: string;
};

type User = {
  name: string;
  id: string;
  email: string;
  calories: number;
  proteins: number;
  carbohydrates: number;
  fats: number;
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
  signOut(): Promise<void>;
  user: User | null;
}

export const AuthContext = createContext({} as AuthContextProps);

const TOKEN_STORAGE_KEY = "@foodiary::token";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [isLoadingToken, setIsLoadingToken] = useState(true);

  useEffect(() => {
    async function load() {
      const data = await AsyncStorage.getItem(TOKEN_STORAGE_KEY);
      setToken(data);
      setIsLoadingToken(false);
    }
    load();
  }, []);

  useEffect(() => {
    async function run() {
      if (!token) {
        httpClient.defaults.headers.common["Authorization"] = null;
        return;
      }

      httpClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      await AsyncStorage.setItem(TOKEN_STORAGE_KEY, token);
    }
    run();
  }, [token]);

  const { mutateAsync: signIn } = useMutation({
    mutationFn: async (params: SignInParams) => {
      const { data } = await httpClient.post("/signin", params);
      setToken(data.accessToken);
    },
  });

  const { mutateAsync: signUp } = useMutation({
    mutationFn: async (params: SignUpParams) => {
      const { data } = await httpClient.post("/signup", params);
      setToken(data.accessToken);
    },
  });

  const { data: user, isFetching } = useQuery({
    queryKey: ["user"],
    enabled: !!token,
    queryFn: async () => {
      const { data } = await httpClient.get<{ user: User }>("/me");
      const { user } = data;

      return user;
    },
  });

  const signOut = useCallback(async () => {
    setToken(null);
    await AsyncStorage.removeItem(TOKEN_STORAGE_KEY);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!user,
        isLoading: isLoadingToken || isFetching,
        signIn,
        signUp,
        signOut,
        user: user ?? null,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

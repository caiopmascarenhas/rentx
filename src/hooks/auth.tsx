import React, { createContext, ReactNode, useContext, useState } from "react";
import api from "../services/api";

interface User {
  id: string;
  email: string;
  name: string;
  driver_license: string;
  avatar: string;
}

interface AuthState {
  token: string;
  user: User;
}

interface SiignInCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  user: User;
  signIn: (credentials: SiignInCredentials) => Promise<void>;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

function AuthProvider({ children }: AuthProviderProps) {
  const [data, setData] = useState<AuthState>({} as AuthState);
  async function signIn({ email, password }: SiignInCredentials) {
    const response = await api.post("/sessions", {
      email,
      password,
    });

    const { token, user } = response.data as AuthState;
    api.defaults.headers.authorization = `Bearer ${token}`;
    setData({ token, user });
  }
  return (
    <AuthContext.Provider value={{ user: data.user, signIn }}>
      {children}
    </AuthContext.Provider>
  );
}

function userAuth(): AuthContextData {
  const context = useContext(AuthContext);
  return context;
}

export { AuthProvider, userAuth };

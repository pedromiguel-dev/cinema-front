import React from "react";
import { createContext } from "react";

interface role {
  id: number;
  role: string;
}

export interface user {
  id?: string;
  name?: string;
  email: string;
  accessToken: string;
  password: string;
  roles: role[];
}

interface d {
  user: user;
}

interface UserContextData {
  auth?: Partial<d>;
  setAuth?: (value: React.SetStateAction<Partial<d> | undefined>) => void;
}
const AuthContext = createContext<UserContextData>({});

export const AuthProvider = ({ children }: React.PropsWithChildren) => {
  const [auth, setAuth] = React.useState<Partial<d>>();

  return <AuthContext.Provider value={{ auth, setAuth }}>{children}</AuthContext.Provider>;
};

export default AuthContext;

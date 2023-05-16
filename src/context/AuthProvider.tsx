import React from "react";
import { createContext } from "react";

interface role {
  id: number;
  role: string;
}

export interface user {
  accessToken: string;
  roles: role[];
}

interface d {
  user: user | undefined;
}

interface UserContextData {
  auth?: d;
  setAuth?: (value: React.SetStateAction<d | undefined>) => void;
}
const AuthContext = createContext<UserContextData>({});

export const AuthProvider = ({ children }: React.PropsWithChildren) => {
  const [auth, setAuth] = React.useState<d>();

  return <AuthContext.Provider value={{ auth, setAuth }}>{children}</AuthContext.Provider>;
};

export default AuthContext;

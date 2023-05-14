import React from "react";
import { createContext } from "react";

interface role {
  id: number;
  role: string;
}

interface user {
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
  setAuth?: (e: d) => void;
}
const AuthContext = createContext<UserContextData>({});

export const AuthProvider = ({ children }: React.PropsWithChildren) => {
  const [auth, setAuthe] = React.useState<Partial<d>>();

  const setAuth = (e: d) => {
    setAuthe(e);
  };

  return <AuthContext.Provider value={{ auth, setAuth }}>{children}</AuthContext.Provider>;
};

export default AuthContext;

import type { User } from "@/api/profile/types";
import { createContext, useContext } from "react";


interface AuthContextProps {
  me: User | null;
}

export const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

export const useAuth = () => useContext(AuthContext);


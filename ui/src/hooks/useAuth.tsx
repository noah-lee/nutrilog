import { createContext, useContext } from "react";


interface AuthContextProps {
  signedIn: boolean;
}

export const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

export const useAuth = () => useContext(AuthContext);


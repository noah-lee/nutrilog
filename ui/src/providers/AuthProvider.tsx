import { useGetAuthStatus } from "@/api/auth/hooks";
import { AuthContext } from "@/hooks/useAuth";
import { type ReactNode } from "react";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { data: status } = useGetAuthStatus();

  return (
    <AuthContext.Provider value={{ signedIn: !!status?.signedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

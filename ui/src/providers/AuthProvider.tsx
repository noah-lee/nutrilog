import { useGetAuthStatus } from "@/api/auth/hooks";
import { AuthContext } from "@/hooks/useAuth";
import { type ReactNode } from "react";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { data: me } = useGetAuthStatus();

  return (
    <AuthContext.Provider value={{ me: me ?? null }}>
      {children}
    </AuthContext.Provider>
  );
};

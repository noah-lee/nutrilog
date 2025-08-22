import { useGetMe } from "@/api/profile/hooks";
import { AuthContext } from "@/hooks/useAuth";
import { type ReactNode } from "react";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { data: me, isLoading } = useGetMe();

  return (
    <AuthContext.Provider value={{ me: me ?? null, loading: isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

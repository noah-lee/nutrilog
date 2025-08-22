import { api } from "@/api/axios";
import Input from "@/app/_components/Input";
import LogList from "@/app/_components/LogList";
import SummaryCard from "@/app/_components/SummaryCard";
import { Button } from "@/components/Button";
import { useAuth } from "@/hooks/useAuth";
import { useTheme } from "@/hooks/useTheme";
import {
  HeartHandshakeIcon,
  LoaderCircleIcon,
  MoonIcon,
  SunIcon,
} from "lucide-react";

const App = () => {
  const { theme, onThemeChange } = useTheme();
  const { me, loading } = useAuth();

  const handleSignOut = async () => {
    try {
      await api("/auth/signout", { method: "POST" });
      window.location.reload();
    } catch (error) {
      console.error("Failed to sign out", error);
    }
  };

  const handleSignIn = async () => {
    window.location.href = `${import.meta.env.VITE_API_BASE_URL}/auth/google`;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <LoaderCircleIcon size={64} className="animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-svh max-w-vw flex flex-col antialiased">
      <header className="container py-4 flex justify-between items-center gap-4">
        <div className="flex gap-2 items-center ">
          <HeartHandshakeIcon />
          <h1 className="text-2xl font-bold">Nutrilog</h1>
        </div>
        <div className="flex gap-2 items-center ">
          {me && (
            <Button variant="outline" onClick={handleSignOut}>
              Sign out
            </Button>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onThemeChange(theme === "dark" ? "light" : "dark")}
          >
            {theme === "dark" ? <SunIcon /> : <MoonIcon />}
          </Button>
        </div>
      </header>
      <main className="container flex-1 flex flex-col items-center gap-4">
        {me ? (
          <>
            <div className="w-full flex gap-4 flex-wrap">
              <SummaryCard />
              <Input />
            </div>
            <LogList />
          </>
        ) : (
          <div className="flex-1 flex justify-center items-center">
            <Button onClick={handleSignIn}>Sign in</Button>
          </div>
        )}
      </main>
      <footer className="container h-8"></footer>
    </div>
  );
};

export default App;

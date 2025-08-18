import { type ReactNode, useEffect, useState } from "react";
import { ThemeContext, type Theme } from "@/hooks/useTheme";

const THEME_LOCAL_STORAGE_KEY = "theme";

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem(THEME_LOCAL_STORAGE_KEY) as Theme) || "dark"
  );

  const handleThemeChange = (theme: Theme) => {
    localStorage.setItem(THEME_LOCAL_STORAGE_KEY, theme);
    setTheme(theme);
  };

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, onThemeChange: handleThemeChange }}>
      {children}
    </ThemeContext.Provider>
  );
};

import { createContext, useContext } from "react";

export type Theme = "dark" | "light";

interface ThemeContextProps {
  theme: Theme;
  onThemeChange: (theme: Theme) => void;
}

export const ThemeContext = createContext<ThemeContextProps>({} as ThemeContextProps);

export const useTheme = () => useContext(ThemeContext);


//themaContext

import { createContext, useContext, useState } from "react";

type ThemeContextType = {
  dark: boolean;
  toggleTheme: () => void;
  fontScale: number;
  increaseFontScale: () => void;
  decreaseFontScale: () => void;
};

export const ThemeContext = createContext<ThemeContextType>({
  dark: true,
  toggleTheme: () => {},
  fontScale: 1.0,
  increaseFontScale: () => {},
  decreaseFontScale: () => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [dark, setDark] = useState(true);
  const [fontScale, setFontScale] = useState(1.0);

  const toggleTheme = () =>  {console.log("toggleTheme chamado"); setDark((prev) => !prev)};

  const increaseFontScale = () =>
    {console.log("increaseFontScale chamado"); setFontScale((prev) => parseFloat(Math.min(prev + 0.2, 1.6).toFixed(1)))};

  const decreaseFontScale = () =>
    {console.log("increaseFontScale chamado");setFontScale((prev) => parseFloat(Math.max(prev - 0.2, 0.8).toFixed(1)))};

  return (
    <ThemeContext.Provider value={{ dark, toggleTheme, fontScale, increaseFontScale, decreaseFontScale }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
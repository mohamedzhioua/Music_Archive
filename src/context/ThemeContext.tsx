"use client";

import { getDesignTokens } from "@/theme";
import { Theme, ThemeOptions, createTheme } from "@mui/material/styles";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

type Mode = "light" | "dark";

type ThemeContextProviderProps = {
  children: React.ReactNode;
};

type ThemeContextType = {
  mode: Mode;
  toggleTheme: () => void;
  theme: Theme;
};

const ThemeContext = createContext<ThemeContextType | null>(null);

export default function ThemeContextProvider({
  children,
}: ThemeContextProviderProps) {
  const [mode, setMode] = useState<Mode>("light");

  const toggleTheme = () => {
    if (mode === "light") {
      setMode("dark");
      window.localStorage.setItem("mode", "dark");
    } else {
      setMode("light");
      window.localStorage.setItem("mode", "light");
    }
  };
  useEffect(() => {
    // Load mode from local storage
    const localTheme = window.localStorage.getItem("mode") as Mode | null;

    if (localTheme) {
      setMode(localTheme);
      if (localTheme === "dark") {
      }
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setMode("dark");
    }
  }, []);



  const themeOptions: ThemeOptions = useMemo(
    () => createTheme(getDesignTokens(mode) as ThemeOptions),
    [mode]
  );
  const theme = createTheme(themeOptions);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme,
        mode,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (context === null) {
    throw new Error("useTheme must be used within a ThemeContextProvider");
  }

  return context;
}

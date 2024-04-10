"use client";

import { useTheme } from "@/context/ThemeContext";
import { IconButton } from "@mui/material";
import MoonIcon from "@/icons/moon-icon";
import SunIcon from "@/icons/sun-icon";
export default function ThemeSwitch() {
  const { mode, toggleTheme } = useTheme();

  return (
    <>
      <IconButton
        sx={{
          ml: 1,
          color: mode === "light" ? "warning.main" : "primary.light",
        }}
        onClick={() => {
          toggleTheme();
        }}
        aria-label="theme Switcher"
      >
        {mode === "light" ? (
          <SunIcon aria-label="light mode icon" />
        ) : (
          <MoonIcon aria-label="dark mode icon" />
        )}
      </IconButton>
    </>
  );
}

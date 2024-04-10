"use client";

import { useTheme } from "@/context/ThemeContext";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import NextAppDirEmotionCacheProvider from './EmotionCache';
 
export default function ThemeRegistry({
  children,
}: {
  children: React.ReactNode;
}) {
  const  {theme}  = useTheme();
   return (
    <NextAppDirEmotionCacheProvider options={{ key: "mui" }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </NextAppDirEmotionCacheProvider>
  );
}

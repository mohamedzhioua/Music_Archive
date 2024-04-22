import type { Metadata } from "next";
import "./globals.css";
import ThemeRegistry from "@/theme/ThemeRegistry";
import ThemeContextProvider from "@/context/ThemeContext";
import { Toaster } from "react-hot-toast";
import Nav from "@/components/nav";

export const metadata: Metadata = {
  title: "Archive Musicale de la Télévision Tunisienne",
  description: "Une archive de musique de la télévision tunisienne.",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ThemeContextProvider>
          <ThemeRegistry>
            <Toaster/>
            <Nav/>
            {children}
          </ThemeRegistry>
        </ThemeContextProvider>
      </body>
    </html>
  );
}

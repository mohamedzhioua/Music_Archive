import { AppBar,Toolbar } from "@mui/material";
import Image from "next/image";
import ThemeSwitch from "./theme-switch";
import { cookies } from "next/headers";
import { LogoutBtn } from "./auth/LogoutBtn";
  
export default function Nav() {

  const isLoggedIn = cookies().get("Authorization");
  if (!isLoggedIn) {
    return null;
  }
  return (
    <AppBar position="static" style={{ marginBottom: "1.8rem" }}>
      <Toolbar style={{ justifyContent: "space-between" }}>
        <LogoutBtn/>
        <div style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
          <ThemeSwitch />
          <Image src="/tv.png" alt="TV Logo" height={50} width={50} />
        </div>
      </Toolbar>
    </AppBar>
  );
}

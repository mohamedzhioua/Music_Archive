"use client";
import { logout } from "@/app/login/loginAction";
import CustomButton from "./custom-button";
import { useRouter } from "next/navigation";

export const LogoutBtn = () => {
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return <CustomButton onClick={handleLogout}>Logout</CustomButton>;
};

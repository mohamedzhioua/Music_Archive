"use client";
import { logout } from "@/lib/actions/loginAction";
import CustomButton from "../shared/custom-button";
import { useRouter } from "next/navigation";

export const LogoutBtn = () => {
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return <CustomButton onClick={handleLogout}>Logout</CustomButton>;
};

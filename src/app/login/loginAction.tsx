"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function loginAction(
  currentState: any,
  formData: FormData
): Promise<string> {
  // Get the data off the form
  const name = formData.get("name");
  const password = formData.get("password");

  //  Send to our api route
  const res = await fetch(process.env.API_URL + "/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, password }),
  });

  const json = await res.json();
  // Redirect to login if success
  if (res.ok) {
    cookies().set("Authorization", json.token, {
      secure: true,
      httpOnly: true,
      expires: Date.now() + 24 * 60 * 60 * 1000 * 3,
      path: "/",
      sameSite: "strict",
    });
    redirect("/singers");
  } else {
    return json.error;
  }
}

export const logout =  () => {
  cookies().delete("Authorization") 
  revalidatePath("/");
  };

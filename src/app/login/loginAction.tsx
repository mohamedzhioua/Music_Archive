"use server";

import dbConnect from "@/lib/dbConnect";
 import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";
import * as jose from "jose";
import UserModel from "@/lib/models/UserModel";

interface LoginResult {
  token?: string;
  error?: string;
}
export default async function loginAction(
  prevState: {error:null|string},
  formData: FormData
): Promise<LoginResult> {
 
  // Get the data off the form
const name = formData.get("name") as string;
const password = formData.get("password") as string;


  // Validate the input
  if (!name || !password) {
    return { error: 'Missing name or password' };
  }

  // Connect to the database
  await dbConnect();

  // Lookup the user
  const user = await UserModel.findOne({ name: name });
 
  // If user not found, return error
  if (!user) {
    return { error: 'Invalid name or password' };
  }

  // Compare password
  const isCorrectPassword = bcrypt.compareSync(password, user.password);

  // If password is incorrect, return error
  if (!isCorrectPassword) {
    return { error: 'Invalid name or password' };
  }

  // If user is not admin, return error
  if (!user.isAdmin) {
    return { error: 'Vous devez être administrateur pour avoir accès.' };
  }

// Create jwt token
const secret = new TextEncoder().encode(process.env.JWT_SECRET);
const alg = "HS256";

const jwt = await new jose.SignJWT({})
  .setProtectedHeader({ alg })
  .setExpirationTime("72h")
  .setSubject(user._id.toString())
  .sign(secret);


   // Redirect to login if success
     cookies().set("Authorization", jwt, {
      secure: true,
      httpOnly: true,
      expires: Date.now() + 24 * 60 * 60 * 1000 * 3,
      path: "/",
      sameSite: "strict",
    });
    redirect("/singers");
   }
 

export const logout =  () => {
  cookies().delete("Authorization") 
  revalidatePath("/");
  };

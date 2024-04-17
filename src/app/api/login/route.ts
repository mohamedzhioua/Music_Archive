import dbConnect from "@/lib/dbConnect";
import UserModel from "@/lib/models/UserModel";
import bcrypt from "bcryptjs";
import * as jose from "jose";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
    await dbConnect();

  // Read data off req body
  const body = await req.json();
  const { name, password } = body;

  // Validate data
  if (!name || !password) {
    return Response.json(
      {
        error: "Invalid name or password",
      },
      { status: 400 }
    );
  }

  // Lookup the user
  const user = await UserModel.findOne({ name: name });

  if (!user) {
    return Response.json(
      {
        error: "Invalid name or password",
      },
      { status: 400 }
    );
  }

  // Compare password
  const isCorrectPassword = bcrypt.compareSync(password, user.password);

  if (!isCorrectPassword) {
    return Response.json(
      {
        error: "Invalid name or password",
      },
      { status: 400 }
    );
  }
  if (!user.isAdmin) {
    return Response.json(
      {
        error: "Vous devez être administrateur pour avoir accès.",
      },
      { status: 400 }
    );
  }

  // Create jwt token
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);
  const alg = "HS256";

  const jwt = await new jose.SignJWT({})
    .setProtectedHeader({ alg })
    .setExpirationTime("72h")
    .setSubject(user._id.toString())
    .sign(secret);

  // Respond with it
  return Response.json({ token: jwt });
}

export async function GET(req: NextRequest) {
  await dbConnect();

  // Read data off req body
  const body = await req.json();
  const { name, password } = body;

  // Validate data
  if (!name || !password) {
    return Response.json(
      {
        error: "Invalid name or password",
      },
      { status: 400 }
    );
  }

  // Hash the password
  const hash = bcrypt.hashSync(password, 8);

  // Create a user in db
  await UserModel.create({
    name,
    password: hash,
    isAdmin: true,
  });

  // return something
  return Response.json({});
}

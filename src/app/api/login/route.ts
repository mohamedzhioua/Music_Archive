// import dbConnect from "@/lib/dbConnect";
// import UserModel from "@/lib/models/UserModel";
// import bcrypt from "bcryptjs";
//  import { NextRequest } from "next/server";

 

// export async function GET(req: NextRequest) {
//   await dbConnect();

//   // Read data off req body
//   const body = await req.json();
//   const { name, password } = body;

//   // Validate data
//   if (!name || !password) {
//     return Response.json(
//       {
//         error: "Invalid name or password",
//       },
//       { status: 400 }
//     );
//   }

//   // Hash the password
//   const hash = bcrypt.hashSync(password, 8);

//   // Create a user in db
//   await UserModel.create({
//     name,
//     password: hash,
//     isAdmin: true,
//   });

//   // return something
//   return Response.json({});
// }
 
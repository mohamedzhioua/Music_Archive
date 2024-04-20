import mongoose from "mongoose";

export type User = {
  name: string;
  password: string;
  isAdmin:boolean
 };

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
     },
     isAdmin: {
      type:Boolean,
      required:true
     },
  },
  {
    timestamps: true,
  }
);
const UserModel =
  mongoose.models.User || mongoose.model("User", userSchema);

export default UserModel;

import mongoose from "mongoose";

export type User = {
  name: string;
  password: string;
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
  },
  {
    timestamps: true,
  }
);
const UserModel =
  mongoose.models.User || mongoose.model("Singer", userSchema);

export default UserModel;

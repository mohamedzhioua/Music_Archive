import mongoose from "mongoose";

export type Singer = {
  stockReference: string;
  name: string;
  country: string;
  songs: mongoose.Schema.Types.ObjectId[];
};

const singerSchema = new mongoose.Schema(
  {
    stockReference: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
      uppercase: true,
    },
    songs: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Song", required: true },
    ],
  },
  {
    timestamps: true,
  }
);
const SingerModel =
  mongoose.models.Singer || mongoose.model("Singer", singerSchema);

export default SingerModel;

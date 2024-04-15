import mongoose from "mongoose";

export type Song = {
  name: string;
  releaseDate: Date;
  duration: number;
  cassetteNumber: number;
};

const songSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    releaseDate: {
      type: Date,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    cassetteNumber: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
const SongModel = mongoose.models.Song || mongoose.model("Song", songSchema);

export default SongModel;

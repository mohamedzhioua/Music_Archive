import mongoose from "mongoose";

export type Song = {
  name: string;
  releaseDate: Date;
  duration: number;
  cassetteNumber: string;
};

const songSchema = new mongoose.Schema(
  {
    singer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Singer",
      required: true,
    },
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
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
const SongModel = mongoose.models.Song || mongoose.model("Song", songSchema);

export default SongModel;

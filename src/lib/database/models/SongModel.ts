import mongoose from "mongoose";

export type Song = {
  songName: string;
  releaseDate: Date;
  duration: string;
  cassetteNumber: string;
  lecture: {
    in: string;
    out: string;
  };
};

const songSchema = new mongoose.Schema(
  {
    songName: {
      type: String,
      required: true,
    },
    releaseDate: {
      type: Date,
      required: true,
    },
    duration: {
      type: String,
      required: true,
    },
    cassetteNumber: {
      type: String,
      required: true,
    },
    lecture: {
      in: {
        type: String,
        required: true,
      },
      out: {
        type: String,
        required: true,
      },
    },
  },
  {
    timestamps: true,
  }
);

const SongModel = mongoose.models.Song || mongoose.model("Song", songSchema);

export default SongModel;

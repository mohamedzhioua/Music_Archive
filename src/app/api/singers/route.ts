import { NextRequest } from "next/server";
import SingerModel from "@/lib/database/models/SingerModel";
import SongModel, { Song } from "@/lib/database/models/SongModel";
import { createSongs } from "@/lib/utils/creatSongs";
import { connectToDatabase } from "@/lib/database";

export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();

    const body = await req.json();

    const { stockReference, name, country, songs } = body;

    // Check if the request body is empty
    if (!stockReference || !name || !country || !songs || songs.length === 0) {
      return Response.json(
        { message: "Please provide all required fields." },
        { status: 400 }
      );
    }

    // Check if the songs array is empty or if any song object is incomplete
    if (
      songs.some(
        (song: Song) =>
          !song.songName ||
          !song.releaseDate ||
          !song.duration ||
          !song.cassetteNumber ||
          !song.lecture.in ||
          !song.lecture.out
      )
    ) {
      return Response.json(
        { message: "Please provide all required fields for songs." },
        { status: 400 }
      );
    }

    // Check if the name already exists
    const existingSinger = await SingerModel.findOne({ name });
    if (existingSinger) {
      return Response.json(
        { message: "Singer already exists." },
        { status: 400 }
      );
    }

    // Create new songs and collect their IDs
    const songIds = await createSongs(songs);

    const newSinger = await SingerModel.create({
      stockReference,
      name,
      country,
      songs: songIds,
    });

    return Response.json(
      { message: "Singer created successfully", newSinger },
      {
        status: 201,
      }
    );
  } catch (error: any) {
    return Response.json({ Error: error.message }, { status: 500 });
  }
}

export async function GET() {
  await connectToDatabase();
  const singers = await SingerModel.find().populate("songs");
  return Response.json(singers);
}
export async function DELETE(req: NextRequest) {
  try {
    await connectToDatabase();

    // Get the singer ID from the request body or query parameters
    const url = new URL(req.url);
    const _id = url.searchParams.get("id");

    // Check if singerId is provided
    if (!_id) {
      return Response.json(
        { message: "Please provide singerId" },
        { status: 400 }
      );
    }

    // Find the singer by ID
    const singer = await SingerModel.findById(_id);

    if (!singer) {
      return Response.json({ message: "Singer not found" }, { status: 404 });
    }

    // Delete the singer
    await SingerModel.findByIdAndDelete(_id);

    // Find and delete all songs associated with the singer
    await SongModel.deleteMany({ _id: { $in: singer.songs } });

    return Response.json({
      message: "Singer and associated songs deleted successfully",
    });
  } catch (error: any) {
    return Response.json({ Error: error.message }, { status: 500 });
  }
}

import { NextRequest } from "next/server";
import dbConnect from "@/lib/dbConnect";
import SingerModel from "@/lib/models/SingerModel";
import SongModel, { Song } from "@/lib/models/SongModel";

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
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
  if (songs.some((song: Song)=> !song.songName! || !song.releaseDate || !song.duration || !song.cassetteNumber)) {
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
   const songIds: string[] = [];
   for (const songData of songs) {
     const { songName, releaseDate, duration, cassetteNumber } = songData;
     const newSong = await SongModel.create({
       songName,
       releaseDate,
       duration,
       cassetteNumber,
     });
     songIds.push(newSong._id);
   }

    const newSinger = await SingerModel.create({
      stockReference,
      name,
      country,
      songs:songIds,
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
    await dbConnect()
    const singers = await SingerModel.find().populate("songs");
     return Response.json(singers)
  }
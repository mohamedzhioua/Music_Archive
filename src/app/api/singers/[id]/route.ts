import {  NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import SingerModel from "@/lib/models/SingerModel";
import SongModel from "@/lib/models/SongModel";
import { createSongs } from "@/lib/utils/creatSongs";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;
  await dbConnect();

  // Check if the singer ID is provided
  if (!id) {
    return NextResponse.json({ error: "Invalid singer ID" }, { status: 400 });
  }

  try {
    const singer = await SingerModel.findById(id)
      .select('_id stockReference name country')
      .populate({
        path: 'songs',
        select: '_id songName releaseDate duration cassetteNumber lecture.in lecture.out'
      });

    if (!singer) {
      return NextResponse.json({ error: 'Singer not found' }, { status: 404 });
    }

    return NextResponse.json(singer);
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    // Parse the request body
    const body = await req.json();
    const { stockReference, name, country, songs } = body;

    // Check if the provided ID is valid
    if (!id) {
      return NextResponse.json({ message: "Invalid singer ID" }, { status: 400 });
    }

    // Find the singer by ID
    const singer = await SingerModel.findById(id);
    if (!singer) {
      return NextResponse.json({ message: "Singer not found" }, { status: 404 });
    }

    // Update singer information
    singer.stockReference = stockReference;
    singer.name = name;
    singer.country = country;

    // Delete existing songs from the database
    await SongModel.deleteMany({ _id: { $in: singer.songs } });

    // Clear existing songs array
    singer.songs = [];

    // Create and add new songs
    const newSongIds = await createSongs(songs);
    singer.songs = newSongIds;

    // Save the updated singer
    await singer.save();

    return NextResponse.json({ message: "Singer updated successfully", singer });
  } catch (error) {
    return NextResponse.json({ message: "Error editing singer" }, { status: 500 });
  }
}

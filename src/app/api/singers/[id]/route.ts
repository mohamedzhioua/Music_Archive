import {  NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import SingerModel from "@/lib/models/SingerModel";
import SongModel from "@/lib/models/SongModel";

export async function GET(req:NextRequest,
   { params }: { params: { id: string } }
) {
  const { id } = params;
   await dbConnect();
 
  if (id) {
    const singer = await SingerModel.findById(id).select('_id stockReference name country').populate({
      path: 'songs',
      select: '_id songName releaseDate duration cassetteNumber'  
    });
    
    if (!singer) {
      return NextResponse.json({ error: 'Singer not found' }, { status: 404 });
    }
    return NextResponse.json(singer)
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
      for (const songData of songs) {
        const { songName, releaseDate, duration, cassetteNumber } = songData;
        const newSong = await SongModel.create({
          songName,
          releaseDate,
          duration,
          cassetteNumber,
        });
        singer.songs.push(newSong._id);
      }


    // Save the updated singer
    await singer.save();

    return NextResponse.json({ message: "Singer updated successfully", singer });
  } catch (error) {
    return NextResponse.json({ message: "Error editing singer" }, { status: 500 });
  }
}

 

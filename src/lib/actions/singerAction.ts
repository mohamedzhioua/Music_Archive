"use server";

import { connectToDatabase } from "@/lib/database";
import SingerModel, { Singer } from "@/lib/database/models/SingerModel";
interface SingerResult {
  singer?: Singer;
  error?: string;
}
export async function getSingerAction(id: string): Promise<SingerResult> {
  // Connect to the database
  await connectToDatabase();  


  // Check if the singer ID is provided
  if (!id) {
    return { error: "Invalid singer ID" };
  }

  try {
    // Find the singer by ID and populate related songs
    const singer = (await SingerModel.findById(id)
      .select("_id stockReference name country")
      .populate({
        path: "songs",
        select:
          "_id songName releaseDate duration cassetteNumber lecture.in lecture.out",
      })) as Singer;

    // If singer is not found, return error
    if (!singer) {
      return { error: "Singer not found" };
    }

    // Return the singer object
    return { singer };
  } catch (error) {
    // Handle any unexpected errors
    return { error: "An error occurred while fetching singer information" };
  }
}

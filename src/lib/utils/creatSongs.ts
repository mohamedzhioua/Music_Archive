import SongModel from "../database/models/SongModel";

export async function createSongs(songs: any[]): Promise<string[]> {
  const songIds: string[] = [];
  for (const songData of songs) {
    const { songName, releaseDate, duration, cassetteNumber, lecture } =
      songData;
    // Parse releaseDate string into year, month, and day components
    const year = parseInt(releaseDate.substring(0, 4), 10);
    const month = parseInt(releaseDate.substring(4, 6), 10) - 1; // Month is zero-based
    const day = parseInt(releaseDate.substring(6, 8), 10);

    // Create Date object
    const releaseDateObj = new Date(year, month, day);
    const newSong = await SongModel.create({
      songName,
      releaseDate: releaseDateObj,
      duration,
      cassetteNumber,
      lecture,
    });
    songIds.push(newSong._id);
  }
  return songIds;
}

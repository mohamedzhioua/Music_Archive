import SongModel from "../models/SongModel";

export async function createSongs(songs: any[]): Promise<string[]> {
    const songIds: string[] = [];
    for (const songData of songs) {
      const { songName, releaseDate, duration, cassetteNumber, lecture } = songData;
      const newSong = await SongModel.create({
        songName,
        releaseDate,
        duration,
        cassetteNumber,
        lecture,
      });
      songIds.push(newSong._id);
    }
    return songIds;
  }
  
export const formatDuration = (durationInSeconds: number) => {
  const hours: number = Math.floor(durationInSeconds / 3600);
  const minutes: number = Math.floor((durationInSeconds % 3600) / 60);
  const seconds: number = durationInSeconds % 60;

  const formattedHours: string = hours.toString().padStart(2, "0");
  const formattedMinutes: string = minutes.toString().padStart(2, "0");
  const formattedSeconds: string = seconds.toString().padStart(2, "0");

  return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
};

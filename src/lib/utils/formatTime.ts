
export const formatTime=(input: string)=>{
  const hours = parseInt(input.substring(0, 2));
  const minutes = parseInt(input.substring(2, 4));
  const seconds = parseInt(input.substring(4, 6));

  // Format the time string as hh:mm:ss
  const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

  return formattedTime;
}
export const getSinger = async (id: string) => {
    try {
      const res = await fetch(process.env.API_URL + `/api/singers/${id}`, {
        cache: "no-store",
      });
  
      if (!res.ok) {
        throw new Error("Failed to fetch topic");
      }
  
      const data = res.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  };
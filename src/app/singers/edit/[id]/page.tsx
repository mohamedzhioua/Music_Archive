import AddSingerForm from "@/components/singers/AddSingerForm";
import { Box, Container, Divider, Stack, Typography } from "@mui/material";

export const getSinger = async (id: string) => {
  try {
    const res = await fetch(`http://localhost:3000/api/singers/${id}`, {
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
export default async function Editpage({ params }: { params: { id: string } }) {
  const singer = await getSinger(params.id);
 
  return (
    <>
      <Container maxWidth="xl">
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginLeft: "1rem",
            marginRight: "1rem",
          }}
        >
          <Stack spacing={1}>
            <Typography
              variant={"h1"}
              sx={{ fontWeight: "bold", letterSpacing: "0.15px !important" }}
            >
              {"Modifier les informations du chanteur"}
            </Typography>
          </Stack>
        </Box>
        <Divider
          sx={{
            marginY: 2,
            marginLeft: "1rem",
            marginRight: "1rem",
          }}
        />
        {singer ? (
          <AddSingerForm initialData={singer} />
        ) : (
          <Typography variant={"h2"}>Invalide Chanteur!</Typography>
        )}
      </Container>
    </>
  );
}

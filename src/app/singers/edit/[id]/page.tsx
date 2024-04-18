import AddSingerForm from "@/components/singers/AddSingerForm";
import { getSinger } from "@/lib/utils/getSinger";
import { Box, Container, Divider, Stack, Typography } from "@mui/material";

 
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

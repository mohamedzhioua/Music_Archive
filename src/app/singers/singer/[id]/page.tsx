import { Container,  Typography } from "@mui/material";
import { getSinger } from "../../edit/[id]/page";
import SingerInfo from "@/components/singers/Singer";

export default async function Editpage({ params }: { params: { id: string } }) {
  const singer = await getSinger(params.id);

  return (
    <Container maxWidth="xl">
      {singer ? (
        <SingerInfo data={singer} />
      ) : (
        <Typography variant={"h2"}>Invalide Chanteur!</Typography>
      )}
    </Container>
  );
}

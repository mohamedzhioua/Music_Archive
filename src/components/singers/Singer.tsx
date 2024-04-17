import { Singer } from "@/lib/models/SingerModel";
import {
  Card,
  CardContent,
  Typography,
  Stack,
  Divider,
} from "@mui/material";
import Link from "next/link";

const SingerInfo = ({ data }: { data: Singer }) => {
  return (
    <Card>
      <CardContent>
        <Stack>
          <Stack
            style={{ display: "flex", flexDirection: "row", gap: "0.2rem" }}
          >
            <Link href="/singers"style={{textDecoration:"none"}}>
              <Typography
                variant="h3"
                sx={{
                  fontWeight: "bold",
                  color: "text.secondary",
                  ":hover": {
                    color: "primary.main",
                    textDecoration: "underline",
                  },
                }}
              >
                {`chanteurs /`}
              </Typography>
            </Link>
            <Typography variant="h3" sx={{ fontWeight: "bold" }}>
              chanteur
            </Typography>
          </Stack>
          <Stack style={{ marginTop: "1rem", gap: "0.8rem" }}>
            <Stack
              style={{ display: "flex", flexDirection: "row", gap: "0.5rem" }}
            >
              <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                - Référence du stock :
              </Typography>
              <Typography variant="h6">{data.stockReference}</Typography>
            </Stack>
            <Stack
              style={{ display: "flex", flexDirection: "row", gap: "0.5rem" }}
            >
              <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                - Nom du chanteur :
              </Typography>
              <Typography variant="h6">{data.name}</Typography>
            </Stack>
            <Stack
              style={{ display: "flex", flexDirection: "row", gap: "0.5rem" }}
            >
              <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                - Pays :
              </Typography>
              <Typography variant="h6">{data.country}</Typography>
            </Stack>
          </Stack>

          <Stack
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              borderRadius: "8px",
              marginTop: "1rem",
            }}
          >
            <Typography
              variant="h5"
              sx={{ fontWeight: "bold", marginLeft: "1rem", marginTop: "1rem" }}
            >
              Chansons du chanteur
            </Typography>
            {data?.songs?.map((song: any, index: any) => (
              <Stack key={index} style={{ marginTop: "1rem", gap: "1rem" }}>
                {index !== 0 && <Divider />}
                <u>
                  {" "}
                  <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                    {`${
                      index === 0
                        ? "Première chanson"
                        : index === 1
                        ? "Deuxième chanson"
                        : index === 2
                        ? "Troisième chanson"
                        : `${index + 1}ème chanson`
                    }`}
                  </Typography>
                </u>
                <Stack
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: "0.5rem",
                  }}
                >
                  <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    - Nom de la chanson:
                  </Typography>
                  <Typography variant="h6">{song.songName}</Typography>
                </Stack>
                <Stack
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: "0.5rem",
                  }}
                >
                  <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    - Date de sortie:
                  </Typography>
                  <Typography variant="h6">
                    {new Date(song.releaseDate).toLocaleDateString("fr-FR")}
                  </Typography>
                </Stack>
                <Stack
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: "0.5rem",
                  }}
                >
                  <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    - Durée (en secondes):
                  </Typography>
                  <Typography variant="h6">{song.duration}</Typography>
                </Stack>
                <Stack
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: "0.5rem",
                  }}
                >
                  <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    - Numéro de cassette:
                  </Typography>
                  <Typography variant="h6">{song.cassetteNumber}</Typography>
                </Stack>
                <Stack
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: "0.5rem",
                  }}
                >
                  <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    - In (en secondes):
                  </Typography>
                  <Typography variant="h6">{song.lecture.in}</Typography>
                </Stack>
                <Stack
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: "0.5rem",
                  }}
                >
                  <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    - Out (en secondes):
                  </Typography>
                  <Typography variant="h6">{song.lecture.out}</Typography>
                </Stack>
              </Stack>
            ))}
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default SingerInfo;

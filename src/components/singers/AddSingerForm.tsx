"use client";

import {
  Autocomplete,
  Card,
  CardContent,
  TextField,
  Unstable_Grid2 as Grid,
  Typography,
} from "@mui/material";
import CustomInput from "../ui/CustomInput";
import CustomButton from "../ui/custom-button";
import { countries } from "@/lib/utils/countries";
import { useState } from "react";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import AddIcon from "@mui/icons-material/Add";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Singer } from "@/lib/models/SingerModel";

interface Song {
  songName: string;
  releaseDate: string;
  duration: string;
  cassetteNumber: string;
  lecture: {
    in: string;
    out: string;
  };
}
interface SingerFormProps {
  initialData: Singer | null;
}

const AddSingerForm: React.FC<SingerFormProps> = ({ initialData }) => {
  const [stockReference, setStockReference] = useState<string>(
    initialData?.stockReference || ""
  );
  const [name, setName] = useState<string>(initialData?.name || "");
  const [country, setCountry] = useState<string>(initialData?.country || "");
  const [songs, setSongs] = useState<Song[]>(
    (initialData?.songs as any) || [
      {
        songName: "",
        releaseDate: "",
        duration: "",
        cassetteNumber: "",
        lecture: { in: "", out: "" },
      },
    ]
  );
  console.log("🚀 ~ songs:", songs);

  const router = useRouter();

  const handleSongChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target;
    const newSongs = [...songs];
    if (name === "in" || name === "out") {
      // Update the lecture object within the song
      newSongs[index].lecture[name] = value;
    } else {
      // Update other song attributes
      newSongs[index][name as keyof Song] = value;
    }
    setSongs(newSongs);
  };

  const addSongField = () => {
    setSongs([
      ...songs,
      {
        songName: "",
        releaseDate: "",
        duration: "",
        cassetteNumber: "",
        lecture: { in: "", out: "" },
      },
    ]);
  };

  const removeSongField = (index: number) => {
    if (songs.length > 1) {
      const newSongs = [...songs];
      newSongs.splice(index, 1);
      setSongs(newSongs);
    }
  };

  const handleFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const formData = {
      stockReference,
      name,
      country,
      songs,
    };

    const savingPromise: Promise<void> = new Promise(
      async (resolve, reject) => {
        let response;
        if (initialData) {
          response = await fetch(`/api/singers/${initialData._id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
          });
        } else {
          response = await fetch("/api/singers", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
          });
        }
        if (response.ok) resolve();
        else {
          const errorData = await response.json();
          reject(errorData.message || "Quelque chose s'est mal passé.");
        }
      }
    );
    await toast.promise(savingPromise, {
      loading: "Enregistrement des informations du chanteur",
      success: "Enregistré",
      error: (error) => `Error: ${error}`,
    });

    router.push("/singers");
  };

  return (
    <Card>
      <CardContent>
        <form onSubmit={handleFormSubmit} noValidate>
          <Typography
            variant="h3"
            sx={{ fontWeight: "bold", marginLeft: "1rem" }}
          >
            Informations sur le chanteur{" "}
          </Typography>
          <Grid container spacing={3} paddingTop={4}>
            <Grid xs={12} md={4}>
              <CustomInput
                required
                name="stockReference"
                label="Référence du stock"
                placeholder="Référence du stock"
                type="text"
                value={stockReference}
                onChange={(event) => setStockReference(event.target.value)}
              />
            </Grid>
            <Grid xs={12} md={4}>
              <CustomInput
                required
                name="Nom du chanteur"
                label="Nom du chanteur"
                placeholder="Singer Name"
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </Grid>

            <Grid xs={12} md={4}>
              <Autocomplete
                value={country}
                options={countries}
                autoHighlight
                onChange={(event, newValue) => {
                  setCountry(newValue);
                }}
                renderInput={(params: any) => (
                  <TextField
                    {...params}
                    required
                    fullWidth
                    label="Pays"
                    variant="outlined"
                    name={"country"}
                    onChange={(event) => setCountry(event.target.value)}
                  />
                )}
              />
            </Grid>

            <div
              style={{
                border: "1px solid #ccc",
                padding: "10px",
                borderRadius: "8px",
              }}
            >
              {" "}
              <Typography
                variant="h5"
                sx={{
                  fontWeight: "bold",
                  marginLeft: "1rem",
                  marginTop: "1rem",
                }}
              >
                Chansons du chanteur
              </Typography>
              {songs.map((song, index) => (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    alignItems: "flex-end",
                    gap: "0.8rem",
                  }}
                >
                  <Grid container spacing={3} paddingTop={3}>
                    <Grid xs={12} md={6}>
                      <CustomInput
                        required
                        label="Nom de la chanson"
                        type="text"
                        placeholder="Nom de la chanson"
                        value={song.songName}
                        onChange={(event) =>
                          handleSongChange(
                            index,
                            event as React.ChangeEvent<HTMLInputElement>
                          )
                        }
                        name="songName"
                        fullWidth
                      />
                    </Grid>
                    <Grid xs={12} md={6}>
                      <LocalizationProvider
                        key={index}
                        dateAdapter={AdapterDayjs}
                      >
                        <DatePicker
                          label="Date de sortie"
                          sx={{ width: "100%" }}
                          format="DD/MM/YYYY"
                          value={
                            song.releaseDate
                              ? dayjs(song.releaseDate)
                              : undefined
                          }
                          onChange={(date) => {
                            const newSongs = [...songs];
                            if (date) {
                              newSongs[index].releaseDate =
                                date.format("YYYYMMDD");
                              setSongs(newSongs);
                            }
                          }}
                        />
                      </LocalizationProvider>
                    </Grid>
                    <Grid xs={12} md={6}>
                      <CustomInput
                        required
                        label="Durée (en secondes)"
                        type="number"
                        placeholder="Durée (en secondes)"
                        value={song.duration}
                        onChange={(event) =>
                          handleSongChange(
                            index,
                            event as React.ChangeEvent<HTMLInputElement>
                          )
                        }
                        name="duration"
                      />
                    </Grid>
                    <Grid xs={12} md={6}>
                      <CustomInput
                        required
                        label="Numéro de cassette"
                        type="number"
                        placeholder="Numéro de cassette"
                        value={song.cassetteNumber}
                        onChange={(event) =>
                          handleSongChange(
                            index,
                            event as React.ChangeEvent<HTMLInputElement>
                          )
                        }
                        name="cassetteNumber"
                      />
                    </Grid>
                    <Grid xs={12} md={6}>
                      <CustomInput
                        required
                        label="in (en secondes)"
                        type="number"
                        placeholder="in (en secondes)"
                        value={song.lecture.in}
                        onChange={(event) =>
                          handleSongChange(
                            index,
                            event as React.ChangeEvent<HTMLInputElement>
                          )
                        }
                        name="in"
                      />
                    </Grid>
                    <Grid xs={12} md={6}>
                      <CustomInput
                        required
                        label="out (en secondes)"
                        type="number"
                        placeholder="out (en secondes)"
                        value={song.lecture.out}
                        onChange={(event) =>
                          handleSongChange(
                            index,
                            event as React.ChangeEvent<HTMLInputElement>
                          )
                        }
                        name="out"
                      />
                    </Grid>
                  </Grid>
                  <CustomButton
                    variant="outlined"
                    onClick={() => removeSongField(index)}
                    sx={{
                      borderColor: "#F04438",
                      "&:hover": { borderColor: "#F04438" },
                      height: "3rem",
                    }}
                  >
                    <DeleteOutlineOutlinedIcon
                      sx={{
                        height: "1.2rem",
                        width: "1.2rem",
                        color: "#F04438",
                      }}
                    />
                  </CustomButton>
                </div>
              ))}
              <CustomButton
                variant="outlined"
                sx={{ mt: 4 }}
                onClick={addSongField}
                fullWidth
              >
                <AddIcon
                  sx={{ marginRight: 1, height: "1rem", width: "1rem" }}
                />
                Ajouter une nouvelle chanson
              </CustomButton>
            </div>
          </Grid>

          <CustomButton
            variant="contained"
            type="submit"
            size="large"
            sx={{ mt: 4, mr: 2 }}
          >
            {initialData ? "Enregistrer les modifications" : "Créer"}
          </CustomButton>
          <CustomButton
            onClick={() => router.push(`/singers`)}
            variant="contained"
            size="large"
            color="error"
            sx={{ mt: 4 }}
          >
            Annuler
          </CustomButton>
        </form>
      </CardContent>
    </Card>
  );
};

export default AddSingerForm;

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
import {  useRouter } from "next/navigation";
 
interface Song {
  songName: string;
  releaseDate: string;
  duration: string;
  cassetteNumber: string;
}

const AddSingerForm = () => {
  const [stockReference, setStockReference] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [country, setCountry] = useState<string>("");
  const [songs, setSongs] = useState<Song[]>([
    { songName: "", releaseDate: "", duration: "0", cassetteNumber: "0" },
  ]);
  const router = useRouter();

  const handleSongChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target;
    const newSongs = [...songs];
    newSongs[index][name as keyof Song] = value;
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
 
    const savingPromise: Promise<void> = new Promise(async (resolve, reject) => {
      const response = await fetch("/api/singers", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: { "Content-Type": "application/json" },
      });
      if (response.ok) resolve();
      else reject();
    });
    
    console.log("🚀 ~ constsavingPromise:Promise<void>=newPromise ~ response:", response)
    await toast.promise(savingPromise, {
      loading: "Saving the singer information",
      success: "Saved",
      error: "Error",
    });
    
    router.push('/singers')    
  }

  return (
    <Card>
      <CardContent>
        <form onSubmit={handleFormSubmit} noValidate>
          <Typography
            variant="h3"
            sx={{ fontWeight: "bold", marginLeft: "1rem" }}
          >
            singer Information
          </Typography>
          <Grid container spacing={3} paddingTop={4}>
            <Grid xs={12} md={4}>
              <CustomInput
                required
                name="stockReference"
                label="stock Reference"
                placeholder="stock Reference"
                type="text"
                value={stockReference}
                onChange={(event) => setStockReference(event.target.value)}
              />
            </Grid>
            <Grid xs={12} md={4}>
              <CustomInput
                required
                name="name"
                label="Singer Name"
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
                    label="Country"
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
                Singer songs
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
                        label="Name"
                        type="text"
                        placeholder="song name"
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
                          label="Release Date"
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
                        label="Duration (in seconds)"
                        type="number"
                        placeholder="Duration"
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
                        label="Cassette Number"
                        type="number"
                        placeholder="Cassette Number"
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
                Add New Add Song
              </CustomButton>
            </div>
          </Grid>
          <CustomButton
            variant="contained"
            type="submit"
            // disabled={isSubmitting}
            size="large"
            sx={{ mt: 4 }}
          >
            Create
            {/* {isSubmitting ? "loading..." : initialData ? "Save changes" : "Create"} */}
          </CustomButton>
        </form>
      </CardContent>
    </Card>
  );
};

export default AddSingerForm;

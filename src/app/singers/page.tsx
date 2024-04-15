"use client";

import SingersListTable from "@/components/singers/SingersListTable";
import CustomButton from "@/components/ui/custom-button";
import { Box, Container, Divider, Stack, Typography } from "@mui/material";
 import AddIcon from "@mui/icons-material/Add";
import { useEffect, useState } from "react";
import { Singer } from "@/lib/models/SingerModel";
import { useRouter } from "next/navigation";

const SingersListPage = () => {
  const router = useRouter();
  const [singers, setSingers] = useState<Singer[]>([]);
  useEffect(() => {
    fetchSingers();
  }, []);
  async function fetchSingers() {
    const res = await fetch("/api/singers");
    const singers = await res.json();
    setSingers(singers);
  }
  return (
    <>
      <Container maxWidth="xl" sx={{ marginBottom: "14px" }}>
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
               {`Singers (${singers.length})`}
            </Typography>
            <Typography
              variant="h5"
              sx={{ letterSpacing: "0.15px !important" }}
            >
              {`Manage singers from Here`}
            </Typography>
          </Stack>
          <CustomButton onClick={() => router.push(`/singers/add`)}>
            <AddIcon sx={{ marginRight: 1, height: "1rem", width: "1rem" }} />{" "}
            Add New
          </CustomButton>
        </Box>
        <Divider
          sx={{
            marginY: 2,
            marginLeft: "1rem",
            marginRight: "1rem",
          }}
        />
        <SingersListTable singers={singers} />
      </Container>
    </>
  );
};

export default SingersListPage;

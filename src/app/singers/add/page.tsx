import AddSingerForm from "@/components/singers/AddSingerForm";
import { Box, Container, Divider, Stack, Typography } from "@mui/material";

const AddSingerPage = () => {
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
              {`Add a new Singer`}
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
        <AddSingerForm />
      </Container>
    </>
  );
};
export default AddSingerPage;

"use client";

import Loginform from "@/components/login-form";
import { Box, Paper, Typography } from "@mui/material";

const LoginPage = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "80dvh",
      }}
    >
      <Paper
        sx={{
          width: "85%",
          "@media (min-width: 600px)": {
            width: "50%",
          },
          padding: "40px",
          borderRadius: "16px",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.25)",
          color: "primary",
        }}
      >
        <Typography
          variant="h2"
          fontWeight="bold"
          align="center"
          marginBottom="40px"
        >
          {`Gestionnaire d'Archive`}
        </Typography>
        <Loginform/>
      </Paper>
    </Box>
  );
};
export default LoginPage;

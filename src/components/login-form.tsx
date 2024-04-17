"use client";

import { Unstable_Grid2 as Grid, Typography } from "@mui/material";
import CustomInput from "./ui/CustomInput";
import CustomButton from "./ui/custom-button";
import { useFormState } from "react-dom";
import loginAction from "@/app/login/loginAction";

const Loginform = () => {
  const [error, formAction] = useFormState(loginAction, undefined);

  return (
    <form action={formAction}>
      <Grid container spacing={2}>
        <Grid xs={12}>
          <CustomInput
            label="Name*"
            placeholder="name"
            type="text"
            name="name"
            required
          />
        </Grid>
        <Grid xs={12}>
          <CustomInput
            required
            label="Password*"
            placeholder="password"
            type="password"
            name="password"
          />
        </Grid>
        {error && <Typography color="error">{error}</Typography>}

        <Grid xs={12}>
          <CustomButton
            variant="contained"
            color="secondary"
            type="submit"
            fullWidth
            size="large"
          >
            connexion
           </CustomButton>
        </Grid>
      </Grid>
    </form>
  );
};

export default Loginform;

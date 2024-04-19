"use client";

import { Unstable_Grid2 as Grid, Typography } from "@mui/material";
import CustomInput from "./ui/CustomInput";
import CustomButton from "./ui/custom-button";
import { useFormState } from "react-dom";
import loginAction from "@/app/login/loginAction";

const Loginform = () => {
  const [state, formAction] = useFormState<any,FormData>(loginAction, null);
  
  return (
    <form action={formAction}>
      <Grid container spacing={2}>
        <Grid xs={12}>
          <CustomInput
            label="Name"
            placeholder="name"
            type="text"
            name="name"
            required
             error={!!state?.error}
          />
        </Grid>
        <Grid xs={12}>
          <CustomInput
            required
            label="Password"
            placeholder="password"
            type="password"
            name="password"
            error={!!state?.error}
          />
        </Grid>
        {state?.error && <Typography color="error">{state?.error}</Typography>}

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

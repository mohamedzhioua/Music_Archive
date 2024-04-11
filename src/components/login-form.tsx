"use client";

import { Unstable_Grid2 as Grid } from "@mui/material";
import CustomInput from "./ui/CustomInput";
import CustomButton from "./ui/custom-button";

const Loginform = () => {
  return (
    <form noValidate>
      <Grid container spacing={2}>
        <Grid xs={12}>
          <CustomInput
            label="Name*"
            placeholder="name"
            type="text"
            name="name"
            // value={values.name}
            // onChange={handleChange}
            // onBlur={handleBlur}
            // error={touched.name && !!(errors.name || serverErrors.name)}
            // helperText={touched.name && (errors.name || serverErrors.name)}
          />
        </Grid>
        <Grid xs={12}>
          <CustomInput
            label="Password*"
            placeholder="password"
            type="password"
            name="password"
            // value={values.password}
            // onChange={handleChange}
            // onBlur={handleBlur}
            // error={touched.password && !!(errors.password || serverErrors.password)}
            // helperText={touched.password && (errors.password || serverErrors.password)}
          />
        </Grid>
        <Grid xs={12}>
          <CustomButton
            variant="contained"
            color="secondary"
            type="submit"
            // disabled={isSubmitting}
            fullWidth
            size="large"
          >
            {/* {isSubmitting ? "Sign Up..." : "Continue"} */}
            sign up
          </CustomButton>
        </Grid>
      </Grid>
    </form>
  );
};

export default Loginform;

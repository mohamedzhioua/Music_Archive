import React from "react";
import { Button, ButtonProps } from "@mui/material";

interface CustomButtonProps extends ButtonProps {
  variant?: "contained" | "outlined";
  target?: string;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  variant = "contained",
  children,
  ...props
}) => {
  return (
    <Button variant={variant} {...props}>
      {children}
    </Button>
  );
};

export default CustomButton;

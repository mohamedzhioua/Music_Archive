"use client";

import Dialog from "@mui/material/Dialog";
import Box from "@mui/material/Box";
import { Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import CustomButton from "./custom-button";

interface AlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading: boolean;
}
export const AlertModal: React.FC<AlertModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  loading,
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <Dialog
      open={isOpen}
      fullWidth
      maxWidth="sm"
      onClose={onClose}
      sx={{
        backdropFilter: "blur(5px)",
        minHeight: "100%",
        p: 3,
      }}
    >
      <Box
        sx={{
          mx: "auto",
          padding: "30px",
          outline: "none",
          textAlign: "center",
        }}
      >
        <Stack spacing={1}>
          <Typography
            variant={"h1"}
            sx={{ fontWeight: "bold", letterSpacing: "0.15px !important" }}
          >
        {`Êtes-vous sûr(e) ?`}
          </Typography>
          <Typography variant="h5" sx={{ letterSpacing: "0.15px !important" }}>
          {`Cette action ne peut pas être annulée.`}
          </Typography>
        </Stack>
        <Box sx={{ mt: 3, display: "flex", justifyContent: "center" }}>
          <CustomButton
            disabled={loading}
            variant="outlined"
            onClick={onClose}
            sx={{ mr: 2 }}
          >
                    Annuler

          </CustomButton>
          <CustomButton
            disabled={loading}
            variant="contained"
            color="error"
            onClick={onConfirm}
          >
            Continuer
          </CustomButton>
        </Box>
      </Box>
    </Dialog>
  );
};


export default AlertModal;

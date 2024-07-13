import React from "react";
import { Dialog } from "@mui/material";

type Props = {
  openRecapModale: boolean;
  setOpenRecapModale: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function recapModale({
  openRecapModale,
  setOpenRecapModale,
}: Props) {
  const handleClose = () => {
    setOpenRecapModale(false);
  };
  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={openRecapModale}
    >
      recapModale
    </Dialog>
  );
}

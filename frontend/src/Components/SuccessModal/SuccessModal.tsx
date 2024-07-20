import React from "react";
import { Dialog, DialogContent, IconButton } from "@mui/material";
import { Close } from "@mui/icons-material";

type Props = {
  openSuccessModal: boolean;
  setOpenSuccessModal: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function SuccessModal({
  openSuccessModal,
  setOpenSuccessModal,
}: Props) {
  const handleClose = () => {
    setOpenSuccessModal(false);
  };
  return (
    <Dialog
      onClose={handleClose}
      open={openSuccessModal}
      PaperProps={{
        sx: {
          width: "50%",
          maxWidth: "none",
        },
      }}
    >
      <IconButton
        aria-label="close"
        onClick={handleClose}
        sx={{
          position: "absolute",
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <Close />
      </IconButton>
      <DialogContent dividers>SUCCESS</DialogContent>
    </Dialog>
  );
}

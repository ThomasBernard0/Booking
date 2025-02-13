import React, { useEffect, useState } from "react";
import { useStripe } from "@stripe/react-stripe-js";
import { Slot } from "../types/slot";
import { makeBookingRequest, usePrice } from "../queries";
import Currency from "./Currency";
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import {
  formatDateToDDMMYYYY,
  formatDDMMYYYYToDate,
  formatDDMMYYYYToFrenchLocale,
  getHours,
} from "../utils/dateUtils";

type Props = {
  openRecapModal: boolean;
  setOpenRecapModal: React.Dispatch<React.SetStateAction<boolean>>;
  slotsSelected: {
    [key: string]: Slot;
  };
};

type recapSlotMap = {
  [key: string]: Slot[];
};

export default function RecapModal({
  openRecapModal,
  setOpenRecapModal,
  slotsSelected,
}: Props) {
  const stripe = useStripe();
  const { priceInCent, isLoading } = usePrice(
    openRecapModal,
    Object.keys(slotsSelected).length
  );
  const [recapSlotMap, setRecapSlotMap] = useState<recapSlotMap>({});

  const newMap: recapSlotMap = {};
  const slotsList = Object.values(slotsSelected);
  slotsList.forEach((slot) => {
    const date = formatDateToDDMMYYYY(slot.startDate);
    if (date in newMap) {
      newMap[date] = [...newMap[date], slot];
    } else {
      newMap[date] = [slot];
    }
  });
  const sortedMap: recapSlotMap = {};
  const sortedKeys = Object.keys(newMap).sort(
    (a, b) =>
      formatDDMMYYYYToDate(a).getTime() - formatDDMMYYYYToDate(b).getTime()
  );
  for (const key of sortedKeys) {
    const sortedSchedule = newMap[key].sort(
      (a, b) =>
        new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
    );
    sortedMap[key] = sortedSchedule;
  }
  setRecapSlotMap(sortedMap);

  const handleClose = () => {
    setOpenRecapModal(false);
  };

  const handlePayment = async () => {
    try {
      const sessionId = await makeBookingRequest(slotsSelected);
      if (!stripe) return;
      await stripe.redirectToCheckout({
        sessionId: sessionId,
      });
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={openRecapModal}
      PaperProps={{
        sx: {
          width: "50%",
          maxWidth: "none",
        },
      }}
    >
      <DialogTitle id="customized-dialog-title">Récapitulatif</DialogTitle>
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
      <DialogContent dividers>
        <Box
          sx={{
            maxHeight: "50vh",
            overflowY: "auto",
          }}
        >
          {Object.keys(recapSlotMap).map((key) => (
            <div key={key}>
              <h3>{formatDDMMYYYYToFrenchLocale(key)}</h3>
              <ul>
                {recapSlotMap[key].map((slot, index) => (
                  <li key={`${key}-${index}`}>
                    {getHours(slot.startDate) + " - " + getHours(slot.endDate)}
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <Box
            sx={{
              mt: "2rem",
              mb: "2rem",
              display: "flex",
              flexDirection: "column",
              gap: "2rem",
            }}
          >
            <Box>
              <Typography sx={{ fontSize: "20px" }}>Total : </Typography>
              {isLoading ? (
                <CircularProgress />
              ) : (
                <Currency price={priceInCent} />
              )}
            </Box>
            <Box>
              <Typography>
                Vos codes seront envoyés à l'adresse email renseignée lors du
                paiement
              </Typography>
            </Box>
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          disabled={priceInCent == 0}
          onClick={handlePayment}
        >
          <Typography>Payer</Typography>
        </Button>
      </DialogActions>
    </Dialog>
  );
}

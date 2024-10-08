import React, { useEffect, useState } from "react";
import { useStripe } from "@stripe/react-stripe-js";
import "./RecapModal.css";
import { Slot } from "../../types/slot";
import { makeBookingRequest, usePrice } from "../../queries";
import Currency from "../Currency/Currency";
import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import {
  formatDateToDDMMYYYY,
  formatDDMMYYYYToDate,
  formatDDMMYYYYToFrenchLocale,
  getHours,
} from "../../utils/dateUtils";

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

  useEffect(() => {
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
  }, [openRecapModal]);

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
        <div className="recap-modal-content">
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
          <div className="price-container">
            <div>
              <span>Total : </span>
              {isLoading ? (
                <CircularProgress />
              ) : (
                <Currency price={priceInCent} />
              )}
            </div>
            <div>
              Vos codes seront envoyés à l'adresse email renseignée lors du
              paiement
            </div>
          </div>
        </div>
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          disabled={priceInCent == 0}
          onClick={handlePayment}
        >
          Payer
        </Button>
      </DialogActions>
    </Dialog>
  );
}

import React, { useEffect, useState } from "react";
import { Schedule } from "../../types/schedule";
import { createPayment, usePrice } from "../../queries";
import Currency from "../Currency/Currency";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
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
  scheduleSelected: {
    [key: string]: Schedule;
  };
  setScheduleSelected: React.Dispatch<
    React.SetStateAction<{
      [key: string]: Schedule;
    }>
  >;
  setOpenSuccessModal: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenErrorModal: React.Dispatch<React.SetStateAction<boolean>>;
  dateSelected: Date | null;
  setDateSelected: React.Dispatch<React.SetStateAction<Date | null>>;
  setErrorType: React.Dispatch<React.SetStateAction<string>>;
};

type recapScheduleMap = {
  [key: string]: Schedule[];
};

const isEmail = (email: string) => {
  return !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

export default function RecapModal({
  openRecapModal,
  setOpenRecapModal,
  scheduleSelected,
  setScheduleSelected,
  setOpenSuccessModal,
  setOpenErrorModal,
  dateSelected,
  setDateSelected,
  setErrorType,
}: Props) {
  const { price, isLoading } = usePrice(
    openRecapModal,
    Object.keys(scheduleSelected).length
  );
  const [email, setEmail] = useState<string>("");
  const [recapScheduleMap, setRecapScheduleMap] = useState<recapScheduleMap>(
    {}
  );

  useEffect(() => {
    const newMap: recapScheduleMap = {};
    const schedulesList = Object.values(scheduleSelected);
    schedulesList.forEach((schedule) => {
      const date = formatDateToDDMMYYYY(schedule.startDate);
      if (date in newMap) {
        newMap[date] = [...newMap[date], schedule];
      } else {
        newMap[date] = [schedule];
      }
    });
    const sortedMap: recapScheduleMap = {};
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
    setRecapScheduleMap(sortedMap);
  }, [openRecapModal]);

  const handleClose = () => {
    setOpenRecapModal(false);
  };

  const handlePayment = async () => {
    setOpenRecapModal(false);
    try {
      await createPayment(price, email, scheduleSelected);
      setOpenSuccessModal(true);
      resetScheduleSelected();
    } catch (error: any) {
      if (error.message.includes("transaction")) {
        setErrorType("payment");
      } else {
        setErrorType("email");
        resetScheduleSelected();
      }
      setOpenErrorModal(true);
    }
  };

  const resetScheduleSelected = () => {
    setScheduleSelected({});
    if (dateSelected) {
      setDateSelected(new Date(dateSelected));
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
        {Object.keys(recapScheduleMap).map((key) => (
          <div key={key}>
            <h3>{formatDDMMYYYYToFrenchLocale(key)}</h3>
            <ul>
              {recapScheduleMap[key].map((schedule, index) => (
                <li key={`${key}-${index}`}>
                  {getHours(schedule.startDate) +
                    " - " +
                    getHours(schedule.endDate)}
                </li>
              ))}
            </ul>
          </div>
        ))}
        {isLoading ? "loading" : <Currency price={price} />}
        <TextField
          label="Email"
          type="email"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={isEmail(email)}
          required
        />
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          disabled={isEmail(email) || price == 0}
          onClick={handlePayment}
        >
          Payer
        </Button>
      </DialogActions>
    </Dialog>
  );
}

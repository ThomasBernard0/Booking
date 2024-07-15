import React, { useEffect, useState } from "react";
import { Schedule } from "../../types/schedule";
import { usePrice } from "../../queries";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import { FormattedNumber } from "react-intl";
import {
  formatDateToDDMMYYYY,
  formatDDMMYYYYToDate,
  formatDDMMYYYYToFrenchLocale,
  getHours,
} from "../../utils/dateUtils";

type Props = {
  openRecapModale: boolean;
  setOpenRecapModale: React.Dispatch<React.SetStateAction<boolean>>;
  scheduleSelected: {
    [key: string]: Schedule;
  };
};

type recapScheduleMap = {
  [key: string]: Schedule[];
};

export default function recapModale({
  openRecapModale,
  setOpenRecapModale,
  scheduleSelected,
}: Props) {
  const { price, isLoading } = usePrice(
    openRecapModale,
    Object.keys(scheduleSelected).length
  );
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
  }, [openRecapModale]);
  const handleClose = () => {
    setOpenRecapModale(false);
  };
  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={openRecapModale}
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
        {isLoading ? (
          "loading"
        ) : (
          <FormattedNumber value={price} style="currency" currency="EUR" />
        )}
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            setOpenRecapModale(false);
          }}
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}

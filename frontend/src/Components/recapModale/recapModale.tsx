import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { Schedule } from "../../types/schedule";
import {
  formatDateToDDMMYYYY,
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

interface recapScheduleMap {
  [key: string]: Schedule[];
}

export default function recapModale({
  openRecapModale,
  setOpenRecapModale,
  scheduleSelected,
}: Props) {
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
    setRecapScheduleMap(newMap);
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

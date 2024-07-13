import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { Schedule } from "../../types/schedule";

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
      newMap[schedule.startDate.toString()] = [
        ...newMap[schedule.startDate.toString()],
        schedule,
      ];
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
            <h3>{key}</h3>
            <ul>
              {recapScheduleMap[key].map((value, index) => (
                <li key={`${key}-${index}`}>{value.startDate.toString()}</li>
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

import React from "react";
import "./Sidemenu.css";
import { Button, Card, CircularProgress } from "@mui/material";
import { useSlots } from "../../queries";
import {
  formatDateToDDMMYYYY,
  formatDateToFrenchLocale,
  getHours,
} from "../../utils/dateUtils";
import { Slot } from "../../types/slot";

type Props = {
  dateSelected: Date | null;
  slotsSelected: {
    [key: string]: Slot;
  };
  setSlotsSelected: React.Dispatch<
    React.SetStateAction<{
      [key: string]: Slot;
    }>
  >;
  setOpenRecapModal: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Sidemenu({
  dateSelected,
  slotsSelected,
  setSlotsSelected,
  setOpenRecapModal,
}: Props) {
  const { slotsList, isLoading } = useSlots(dateSelected);
  const addingSlots = (slot: Slot) => {
    const key = slot.startDate.toString();
    if (key in slotsSelected) {
      const newSchedule = { ...slotsSelected };
      delete newSchedule[key];
      setSlotsSelected(newSchedule);
    } else {
      setSlotsSelected({ ...slotsSelected, [key]: slot });
    }
  };
  return (
    <Card className="sidemenu-wrapper">
      <div className="title">{formatDateToFrenchLocale(dateSelected)}</div>
      <div className="button-container">
        {isLoading ? (
          <CircularProgress />
        ) : (
          slotsList.map((slot, index) => {
            return (
              <Button
                key={formatDateToDDMMYYYY(dateSelected) + "-" + index}
                className="schedule"
                onClick={() => addingSlots(slot)}
                variant={
                  slot.startDate.toString() in slotsSelected
                    ? "contained"
                    : "outlined"
                }
                disabled={!slot.available}
              >
                {getHours(slot.startDate) + " - " + getHours(slot.endDate)}
              </Button>
            );
          })
        )}
      </div>
      <div className="shopping-cart">
        <span>
          Créneau(x) sélectionné(s): {Object.keys(slotsSelected).length}
        </span>
        <Button
          className="payer-button"
          variant="contained"
          disabled={Object.keys(slotsSelected).length == 0}
          onClick={() => setOpenRecapModal(true)}
        >
          Payer
        </Button>
      </div>
    </Card>
  );
}

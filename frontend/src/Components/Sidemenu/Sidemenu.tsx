import React from "react";
import "./Sidemenu.css";
import { Button, Card } from "@mui/material";
import { useSchedules } from "../../queries";
import {
  formatDateToDDMMYYYY,
  formatDateToFrenchLocale,
  getHours,
} from "../../utils/dateUtils";
import { Schedule } from "../../types/schedule";

type Props = {
  dateSelected: Date | null;
  scheduleSelected: {
    [key: string]: Schedule;
  };
  setScheduleSelected: React.Dispatch<
    React.SetStateAction<{
      [key: string]: Schedule;
    }>
  >;
  setOpenRecapModale: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Sidemenu({
  dateSelected,
  scheduleSelected,
  setScheduleSelected,
  setOpenRecapModale,
}: Props) {
  const { schedulesList, isLoading } = useSchedules(dateSelected);
  const addingSchedule = (schedule: Schedule) => {
    const key = schedule.startDate.toString();
    if (key in scheduleSelected) {
      const newSchedule = { ...scheduleSelected };
      delete newSchedule[key];
      setScheduleSelected(newSchedule);
    } else {
      setScheduleSelected({ ...scheduleSelected, [key]: schedule });
    }
  };
  return (
    <Card className="sidemenu-wrapper">
      <div className="title">{formatDateToFrenchLocale(dateSelected)}</div>
      <div className="button-container">
        {isLoading
          ? "loading"
          : schedulesList.map((schedule, index) => {
              return (
                <Button
                  key={formatDateToDDMMYYYY(dateSelected) + "-" + index}
                  className="schedule"
                  onClick={() => addingSchedule(schedule)}
                  variant={
                    schedule.startDate.toString() in scheduleSelected
                      ? "contained"
                      : "outlined"
                  }
                  disabled={schedule.booked}
                >
                  {getHours(schedule.startDate) +
                    " - " +
                    getHours(schedule.endDate)}
                </Button>
              );
            })}
      </div>
      <div className="shopping-cart">
        <span>
          Créneau(x) sélectionné(s): {Object.keys(scheduleSelected).length}
        </span>
        <Button
          className="payer-button"
          variant="contained"
          disabled={Object.keys(scheduleSelected).length == 0}
          onClick={() => setOpenRecapModale(true)}
        >
          Payer
        </Button>
      </div>
    </Card>
  );
}

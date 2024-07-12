import React from "react";
import "./Sidemenu.css";
import { Button, Card } from "@mui/material";
import { useSchedules } from "../../queries";
import { formatDateToFrenchLocale } from "../../utils/dateUtils";
import { Schedule } from "../../types/schedule";

type Props = {
  dateSelected: Date | null;
  scheduleSelected: Set<Schedule>;
  setScheduleSelected: any;
};

export default function Sidemenu({
  dateSelected,
  scheduleSelected,
  setScheduleSelected,
}: Props) {
  const { data, isLoading } = useSchedules(dateSelected);
  const addingSchedule = (schedule: any) => {
    setScheduleSelected((prevSet: any) => {
      const newSet = new Set(prevSet);
      if (newSet.has(schedule)) {
        newSet.delete(schedule);
      } else {
        newSet.add(schedule);
      }
      return newSet;
    });
  };
  return (
    <Card className="sidemenu-wrapper">
      <div className="title">{formatDateToFrenchLocale(dateSelected)}</div>
      <div className="sidemenu-container">
        <div className="button-container">
          {isLoading
            ? "loading"
            : data.map((val, index) => {
                return <Button key={}>test</Button>;
              })}
        </div>
      </div>
      <div className="shopping-cart">
        shopping cart : {scheduleSelected.size} selected
      </div>
    </Card>
  );
}

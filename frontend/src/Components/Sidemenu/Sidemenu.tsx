import React, { useEffect } from "react";
import "./Sidemenu.css";
import { Button, Card } from "@mui/material";
import { useSchedules } from "../../queries";

type Props = {
  dateSelected: Date | null;
  scheduleSelected: Set<string>;
  setScheduleSelected: any;
};

export default function Sidemenu({
  dateSelected,
  scheduleSelected,
  setScheduleSelected,
}: Props) {
  const { data, isLoading } = useSchedules("12-12-2024", dateSelected);
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
  if (isLoading) return <div>Loading</div>;
  return (
    <Card className="sidemenu-wrapper">
      <div className="title">{formatDateToFrench(dateSelected)}</div>
      <div className="sidemenu-container">
        <div className="button-container">
          {data.map((val) => (
            <Button>test</Button>
          ))}
        </div>
      </div>
      <div className="shopping-cart">
        shopping cart : {scheduleSelected.size} selected
      </div>
    </Card>
  );
}

const formatDateToFrench = (date: Date | null): string => {
  if (date == null) return "";
  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const frenchDate = date.toLocaleDateString("fr-FR", options);
  return frenchDate.charAt(0).toUpperCase() + frenchDate.slice(1);
};

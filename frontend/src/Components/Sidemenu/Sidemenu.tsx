import React from "react";

import "./Sidemenu.css";

type Props = {
  dateSelected: Date | null;
};

export default function Sidemenu({ dateSelected }: Props) {
  const schedule = generateSchedule();
  return (
    <div className="sidemenu-wrapper">
      <div className="title">{formatDateToFrench(dateSelected)}</div>
      <div className="button-container">
        {schedule.map((val) => (
          <button className="button">{val}</button>
        ))}
      </div>
    </div>
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

const generateSchedule = (): string[] => {
  const scheduleArray = [];
  for (let i = 8; i <= 20; i += 2) {
    scheduleArray.push(i + "h - " + (i + 2).toString() + "h");
  }
  return scheduleArray;
};

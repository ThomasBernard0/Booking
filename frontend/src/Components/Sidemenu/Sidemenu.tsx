import React, { useEffect } from "react";

import "./Sidemenu.css";

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
  useEffect(() => {
    console.log(scheduleSelected);
  }, [scheduleSelected]);
  const schedule = generateSchedule();
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
    <div className="sidemenu-wrapper">
      <div className="title">{formatDateToFrench(dateSelected)}</div>
      <div className="sidemenu-container">
        <div className="button-container">
          {schedule.map((val) => (
            <button
              key={dateSelected + val}
              className={`schedule ${
                scheduleSelected.has(dateSelected + val) ? "selected" : ""
              }`}
              onClick={() => addingSchedule(dateSelected + val)}
            >
              {val}
            </button>
          ))}
        </div>
      </div>
      <div className="shopping-cart">
        shopping cart : {scheduleSelected.size} selected
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

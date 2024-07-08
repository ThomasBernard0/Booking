import React from "react";

import "./Sidemenu.css";

type Props = {
  dateSelected: Date | null;
};

export default function Sidemenu({ dateSelected }: Props) {
  return (
    <div className="sidemenu-wrapper">
      <div>{formatDateToFrench(dateSelected)}</div>
    </div>
  );
}

const formatDateToFrench = (date: Date | null) => {
  if (date == null) return;
  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return date.toLocaleDateString("fr-FR", options);
};

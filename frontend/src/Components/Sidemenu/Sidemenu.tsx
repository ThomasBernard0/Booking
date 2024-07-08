import React from "react";

import "./Sidemenu.css";

export default function Sidemenu({ show }: any) {
  return (
    <div className={`right-div ${show ? "show" : ""}`}>
      <div className="sidemenu-wrapper">
        <div>TITLE</div>
      </div>
    </div>
  );
}

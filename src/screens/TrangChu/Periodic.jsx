import periodic from "../../../public/image/periodic.png";
import "./TrangChu.css";
import React from "react";

const Periodic = ({onClick}) => {
  return (
    <div className="periodic btn" onClick={onClick}>
      <img src={periodic} alt="periodic" />
    </div>
  );
};

export default Periodic;
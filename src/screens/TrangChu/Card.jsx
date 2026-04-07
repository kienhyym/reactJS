import "./TrangChu.css";
import React from "react";

const Card = ({ img, title,onClick }) => {
  return (
    <div className="card btn" onClick={onClick}>
      <img src={img} alt={title} />
    </div>
  );
};

export default Card;
import React from "react";
import "./ExtendCard.css";

const ExtendCard = ({ extend, onClick }) => {
  return (
    <div className="extend-card" >
      {/* <div className="extend-thumb" onClick={onClick}> ẩn chức năng xem video */}
      <div className="extend-thumb" >
        <img
          src={extend.imageUrl ? extend.imageUrl : "https://pub-b41d67fcb1994c9c810548e1c974a2ff.r2.dev/images/chemistry.jpg"}
          alt={extend.title}
        />
        {/* <div className="play-overlay">▶</div> ẩn chức năng xem video */}
      </div>
      <div className="extend-info" >

        <h3 style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>{extend?.title}</h3>

        <a className="learn-btn"
          onClick={(e) => {
            e.stopPropagation();
          }}
          href={extend?.link} target="_blank"
          rel="noreferrer">Thực hành</a>

      </div>

    </div>
  );
};

export default ExtendCard;
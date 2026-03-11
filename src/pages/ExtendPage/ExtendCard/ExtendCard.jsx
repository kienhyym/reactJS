import React from "react";
import { useNavigate } from "react-router-dom";
import "./ExtendCard.css";

const ExtendCard = ({ extend ,onClick}) => {

  const navigate = useNavigate();

  return (
    <div
      className="extend-card"
      // onClick={() => navigate(`/extends/${extend._id}`)}
    >

      <div className="extend-thumb" onClick={onClick}>
        <img
          src="https://pub-b41d67fcb1994c9c810548e1c974a2ff.r2.dev/images/chemistry.jpg"
          alt={extend.title}
        />
        <div className="play-overlay">▶</div>
      </div>
      <div className="extend-info" >

        <h3 style={{  whiteSpace: 'nowrap',overflow: 'hidden', textOverflow: 'ellipsis'  }}>{extend.title}</h3>

        <a className="learn-btn"
          onClick={(e) => {
            e.stopPropagation();
          }}
          href={extend.link} target="_blank"
          rel="noreferrer">  Thực hành</a>

      </div>

    </div>
  );
};

export default ExtendCard;
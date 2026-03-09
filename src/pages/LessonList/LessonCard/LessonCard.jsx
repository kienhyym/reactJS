import React from "react";
import { useNavigate } from "react-router-dom";
import "./LessonCard.css";

const LessonCard = ({ lesson }) => {

  const navigate = useNavigate();

  return (
    <div
      className="lesson-card"
      onClick={() => navigate(`/lessons/${lesson._id}`)}
    >

      <div className="lesson-thumb">

        <img
          src={lesson.thumbnail}
          alt={lesson.title}
        />

        <div className="play-overlay">▶</div>

      </div>

      <div className="lesson-info">

        <h3>{lesson.title}</h3>

        <button
          className="learn-btn"
          onClick={(e)=>{
            e.stopPropagation();
            navigate(`/lessons/${lesson._id}`);
          }}
        >
          Vào học
        </button>

      </div>

    </div>
  );
};

export default LessonCard;
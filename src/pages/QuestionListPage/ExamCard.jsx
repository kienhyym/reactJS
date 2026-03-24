import React from "react";
import "./ExamCard.css";
import { useNavigate } from "react-router-dom";

const ExamCard = ({ data }) => {

  const navigate = useNavigate();

  const toRoute = (id) => {
    navigate("/quiz/" + id);
  };

  if (!data) return null;

  return (
    <div className="exam-card">

      {data.experiment?.length > 0 && (
        <div className="exam-section">

          <h4>✍ Bài luyện tập</h4>

          {data.experiment.map((item) => (
            <div className="exam-item" key={item._id}>

              <p>{item.title}</p>

              <button
               className="orange"
               onClick={() => toRoute(item._id)}>
                Làm bài
              </button>

            </div>
          ))}

        </div>
      )}

      {data.exam?.length > 0 && (
        <div className="exam-section">

          <h4>📝 Bài kiểm tra</h4>

          {data.exam.map((item) => (
            <div className="exam-item" key={item._id}>

              <p>{item.title}</p>

              <button
                className="primary"
                onClick={() => toRoute(item._id)}
              >
                Làm bài
              </button>

            </div>
          ))}

        </div>
      )}

    </div>
  );
};

export default ExamCard;
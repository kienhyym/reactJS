import React from "react";
import { useNavigate } from "react-router-dom";
import "./QuestionListPage.css";

const QuestionListPage = (params) => {
  const data = params.data;
  const navigate = useNavigate();

  return (
    <>
      {data?.map((lesson) => (
        <div key={lesson._id} className="question-card">
          <div className="question-info">
            <h3>{lesson.title}</h3>
            {/* <p>Có {lesson?.length} câu hỏi</p> */}
          </div>

          <button
            className="start-btn"
            onClick={() => navigate(`/quiz/${lesson._id}`)}
          >
            Làm bài
          </button>
        </div>
      ))}
    </>
  );
};

export default QuestionListPage;
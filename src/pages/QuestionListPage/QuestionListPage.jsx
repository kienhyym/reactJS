import React from "react";
import { useNavigate } from "react-router-dom";
import "./QuestionListPage.css";
import ExamCard from "./ExamCard";

const QuestionListPage = (params) => {
  const data = params.data;
  return (
    <>
      {data?.map((lesson) => (
        <div key={lesson._id} className="question-card">
          <div className="question-info">
            <h3>{lesson.title}</h3>
            <ExamCard data = {lesson} />
          </div>
        </div>
      ))}
    </>
  );
};

export default QuestionListPage;
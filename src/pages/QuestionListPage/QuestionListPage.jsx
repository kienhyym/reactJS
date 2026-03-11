import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import lessons from "../../data/LessonListdata";
import "./QuestionListPage.css";
import { getLessonList } from "../../api/Lesson";

const QuestionListPage = () => {
  const navigate = useNavigate();
  const [lessons, setData] = useState([])
  useEffect(() => {
    const getData = async () => {
      const res = await getLessonList()
      if (res) {
        console.log('==========xx=========', res)
        setData(res.data)
      }
      else {
        setData('==========xx=========')

        console.log("res lectures error:");
      }
    }
    getData()
  }, [])
  return (
    <div className="question-container">
      <h1 className="page-title">🧪 Câu hỏi ôn tập theo bài</h1>

      <div className="question-grid">
        <h2 style={{color:"#3A86FF" }}>Chương 1: Phản ứng hoá học</h2>
        {lessons?.map((lesson) => (
          <div key={lesson.id} className="question-card">
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
      </div>
    </div>
  );
};

export default QuestionListPage;
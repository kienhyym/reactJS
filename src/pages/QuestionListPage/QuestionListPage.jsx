import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
// import lessons from "../../data/LessonListdata";
import "./QuestionListPage.css";
import { getLessonList } from "../../api/Lesson";
import { message } from "antd";
import LoadingPage from "../../component/loadingPage/LoadingPage";
import { AuthContext } from "../../component/context/authContext";
import { startApp } from "../../util/apiHeath";

const QuestionListPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [lessons, setData] = useState([])
   const { auth, setAtuh } = useContext(AuthContext)
  const hasCalled = useRef(false);
  useEffect(() => {
    const getData = async () => {
      setLoading(true)
      if (hasCalled.current) return;
      hasCalled.current = true;
      const res = await startApp(getLessonList, auth, setAtuh)
      if (res) {
        setData(res.data);
      } else {
        message.error("lỗi lấy dữ liệu")
      }
      setLoading(false)
    }
    getData();
  }, [])
  if (loading) {
    return <LoadingPage title="✍ Câu hỏi ôn tập theo bài" style={{
      background: `linear-gradient(
    135deg,
    #e0f7fa,
    #fce4ec
  )`}} />
  }
  return (
    <div className="question-container">
      <h1 className="page-title">✍ Câu hỏi ôn tập theo bài</h1>

      <div className="question-grid">
        <h2 style={{ color: "#3A86FF" }}>Chương 1: Phản ứng hoá học</h2>
        {lessons?.map((lesson) => (
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
      </div>
    </div>
  );
};

export default QuestionListPage;
import React, { useCallback, useContext, useEffect, useRef, useState } from "react";
import "./LamBai.css";
import { getQuestionsByLecture } from "../../api/Lesson";
import { useNavigate, useParams } from "react-router-dom";
import { message, Spin } from "antd";
import { createAchievements } from "../../api/Achievements";
import LoadingPage from "../../component/loadingPage/LoadingPage";
import { LoadingOutlined } from "@ant-design/icons";
import { AuthContext } from "../../component/context/authContext";
import { startApp } from "../../util/apiHeath";
import TrangChoDoi from "../../component/TrangChoDoi/TrangChoDoi";

const LamBai = () => {
  const { lessonId } = useParams();
  const navigate = useNavigate();

  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [current, setCurrent] = useState(0); // 👈 NEW
  const [submitted, setSubmitted] = useState(false);

  const [loading, setLoading] = useState(true);
  const [loadingBtn, setLoadingBtn] = useState(false);

  const [questionTitle, setQuestionTitle] = useState("");
  const [examTitle, setExamTitle] = useState("");

  const [time, setTime] = useState(null);

  const [studentInfo, setStudentInfo] = useState({ name: "", class: "" });
  const [showModal, setShowModal] = useState(false);
  const [started, setStarted] = useState(false);

  const { auth, setAtuh } = useContext(AuthContext);

  const hasCalled = useRef(false);

  useEffect(() => {
    const getData = async () => {
      if (hasCalled.current) return;
      hasCalled.current = true;

      const res = await startApp(() => getQuestionsByLecture(lessonId), auth, setAtuh);

      if (res) {
        setQuestions(res.questions);
        setQuestionTitle(res.lectureTitle);
        setExamTitle(res.examTitle);
        setTime(res.examTime);
      }

      setLoading(false);
    };

    getData();
  }, [lessonId]);

  // 👉 câu hiện tại
  const q = questions[current];

  // 👉 chọn đáp án
  const handleChange = (optIndex, type) => {
    if (type === "single") {
      setAnswers({ ...answers, [current]: optIndex });
    }

    if (type === "multiple") {
      const currentAns = answers[current] || [];

      if (currentAns.includes(optIndex)) {
        setAnswers({
          ...answers,
          [current]: currentAns.filter(i => i !== optIndex)
        });
      } else {
        setAnswers({
          ...answers,
          [current]: [...currentAns, optIndex]
        });
      }
    }
  };

  // 👉 tính điểm
  const score = questions.reduce((total, q, i) => {
    const correct = q.options
      .map((o, i) => (o.isCorrect ? i : null))
      .filter(i => i !== null);

    const user = answers[i];

    if (q.type === "single" && user === correct[0]) return total + 1;

    if (q.type === "multiple") {
      if (!user) return total;
      if (
        user.length === correct.length &&
        user.every(i => correct.includes(i))
      ) return total + 1;
    }

    return total;
  }, 0);

  // 👉 submit
  const submitTheTest = async () => {
    setLoadingBtn(true);

    const res = await createAchievements(lessonId, {
      userName: studentInfo.name,
      userClass: studentInfo.class,
      userResult: `${score}/${questions.length}`
    });

    if (res) {
      message.success("Nộp bài thành công");
      setSubmitted(true);
    }

    setLoadingBtn(false);
  };

  const handleSubmit = () => {
    if (Object.keys(answers).length !== questions.length) {
      message.warning("Chưa làm hết câu!");
      return;
    }
    submitTheTest();
  };

  // 👉 timer
  useEffect(() => {
    if (!started || submitted) return;

    if (time <= 0) {
      submitTheTest();
      return;
    }

    const interval = setInterval(() => {
      setTime(prev => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [time, started, submitted]);

  const formatTime = (s) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec < 10 ? "0" : ""}${sec}`;
  };

  const confirmStart = () => {
    if (!studentInfo.name || !studentInfo.class) {
      message.warning("Nhập đủ thông tin");
      return;
    }
    setShowModal(false);
    setStarted(true);
  };


  return (
    <div className="quiz-container">

      <h1 className="page-title">Bài kiểm tra</h1>
      <h3>{questionTitle} ({examTitle})</h3>

      {/* ===== QUESTION ===== */}
      {q && (
        <div className="question-block">

          <h3>{current + 1}. {q.content}</h3>

          {q.options.map((opt, i) => (
            <label key={i} className="option-label">

              <input
                type={q.type === "multiple" ? "checkbox" : "radio"}
                checked={
                  q.type === "multiple"
                    ? (answers[current] || []).includes(i)
                    : answers[current] === i
                }
                onChange={() => handleChange(i, q.type)}
              />

              <p>{opt.content}</p>

            </label>
          ))}

        </div>
      )}

      {/* ===== NAVIGATION ===== */}
      <div className="quiz-navigation">

        <button disabled={current === 0} onClick={() => setCurrent(current - 1)}>
          ⬅️ Trước
        </button>

        {current < questions.length - 1 ? (
          <button onClick={() => setCurrent(current + 1)}>
            Tiếp ➡️
          </button>
        ) : (
          <button onClick={handleSubmit}>
            Nộp bài
          </button>
        )}

      </div>

      {/* ===== RESULT ===== */}
      {submitted && (
        <div className="result-box">
          🎉 {score}/{questions.length}
        </div>
      )}
      {submitted && (
  <div className="review-container">

    <h2>📋 Xem lại bài làm</h2>

    {questions.map((q, qIndex) => {

      const correctIndexes = q.options
        .map((opt, i) => opt.isCorrect ? i : null)
        .filter(i => i !== null);

      const userAnswer = answers[qIndex];

      return (
        <div key={q._id} className="review-question">

          <h3>
            {qIndex + 1}. {q.content}
          </h3>

          {q.options.map((opt, optIndex) => {

            const isCorrect = correctIndexes.includes(optIndex);

            const isUserSelected =
              q.type === "multiple"
                ? (userAnswer || []).includes(optIndex)
                : userAnswer === optIndex;

            return (
              <div
                key={opt._id}
                className={`
                  review-option
                  ${isCorrect ? "correct" : ""}
                  ${isUserSelected && !isCorrect ? "wrong" : ""}
                `}
              >
                {opt.content}
              </div>
            );
          })}

        </div>
      );
    })}

  </div>
)}

      {/* ===== TIMER ===== */}
      <div className="quiz-footer-fixed">
        <div>📊 {Object.keys(answers).length}/{questions.length}</div>
        <div>⏱ {formatTime(time)}</div>
      </div>

      {/* ===== MODAL ===== */}
      {showModal && (
        <div className="quiz-modal">
          <div className="quiz-modal-content">

            <input
              placeholder="Tên"
              onChange={(e) => setStudentInfo({ ...studentInfo, name: e.target.value })}
            />

            <input
              placeholder="Lớp"
              onChange={(e) => setStudentInfo({ ...studentInfo, class: e.target.value })}
            />

            <button onClick={confirmStart}>
              {loadingBtn && <Spin indicator={<LoadingOutlined spin />} />}
              Bắt đầu
            </button>

          </div>
        </div>
      )}
      {
        loading && <TrangChoDoi title="🔬Trang chủ" />
      }
    </div>
  );
};

export default LamBai;
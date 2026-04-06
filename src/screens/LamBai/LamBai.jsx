import React, { useContext, useEffect, useRef, useState } from "react";
import "./LamBai.css";
import { getQuestionsByLecture } from "../../api/Lesson";
import { useNavigate, useParams } from "react-router-dom";
import { message, Spin } from "antd";
import { createAchievements } from "../../api/Achievements";
import { LoadingOutlined } from "@ant-design/icons";
import { AuthContext } from "../../component/context/authContext";
import { startApp } from "../../util/apiHeath";
import TrangChoDoi from "../../component/TrangChoDoi/TrangChoDoi";
import background from "/image/background.png";
import useWindowSize from "../../util/useWindowSize";
import bgcontent from "/image/bg-content.png";
import Header from "./Header";

const LamBai = () => {
  const { lessonId } = useParams();
  const navigate = useNavigate();
  const { width, height } = useWindowSize();

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
  const [showModal, setShowModal] = useState(true);
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
        console.warn("🚀 ~ getData ~ res.questions:", res.questions)
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
    if (!s) {
      return ''
    }
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
    <div className="container-quiz" style={{ backgroundImage: `url(${background})`, backgroundSize: "cover", backgroundPosition: 'center', height, width }}>
      <div className="home-quiz" style={{ marginTop: width * 0.055, height: height * 0.7, width: width * 0.52, backgroundImage: `url(${bgcontent})` }}>
        <Header tite={questionTitle} name={examTitle} />
        <div className="content-quiz" style={{ width: width * 0.5, height: height * 0.7 }} >
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
            <div onClick={() => setCurrent(current - 1)} disabled={current === 0} >
              <img src={`/image/quizz-back${current <1  ? '-disable' : ''}.png`} alt="header" style={{ width: width * 0.08 }} />
            </div>
            {
              current < questions.length - 1 ? (
                <div onClick={() => setCurrent(current + 1)}>
                  <img src={`/image/quizz-next.png`} alt="header" style={{ width: width * 0.08 }} />
                </div>
              ) : (
                <div onClick={handleSubmit} >
                  <img src={`/image/quizz-send.png`} alt="header" style={{ width: width * 0.08 }} />
                </div>
              )
            }
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


        </div>
      </div>
      {/* ===== TIMER ===== */}
      <div className="quiz-footer-fixed">
        <div>📊 {Object.keys(answers).length}/{questions.length}</div>
        <div>⏱ {formatTime(time)}</div>
      </div>
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
        loading && <TrangChoDoi title="" />
      }
    </div >
  );
};

export default LamBai;
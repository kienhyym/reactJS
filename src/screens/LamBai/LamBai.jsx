import React, { useContext, useEffect, useRef, useState } from "react";
import "./LamBai.css";
import { getQuestionsByLecture } from "../../api/Lesson";
import { useNavigate, useParams } from "react-router-dom";
import { message } from "antd";
import { createAchievements } from "../../api/Achievements";
import { AuthContext } from "../../component/context/authContext";
import { startApp } from "../../util/apiHeath";
import TrangChoDoi from "../../component/TrangChoDoi/TrangChoDoi";
import background from "/image/background.png";
import useWindowSize from "../../util/useWindowSize";
import bgcontent from "/image/bg-content.png";
import Header from "./Header";
import Clock from "./clock";
import Count from "./count";
import CloseModal from "./CloseModal";

const LamBai = () => {
  const { lessonId } = useParams();
  const navigate = useNavigate();
  const { width, height } = useWindowSize();
  console.log("🚀 ~ LamBai ~ height:", height)

  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [current, setCurrent] = useState(0); // 👈 NEW
  const [submitted, setSubmitted] = useState(false);

  const [loading, setLoading] = useState(true);

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
        setQuestionTitle(res.lectureTitle);
        setExamTitle(res.examTitle);
        setTime(res.examTime * 60); // 👈 convert phút → giây
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
    setLoading(true)
    const res = await createAchievements(lessonId, {
      userName: studentInfo.name,
      userClass: studentInfo.class,
      userResult: `${score}/${questions.length}`
    });

    if (res) {
      message.success("Nộp bài thành công");
      setSubmitted(true);
    }

    setLoading(false);
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
      setTime(prev => prev - 1); // 👈 đúng: trừ 1 giây
    }, 1000);

    return () => clearInterval(interval);
  }, [time, started, submitted]);
  const formatTime = (seconds) => {
    if (!seconds) {
      return "ꝏ/ꝏ"
    }
    if (seconds == null) return "";

    const m = Math.floor(seconds / 60);
    const s = seconds % 60;

    return `${m.toString().padStart(2, "0")}:${s
      .toString()
      .padStart(2, "0")}`;
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
      <img className="list-lecture-undo" src={`/image/undo.png`} alt="undo" onClick={() => navigate(-1)} />
      <div className="quiz-time-total-fixed">
        <Clock time={formatTime(time)} />
        <Count count={`${Object.keys(answers).length}/${questions.length}`} />

      </div>
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
            <div className="quiz-back" onClick={() => setCurrent(current - 1)} disabled={current === 0} >
              <img src={`/image/quizz-back${current < 1 ? '-disable' : ''}.png`} alt="header" style={{ width: width * 0.08 }} />
            </div>
            {
              current < questions.length - 1 ? (
                <div className="quiz-next" onClick={() => setCurrent(current + 1)}>
                  <img src={`/image/quizz-next.png`} alt="header" style={{ width: width * 0.08 }} />
                </div>
              ) : (
                <div className="quiz-send" onClick={handleSubmit} >
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

      {showModal && (
        <div className="quiz-modal">
          <div className="quiz-modal-content" style={{ backgroundImage: `url(/image/form-box.png)`, backgroundSize: "cover", backgroundPosition: 'center' }}>
            <CloseModal onClick={() => navigate(-1)} />
            <div className="quiz-modal-content-name" style={{ backgroundImage: `url(/image/input-name.png)` }} >
              <input
                style={{ fontSize: width * 0.009 }}
                placeholder="Tên"
                onChange={(e) => setStudentInfo({ ...studentInfo, name: e.target.value })}
              />
            </div>
            <div className="quiz-modal-content-class" style={{ backgroundImage: `url(/image/input-name.png)` }} >
              <input
                style={{ fontSize: width * 0.009 }}
                placeholder="Lớp"
                onChange={(e) => setStudentInfo({ ...studentInfo, class: e.target.value })}
              />
            </div>
            <div className="quiz-modal-content-start" onClick={confirmStart} style={{ backgroundImage: `url(/image/start.png)`}}>
            </div>
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
import React, { useCallback, useContext, useEffect, useRef, useState } from "react";
import "./QuizPage.css";
import { getQuestionsByLecture } from "../../api/Lesson";
import { useParams } from "react-router-dom";
import { message, Spin } from "antd";
import { createAchievements } from "../../api/Achievements";
import LoadingPage from "../../component/loadingPage/LoadingPage";
import { LoadingOutlined } from "@ant-design/icons";
import { AuthContext } from "../../component/context/authContext";
import { startApp } from "../../util/apiHeath";

const QuizPage = () => {

  const { lessonId } = useParams();
  const id = lessonId
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadingBtn, setLoadingBtn] = useState(false);
  const [questionTitle, setQuestionTitle] = useState("");

  const [studentInfo, setStudentInfo] = useState({
    name: "",
    class: ""
  });
  const { auth, setAtuh } = useContext(AuthContext)
  const hasCalled = useRef(false);
  useEffect(() => {
    const getData = async () => {
      setLoading(true)
      if (hasCalled.current) return;
      hasCalled.current = true;
      const res = await startApp(() => getQuestionsByLecture(id), auth, setAtuh)
      if (res) {
        setQuestions(res.questions)
        setQuestionTitle(res.lectureTitle)
      } else {
        message.error("lỗi lấy dữ liệu")
      }
      setLoading(false)
    }
    getData();
  }, [id])


  const handleChange = (qIndex, optIndex, type) => {

    if (type === "single") {

      setAnswers({
        ...answers,
        [qIndex]: optIndex
      });

    }

    if (type === "multiple") {

      const current = answers[qIndex] || [];

      if (current.includes(optIndex)) {

        // bỏ chọn
        setAnswers({
          ...answers,
          [qIndex]: current.filter(i => i !== optIndex)
        });

      } else {

        // chọn thêm
        setAnswers({
          ...answers,
          [qIndex]: [...current, optIndex]
        });

      }

    }

  };

  const handleSubmit = () => {
    setShowModal(true);

  };
  const confirmSubmit = () => {

    if (!studentInfo.name || !studentInfo.class) {
      message.warning("Vui lòng nhập đầy đủ Tên và Lớp");
      return;
    }
    funcSubmitTheTest()


  };

  const score = questions.reduce((total, q, qIndex) => {

    const correctIndexes = q.options
      .map((opt, i) => opt.isCorrect ? i : null)
      .filter(i => i !== null);

    const userAnswer = answers[qIndex];

    if (q.type === "single") {

      if (userAnswer === correctIndexes[0]) {
        return total + 1;
      }

    }

    if (q.type === "multiple") {

      if (!userAnswer) return total;

      const isCorrect =
        userAnswer.length === correctIndexes.length &&
        userAnswer.every(i => correctIndexes.includes(i));

      if (isCorrect) {
        return total + 1;
      }

    }

    return total;

  }, 0);
  const submitTheTest = async () => {
    try {
      setLoadingBtn(true)
      const res = await createAchievements(id, {
        userName: studentInfo.name,
        userClass: studentInfo.class,
        userResult: `${score}/${questions?.length}`
      })
      if (res) {
        message.success("nộp bài thành công")
        setShowModal(false);
        setSubmitted(true);
      } else {
        setShowModal(false);
        message.error(res.message)
      }
      setLoadingBtn(false)

    } catch (error) {
      setShowModal(false);
      message.error(error.message)
      setLoadingBtn(false)
    }

  }
  const antIcon = <LoadingOutlined style={{ fontSize: 14, color: 'white', marginRight: 10 }} spin />;
  const funcSubmitTheTest = useCallback(submitTheTest, [studentInfo, score])
  if (loading) {
    return <LoadingPage title="Bài kiểm tra" style={{}} />
  }
  return (

    <div className="quiz-container">

      <h1 className="page-title">Bài kiểm tra</h1>
      <h3 style={{ margin: '20px 0px' }}>{questionTitle}</h3>
      {questions?.map((q, qIndex) => (
        <div key={q._id} className="question-block">

          <h3>
            {qIndex + 1}. {q.content}
          </h3>

          {q.image && (
            <img
              src={q.image}
              alt="question"
              className="question-image"
            />
          )}
          <h5 className="question-type" style={{ margin: `10px 10px`, fontWeight: 'normal', fontStyle: 'italic' }}>
            {q.type === "multiple" ? "(Chọn nhiều đáp án)" : "(Chọn 1 đáp án)"}
          </h5>

          {q.options.map((opt, optIndex) => (
            <label
              key={opt._id}
              className={`option-label
${submitted && opt.isCorrect ? "correct" : ""}
${submitted &&
                  (
                    q.type === "multiple"
                      ? (answers[qIndex] || []).includes(optIndex) && !opt.isCorrect
                      : answers[qIndex] === optIndex && !opt.isCorrect
                  )
                  ? "wrong" : ""}
`}
            >

              <input
                type={q.type === "multiple" ? "checkbox" : "radio"}
                name={`question-${qIndex}`}
                checked={
                  q.type === "multiple"
                    ? (answers[qIndex] || []).includes(optIndex)
                    : answers[qIndex] === optIndex
                }
                onChange={() => handleChange(qIndex, optIndex, q.type)}
                disabled={submitted}
              />
              <div className="option-content">
                {opt.image && (
                  <img
                    src={opt.image}
                    alt="hình ảnh"
                    className="option-image"
                  />
                )}
                <p>{opt.content}</p>
              </div>
            </label >
          ))}

        </div>

      ))}

      {!submitted && (

        <button
          className="submit-btn"
          onClick={handleSubmit}
        >
          Nộp bài
        </button>

      )}

      {submitted && (

        <div className="result-box">
          🎉 Bạn đạt {score} / {questions?.length} điểm
        </div>

      )}
      {showModal && (

        <div className="quiz-modal">

          <div className="quiz-modal-content">

            <h2>Thông tin học sinh</h2>

            <input
              type="text"
              placeholder="Nhập họ và tên"
              value={studentInfo.name}
              onChange={(e) =>
                setStudentInfo({
                  ...studentInfo,
                  name: e.target.value
                })
              }
            />

            <input
              type="text"
              placeholder="Nhập lớp"
              value={studentInfo.class}
              onChange={(e) =>
                setStudentInfo({
                  ...studentInfo,
                  class: e.target.value
                })
              }
            />

            <div className="modal-buttons">

              <button
                className="cancel-btn"
                onClick={() => setShowModal(false)}
                disabled={loadingBtn}
              >
                Huỷ
              </button>

              <button
                className="confirm-btn"
                onClick={confirmSubmit}
                disabled={loadingBtn}
              >
                {loadingBtn && <Spin size="small" indicator={antIcon} />}
                Nộp bài
              </button>

            </div>

          </div>

        </div>

      )}
    </div>

  );

};

export default QuizPage;
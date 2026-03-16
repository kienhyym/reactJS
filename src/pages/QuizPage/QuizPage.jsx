import React, { useCallback, useEffect, useState } from "react";
import "./QuizPage.css";
import { getQuestionsByLecture } from "../../api/Lesson";
import { useParams } from "react-router-dom";
import { message } from "antd";
import { createAchievements } from "../../api/Achievements";

const QuizPage = () => {

  const { lessonId } = useParams();
  const id = lessonId
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const [studentInfo, setStudentInfo] = useState({
    name: "",
    class: ""
  });
  useEffect(() => {
    const getData = async () => {
      const res = await getQuestionsByLecture(id)
      if (res) {
        setQuestions(res.questions)
      }
      else {
        message.error("Lỗi lấy dữ liệu")
      }
    }
    getData()
  }, [])

  const handleChange = (qIndex, optIndex) => {

    setAnswers({
      ...answers,
      [qIndex]: optIndex
    });

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

  const score = questions?.reduce((total, q, qIndex) => {

    const correctIndex = q.options.findIndex(opt => opt.isCorrect);

    if (answers[qIndex] === correctIndex) {
      return total + 1;
    }

    return total;

  }, 0);
  const submitTheTest = async () => {
    try {
      const res = await createAchievements(id,{
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
    } catch (error) {
      setShowModal(false);
      message.error(error.message)
    }

  }
  const funcSubmitTheTest = useCallback(submitTheTest, [studentInfo, score])

  return (

    <div className="quiz-container">

      <h1 className="page-title">Bài kiểm tra</h1>

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

          {q.options.map((opt, optIndex) => (
            <label
              key={opt._id}
              className={`option-label
              ${submitted && opt.isCorrect ? "correct" : ""
                }
              ${submitted &&
                  answers[qIndex] === optIndex &&
                  !opt.isCorrect
                  ? "wrong"
                  : ""
                }`}
            >

              <input
                type="radio"
                name={`question-${qIndex}`}
                checked={answers[qIndex] === optIndex}
                onChange={() => handleChange(qIndex, optIndex)}
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
              >
                Huỷ
              </button>

              <button
                className="confirm-btn"
                onClick={confirmSubmit}
              >
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
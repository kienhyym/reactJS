import React, { useEffect, useState } from "react";
import "./QuizPage.css";
import { getQuestionsByLecture } from "../../api/Lesson";
import { useParams } from "react-router-dom";
import { message } from "antd";

const QuizPage = () => {

  const { lessonId } = useParams();
  const id = lessonId
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

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
    setSubmitted(true);
  };

  const score = questions?.reduce((total, q, qIndex) => {

    const correctIndex = q.options.findIndex(opt => opt.isCorrect);

    if (answers[qIndex] === correctIndex) {
      return total + 1;
    }

    return total;

  }, 0);
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

    </div>

  );

};

export default QuizPage;
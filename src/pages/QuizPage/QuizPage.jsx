import React, { useState } from "react";
import "./QuizPage.css";

const quizData = [
  {
    question: "1. Phản ứng hóa học là gì?",
    options: [
      "Sự biến đổi chất này thành chất khác",
      "Sự thay đổi trạng thái",
      "Sự hòa tan",
      "Sự bay hơi"
    ],
    correct: 0
  },
  {
    question: "2. Công thức hóa học của nước là gì?",
    image: "data:image/jpeg;base64,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",
    options: ["H2O", "CO2", "O2", "NaCl"],
    correct: 0
  },
  {
    question: "3. Mol là gì?",
    options: [
      "Đơn vị đo khối lượng",
      "Đơn vị đo số lượng chất",
      "Đơn vị đo thể tích",
      "Đơn vị đo nhiệt độ"
    ],
    correct: 1
  },
  {
    question: "4. 1 mol chứa bao nhiêu hạt?",
    options: [
      "6.02 x 10^23",
      "3.14",
      "9.81",
      "1000"
    ],
    correct: 0
  },
  {
    question: "5. Chất nào sau đây là hợp chất?",
    options: ["O2", "H2", "NaCl", "N2"],
    correct: 2
  },
  {
    question: "6. Hình sau mô tả loại phản ứng nào?",
    image: "data:image/jpeg;base64,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",
    options: [
      "Phản ứng hóa hợp",
      "Phản ứng phân hủy",
      "Phản ứng thế",
      "Phản ứng trao đổi"
    ],
    correct: 0
  },
  {
    question: "7. Dung dịch là gì?",
    options: [
      "Chất rắn",
      "Hỗn hợp đồng nhất",
      "Chất khí",
      "Hỗn hợp không đồng nhất"
    ],
    correct: 1
  },
  {
    question: "8. Nồng độ dung dịch phụ thuộc vào?",
    options: [
      "Khối lượng chất tan",
      "Thể tích dung môi",
      "Cả hai",
      "Nhiệt độ"
    ],
    correct: 2
  },
  {
    question: "9. Khí nào chiếm nhiều nhất trong không khí?",
    options: ["O2", "CO2", "N2", "H2"],
    correct: 2
  },
  {
    question: "10. NaCl là hợp chất của?",
    options: [
      "Natri và Clo",
      "Natri và Oxy",
      "Natri và Hydro",
      "Clo và Oxy"
    ],
    correct: 0
  }
];

const QuizPage = () => {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [finished, setFinished] = useState(false);

  const question = quizData[current];
  const selected = answers[current];

  const handleSelect = (index) => {
    setAnswers({
      ...answers,
      [current]: index
    });
  };

  const handleNext = () => {
    if (current < quizData.length - 1) {
      setCurrent(current + 1);
    } else {
      setFinished(true);
    }
  };

  const handlePrev = () => {
    if (current > 0) {
      setCurrent(current - 1);
    }
  };

  const score = Object.keys(answers).reduce((total, key) => {
    const i = Number(key);
    if (answers[key] === quizData[i].correct) {
      return total + 1;
    }
    return total;
  }, 0);

  const progressPercent = ((current + 1) / quizData.length) * 100;

  if (finished) {
    return (
      <div className="quiz-container">
        <div className="quiz-card">
          <h2>🎉 Hoàn thành!</h2>
          <p>
            Bạn đạt <strong>{score}</strong> / {quizData.length} điểm
          </p>
          <button
            className="nav-question-btn primary"
            onClick={() => {
              setCurrent(0);
              setAnswers({});
              setFinished(false);
            }}
          >
            Làm lại
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="quiz-container">

      {/* HEADER */}
      <div className="quiz-header">
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>
        <div className="score">⭐ {score}</div>
      </div>

      {/* QUESTION */}
      <div className="quiz-card">
        <h2>{question.question}</h2>

        {question.image && (
          <img
            src={question.image}
            alt="question"
            style={{ maxWidth: "300px", marginBottom: "20px" }}
          />
        )}

        <div className="options-grid">
          {question.options.map((option, index) => (
            <button
              key={index}
              className={`option-btn
                ${selected === index && index === question.correct ? "correct" : ""}
                ${selected === index && index !== question.correct ? "wrong" : ""}
              `}
              onClick={() => handleSelect(index)}
            >
              {option}
            </button>
          ))}
        </div>

        {/* NAVIGATION */}
        <div className="quiz-navigation">

          <button
            className="nav-question-btn secondary"
            onClick={handlePrev}
            disabled={current === 0}
          >
            ⬅ Câu trước
          </button>

          <button
            className="nav-question-btn primary"
            onClick={handleNext}
            disabled={selected === undefined}
          >
            {current === quizData.length - 1
              ? "Hoàn thành 🎉"
              : "Câu tiếp theo ➡"}
          </button>

        </div>
      </div>

      <div className="quiz-footer">
        Câu {current + 1} / {quizData.length}
      </div>

    </div>
  );
};

export default QuizPage;
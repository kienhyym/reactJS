import React from "react";
import { useNavigate } from "react-router-dom";
import "./HomePage.css";

const HomePage = () => {
  const navigate = useNavigate();
  const checkMobile = () => {
    return window.innerWidth < 768 ||
      /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
  };
  const isMobile = checkMobile();
  return (
    <div className="home-container">
      {/* HERO SECTION */}
      <div className="hero-section">
        <img src="/image/chemistry.jpg" alt="Chemistry Banner" className="hero-image" />

        <div className="hero-overlay">
          <h1>HỌC HÓA THCS</h1>
          <p>Khám phá thế giới điều kỳ qua thí nghiệm & bài giảng sinh động</p>

          <div className="hero-buttons">
            <button onClick={() => navigate("/lessons")}>
              📚 Vào học ngay
            </button>

            <button className="secondary" onClick={() => navigate("/quiz")}>
              🧪 Làm Quiz
            </button>
          </div>
        </div>
      </div>

      {/* GIỚI THIỆU */}
      <section className="about-section">
        <h2>Tại sao nên học cùng chúng tôi?</h2>

        <div className="features">
          <div className="feature-card">
            🎥 Video bài giảng sinh động
          </div>

          <div className="feature-card">
            🧪 Thí nghiệm trực quan
          </div>

          <div className="feature-card">
            🎯 Câu hỏi ôn tập thông minh
          </div>
        </div>
      </section>
      {!isMobile && <span className="btn tooltip tooltipHome " onClick={(() => {
        localStorage.setItem("interface", "color");
        window.location.replace("/")
      })}>
        <p class="tooltip-text">chuyển sang giao diện sắc màu</p>
        <img src="https://pub-b41d67fcb1994c9c810548e1c974a2ff.r2.dev/color-inter.png" alt="home" className="icon-image" />
      </span>
      }

    </div>
  );
};

export default HomePage;
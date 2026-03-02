import React from "react";
import "./LessonDetail.css";
import { useParams, useNavigate } from "react-router-dom";
import lessons from "../../data/LessonListdata";
import { useEffect } from "react";

const LessonDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const currentId = Number(id);
    const lessonIndex = lessons.findIndex((l) => l.id === currentId);
    const lesson = lessons[lessonIndex];
    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth", // có thể bỏ smooth nếu không thích animation
        });
    }, [id]);
    if (!lesson) {
        return <h2 style={{ padding: 40 }}>Không tìm thấy bài học</h2>;
    }

    const handlePrev = () => {
        if (lessonIndex > 0) {
            navigate(`/lessons/${lessons[lessonIndex - 1].id}`);
        }
    };

    const handleNext = () => {
        if (lessonIndex < lessons.length - 1) {
            navigate(`/lessons/${lessons[lessonIndex + 1].id}`);
        }
    };

    return (
        <div className="lesson-detail-container">

            {/* Main Content */}
            <div className="lesson-main">
                <h2 className="lesson-title">{lesson.title}</h2>

                {lesson.videoUrl.map((video, i) => (
                    <div className="video-wrapper" key={i}>
                        <span style={{ paddingLeft: 10, display: "block" }}>
                            {video.title}
                        </span>
                        <video width="100%" height="500" controls key={`${lesson.id}-${i}`}>
                            <source src={video.url} type="video/mp4" />
                            Trình duyệt không hỗ trợ video.
                        </video>
                    </div>
                ))}

                <div className="lesson-info">
                    <p>Đây là nội dung bài giảng</p>

                    <div className="lesson-navigation">
                        <button
                            className="nav-btn"
                            onClick={handlePrev}
                            disabled={lessonIndex === 0}
                        >
                            ⬅ Bài trước
                        </button>

                        <button
                            className="nav-btn primary"
                            onClick={handleNext}
                            disabled={lessonIndex === lessons.length - 1}
                            style={lessonIndex === lessons.length - 1 ? { background: "#ccc", cursor: "not-allowed" } : {}}
                        >
                            Bài tiếp theo ➡
                        </button>
                    </div>
                </div>
            </div>

            {/* Sidebar */}
            <div className="lesson-sidebar">
                <h3>📚 Danh sách bài học</h3>
                {lessons.map((item) => (
                    <div
                        key={item.id}
                        className={`sidebar-item ${item.id === currentId ? "active" : ""
                            }`}
                        onClick={() => navigate(`/lessons/${item.id}`)}
                    >
                        {item.title}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LessonDetail;
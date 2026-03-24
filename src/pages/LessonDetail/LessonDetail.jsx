import React, { useContext, useRef } from "react";
import "./LessonDetail.css";
import { useParams, useNavigate } from "react-router-dom";
import lessons from "../../data/LessonListdata";
import { useEffect, useState, useMemo } from "react";
import { getLectureDetailAndOpenlectures, getLessonDetail, getLessonList } from "../../api/Lesson";
import { message } from "antd";
import LoadingPage from "../../component/loadingPage/LoadingPage";
import { AuthContext } from "../../component/context/authContext";
import { startApp } from "../../util/apiHeath";
import LessonDetailCard from "./LessonDetailCard";

const LessonDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [data, setData] = useState([])
    const [datalessonList, setDataLessonList] = useState([])
    const [loading, setLoading] = useState(true);

    const flatLessons = useMemo(() => {
        return datalessonList.flatMap(chapter => chapter.lectures || []);
    }, [datalessonList]);

    const lessonIndex = useMemo(() => {
        return flatLessons.findIndex(l => l._id === id);
    }, [flatLessons, id]);


    const { auth, setAtuh } = useContext(AuthContext)
    useEffect(() => {
        const getData = async () => {
            setLoading(true)
            const res = await startApp(() => getLectureDetailAndOpenlectures(id), auth, setAtuh)
            if (res) {
                setData(res.data)
                setDataLessonList(res.data.lectures)

            } else {
                message.error("lỗi lấy dữ liệu")
            }
            setLoading(false)
        }
        getData();
    }, [id])


    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth", // có thể bỏ smooth nếu không thích animation
        });
    }, [id]);
    if (loading) {
        return <LoadingPage title="" />
    }
    if (!data) {
        return <h2 style={{ padding: 40 }}>Không tìm thấy bài học</h2>;
    }

    const handlePrev = () => {
        if (lessonIndex > 0) {
            navigate(`/lessons/${flatLessons[lessonIndex - 1]._id}`);
        }
    };

    const handleNext = () => {
        if (lessonIndex < flatLessons.length - 1) {
            navigate(`/lessons/${flatLessons[lessonIndex + 1]._id}`);
        }
    };
    const handleQuestion = (id) => {
        navigate(`/quiz/${id}`);

    }
    return (
        <div className="lesson-detail-container">

            {/* Main Content */}
            <div className="lesson-main">
                <h2 className="lesson-title">{data?.lecture?.title}</h2>

                {data?.videos?.map((video, i) => (
                    <div className="video-wrapper" key={i}>
                        <span style={{ paddingLeft: 10, display: "block" }}>
                            {video?.title}
                        </span>
                        <video width="100%" height="500" controls key={`${video?._id}`}>
                            <source src={video?.videoUrl} type="video/mp4" />
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
                            disabled={lessonIndex <= 0}
                        >
                            ⬅ Bài trước
                        </button>

                        <button
                            className="nav-btn primary"
                            onClick={handleNext}
                            disabled={lessonIndex === -1 || lessonIndex >= flatLessons.length - 1}
                            style={lessonIndex === -1 || lessonIndex >= flatLessons.length - 1 ? { background: '#e0e0e0',color:'black' } : {}}
                        >
                            Bài tiếp theo ➡
                        </button>
                    </div>
                </div>
            </div>

            {/* Sidebar */}
            <div className="lesson-sidebar">
                {/* <h3>✍ Câu hỏi ôn tập</h3>
                <button
                    className="question-btn"
                    onClick={() => handleQuestion(data?.lecture?._id)}
                >
                    Thực hiện Làm bài ôn tập ➡
                </button>
                <br /> <br /> */}
                <h3>📚 Danh sách bài học</h3>
                {datalessonList?.map((item) => (<LessonDetailCard key={item._id} data={item} />
                ))}
            </div>
        </div>
    );
};

export default LessonDetail;
import React, { useContext } from "react";
import "./LessonDetail.css";
import { useParams, useNavigate } from "react-router-dom";
import lessons from "../../data/LessonListdata";
import { useEffect,useState ,useMemo} from "react";
import { getLessonDetail, getLessonList } from "../../api/Lesson";
import { message } from "antd";

const LessonDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [data, setData] = useState([])
    const [datalessonList, setDataLessonList] = useState([])

    // const lessonIndex = datalessonList.findIndex((l) => l._id === id);

  const lessonIndex = useMemo(() => datalessonList.findIndex((l) => l._id === id), [datalessonList, id]);

    useEffect(() => {
        const getData = async () => {
            const res = await getLessonDetail(id)
            if (res) {
                setData(res.data)
            }
            else {
              message.error("Lỗi lấy dự liệu bài giảng")
            }
        }
        getData()
    }, [id])

    useEffect(() => {
        const getDataLessonList = async () => {
            const res = await getLessonList()
            if (res) {
                setDataLessonList(res.data)
            }
            else {
              message.error("Lỗi lấy dự liệu bài giảng")
            }
        }
        getDataLessonList()
    }, [])

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth", // có thể bỏ smooth nếu không thích animation
        });
    }, [id]);
    if (!data) {
        return <h2 style={{ padding: 40 }}>Không tìm thấy bài học</h2>;
    }

    const handlePrev = () => {
        if (datalessonList.length > 0) {
            navigate(`/lessons/${datalessonList[lessonIndex - 1]._id}`);
        }
    };

    const handleNext = () => {
        if (lessonIndex < lessons.length - 1) {
            navigate(`/lessons/${datalessonList[lessonIndex + 1]._id}`);
        }
    };

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
                            // disabled={lessonIndex === 0}
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
                {datalessonList?.map((item) => (
                    <div
                        key={item._id}
                        className={`sidebar-item ${item._id === id  ? "active" : ""
                            }`}
                        onClick={() => navigate(`/lessons/${item._id}`)}
                    >
                        {item?.title}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LessonDetail;
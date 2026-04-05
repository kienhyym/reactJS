import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import background from "/image/background.png";
import bgcontent from "/image/bg-content.png";
import useWindowSize from "../../util/useWindowSize";
import Header from "./Header";
import { startApp } from "../../util/apiHeath";
import { AuthContext } from "../../component/context/authContext";
import "./BaiGiang.css";
import { getLectureDetailAndOpenlectures } from "../../api/Lesson";
import { useNavigate, useParams } from "react-router-dom";
import TrangChoDoi from "../../component/TrangChoDoi/TrangChoDoi";
const BaiGiang = () => {
    const { id } = useParams();
    const { width, height } = useWindowSize();
    const navigate = useNavigate();
    const [data, setData] = useState([])
    const [datalessonList, setDataLessonList] = useState([])
    const [loading, setLoading] = useState(true);
    const [iVideo, setIVideo] = useState(0);
    const videoRef = useRef();
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
        if (videoRef.current) {
            videoRef.current.load(); // 👈 reload video
        }
    }, [iVideo, id]);

    if (!data) {
        return <h2 style={{ padding: 40 }}>Không tìm thấy bài học</h2>;
    }

    const handlePrev = () => {
        if (lessonIndex > 0) {
            navigate(`/baigiang/${flatLessons[lessonIndex - 1]._id}`);
        }
    };

    const handleNext = () => {
        if (lessonIndex < flatLessons.length - 1) {
            navigate(`/baigiang/${flatLessons[lessonIndex + 1]._id}`);
        }
    };

    return (
        <div className="lecture-container" style={{ paddingTop: width * 0.052, backgroundImage: `url(${background})`, backgroundSize: "cover", backgroundPosition: 'center', height, width }}>
            <div className="lecture-left">
                <Header title={data?.lecture?.title} />
                <div
                    className="lecture-video"
                    style={{
                        width: width * 0.4,
                        backgroundImage: `url(${bgcontent})`,
                    }}
                >
                    {/* CONTENT */}
                    <div className="lecture-video-itemn" style={{ paddingLeft: width * 0.01, paddingRight: width * 0.01, paddingTop: width * 0.01 }}>

                        {/* PAGE */}
                        <div className="lecture-video-pages" style={{ marginBottom: width * 0.005 }}>
                            <b style={{ fontSize: width * 0.01 }}>Phần:</b>

                            {data?.videos?.map((video, i) => (
                                <p
                                    onClick={() => { setIVideo(i) }}
                                    key={video._id}
                                    style={iVideo === i ? { backgroundColor: "burlywood", fontSize: width * 0.008 } : { fontSize: width * 0.008 }}
                                >
                                    {i + 1}
                                </p>
                            ))}
                        </div>

                        {/* VIDEO */}
                        <div className="video-wrapper">
                            <div className="video-container">
                                <video controls ref={videoRef}>
                                    {data?.videos && data?.videos.length > 0 && (
                                        <source
                                            src={data?.videos[iVideo]?.videoUrl}
                                            type="video/mp4"
                                        />
                                    )}
                                </video>
                            </div>
                        </div>
                        <div className="lecture-video-tran">
                            <div onClick={handlePrev} disabled={lessonIndex <= 0} >
                                <img src={`/image/video-pre${lessonIndex <= 0 ? '-disable' : ''}.png`} alt="header" style={{ width: width * 0.08 }} />
                            </div>
                            <div onClick={handleNext} disabled={lessonIndex >= flatLessons.length - 1}>
                                <img src={`/image/video-next${lessonIndex >= flatLessons.length - 1 ? '-disable' : ''}.png`} alt="header" style={{ width: width * 0.08 }} />
                            </div>
                        </div>
                    </div>
                </div>
                <br />
                <div className="lecture-comment" style={{ width: width * 0.4, height: height * 0.2, backgroundImage: `url(${bgcontent})`, backgroundSize: "cover", backgroundPosition: 'center' }}>

                    <img src="/image/footer-lecture.png" alt="header" style={{ width: '100%' }} />

                </div>
            </div>
            <div className="lecture-right" style={{ width: width * 0.2, height: height * 0.88, backgroundImage: `url(${bgcontent})`, backgroundSize: "cover", backgroundPosition: "left" }}>
                <img className="list-lecture-header" src={`/image/header-lectures.png`} alt="header" />
                <div className="lecture-right-container" style={{height: height * 0.77}}>
                    {datalessonList?.map((itemlc, indexlc) => {
                        return (
                            <div className="list-lecture">
                                <div className="list-lecture-chapter" >
                                    <img src={`/image/lecture-chapter-${indexlc + 1}.png`} alt="header" style={{ width: '100%' }} />
                                    <b style={{ fontSize: width * 0.008 }}>{itemlc.title} {itemlc.name}</b>
                                </div>
                                {itemlc?.lectures?.map((itemlecture, indexlecture) => {
                                    return (
                                        <div className="list-lecture-video-item" style={id === itemlecture._id ? { transform: "translateX(-4%)" } : {}} onClick={() => navigate(`/baigiang/${itemlecture._id}`)}>
                                            <img src={`/image/lecture-video-${indexlecture + 1}.png`} alt="header" style={{ width: '100%' }} />
                                            <b style={{ fontSize: width * 0.008 }}>{itemlecture.title}</b>
                                            {
                                                id === itemlecture._id && (
                                                    <img className="list-lecture-video-item-play" src={`/image/play-button.png`} alt="header" style={{ width: '15%' }} />
                                                )
                                            }

                                        </div>
                                    )
                                })}
                            </div>
                        )
                    })}
                </div>
                <img className="list-lecture-footer" src={`/image/footer-lectures.png`} alt="footer" />
            </div>
            {
                loading && <TrangChoDoi title="🔬Trang chủ" />
            }
        </div >
    );
};

export default BaiGiang;
import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import background from "/image/background.png";
import bgcontent from "/image/bg-content.png";
import table from "/image/table2.png";
import book from "/image/book2.png";
import thignhiem from "/image/robo2.png";
import { Modal } from "antd";
import useWindowSize from "../../util/useWindowSize";
import Header from "./Header";
import { startApp } from "../../util/apiHeath";
import { AuthContext } from "../../component/context/authContext";
import TrangChoDoi from "../../component/TrangChoDoi/TrangChoDoi";
import "./DeThi.css";
import KnowledgePdfCard from "../../pages/Knowledge/KnowledgePdfCard/KnowledgePdfCard";
import { getOpenChaptersNoLecture } from "../../api/Lesson";
import { useNavigate } from "react-router-dom";
const DeThi = () => {
    const { width, height } = useWindowSize();
    const navigate = useNavigate()
    const [data, setData] = useState([]);
    const hasCalled = React.useRef(false);
    const { auth, setAtuh } = useContext(AuthContext)
    const [loading, setLoading] = useState(true);
    const [previewImage, setPreviewImage] = useState(null);
    const containerRef = useRef();
    const getData = async () => {
        setLoading(true)
        if (hasCalled.current) return;
        hasCalled.current = true;
        const res = await startApp(getOpenChaptersNoLecture, auth, setAtuh)
        if (res) {
            setData(res.data);
            console.log("🚀 ~ getData ~ res.data:", res.data)
        } else {
            message.error("lỗi lấy dữ liệu")
        }
        setLoading(false)
    }
    useEffect(() => {
        getData();
    }, [])

    const bottom = useMemo(() => {
        const initWidth = window.innerWidth;
        if (initWidth < 800) {
            return initWidth * 0.5 * 0.045;
        }
        if (initWidth < 1200) {
            return initWidth * 0.5 * 0.045;
        }
        else {
            return initWidth * 0.5 * 0.045;
        }
    }, [])
    return (
        <div className="container" style={{ backgroundImage: `url(${background})`, backgroundSize: "cover", backgroundPosition: 'center', height, width }}>
            <div className="home" style={{ marginTop: width * 0.055, height: height * 0.7, width: width * 0.52, backgroundImage: `url(${bgcontent})` }}>
                <Header />
                <div className="content-exam" style={{ width: width * 0.5, height: height * 0.7 }} >
                    {data?.map((item) => {
                        return (
                            <div className="item-exam" key={item._id} >
                                <div className="item-chapters" >
                                    <div className="item-chapters-left"  >
                                        <img src={`/image/chapter-icon.png`} ></img>
                                    </div>
                                    <div className="item-chapters-right">
                                        <div className="item-chapters-right-top">
                                            <img src={`/image/chapter-title.png`} width={"100%"} ></img>
                                            <p style={{ fontSize: width * 0.01, textTransform: 'uppercase' }}>{item.title}</p>
                                        </div>
                                        <div className="content-chapter" >
                                            {
                                                item.exams?.map((exam, index) => {
                                                    const imageIndex = (index % 4) + 1;
                                                    return (
                                                        <div className="item-chapter" key={exam._id} onClick={() => navigate("/lambai/" + exam._id)}>
                                                            <img src={`/image/exam${imageIndex}.png`} width={"100%"} ></img>
                                                            <p style={{ fontSize: width * 0.01, height: "16%", textTransform: 'uppercase' }}>{exam.titleLecture}</p>
                                                            <span className="lecute-title" style={{ fontSize: width * 0.009, textTransform: 'lowercase' }}>{exam.title}</span>
                                                            <span className="info-exam">
                                                                <span style={{ fontSize: width * 0.008 }}>{exam.totalQuestion && `Tổng câu hỏi:${exam.totalQuestion} `}</span>
                                                                <span>&nbsp;-&nbsp;</span>
                                                                <span style={{ fontSize: width * 0.008 }}>{exam.timeLimit && `Thời gian:${exam.timeLimit} phút`}</span>
                                                            </span>
                                                        </div>)
                                                })
                                            }
                                        </div>
                                    </div>
                                </div>

                            </div>)
                    })}
                </div>
                <img src={table} alt="table" style={{ position: 'absolute', width: width, bottom: -width * 0.09 }} />
                <img src={book} alt="book" style={{ position: 'absolute', width: width * 0.15, left: - width * 0.16, bottom: -width * 0.04 }} />
                <img src={thignhiem} alt="thignhiem" style={{ position: 'absolute', width: width * 0.22, right: -width * 0.16, bottom: -width * 0.03 }} />
            </div>
            <Modal
                open={!!previewImage?.imageUrl}

                closeIcon={
                    <img
                        src="/image/delete.png"   // 👈 ảnh của bạn
                        alt="close"
                        style={{
                            width: 64,
                            height: 64,
                            cursor: "pointer"
                        }}
                    />
                }
                onCancel={() => setPreviewImage(null)}
                footer={null}              // 👈 bỏ nút OK/Cancel
                centered
                width="90vw"
                height="90vh"             // 👈 gần full màn hình
                styles={{
                    content: {
                        background: "transparent",
                        boxShadow: "none",
                    },
                    body: {
                        padding: 0,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        background: "transparent", // 👈 nền trong suốt
                    }
                }}
            >
                {
                    previewImage?.imageUrl?.slice(-4) === '.pdf' ?
                        <KnowledgePdfCard data={previewImage} width={width * 0.6} containerRef={containerRef} key={previewImage._id} />
                        : <img
                            src={previewImage?.imageUrl}
                            alt="preview"
                            style={{
                                height: "90vh",
                                maxWidth: "100%",
                                maxHeight: "90vh",
                                objectFit: "contain",
                            }}
                        />
                }

            </Modal>
            {
                loading && <TrangChoDoi title="🔬Trang chủ" />
            }
        </div >
    );
};

export default DeThi;
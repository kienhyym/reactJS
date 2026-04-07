import Header from "./Header";
import Hero from "./Hero";
import Periodic from "./Periodic";
import "./TrangChu.css";
import React, { useContext, useEffect, useRef, useState } from "react";
import background from "../../../public/image/background.png";
import left from "../../../public/image/left.png";
import right from "../../../public/image/right.png";
import book from "../../../public/image/book.png";
import glass from "../../../public/image/glass.png";
import table from "../../../public/image/tbale.png";
import Card from "./Card";
import card1 from "../../../public/image/card1.png";
import card2 from "../../../public/image/card2.png";
import card3 from "../../../public/image/card3.png";
import card4 from "../../../public/image/card4.png";
import useWindowSize from "../../util/useWindowSize";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../component/context/authContext";
import { getLectureOpenFisrt } from "../../api/Lesson";
import { startApp } from "../../util/apiHeath";
import TrangChoDoi from "../../component/TrangChoDoi/TrangChoDoi";
import { Modal } from "antd";

const TrangChu = () => {
    const navigate = useNavigate();
    const [data, setData] = React.useState(null);
    const [loading, setLoading] = useState(true);

    const { auth, setAtuh } = useContext(AuthContext)
    const hasCalled = useRef(false);
    useEffect(() => {
        const getData = async () => {
            setLoading(true)
            if (hasCalled.current) return;
            hasCalled.current = true;
            const res = await startApp(getLectureOpenFisrt, auth, setAtuh)
            if (res) {
                setData(res.data);
            } else {
                message.error("lỗi lấy dữ liệu")
            }
            setLoading(false)
        }
        getData();
    }, [])
    const { width } = useWindowSize();
    const [openModal, setOpenModal] = useState(false);
    const [zoom, setZoom] = useState(1);

    const handleDoubleClick = () => {
        setZoom(prev => (prev === 1 ? 2 : 1)); // 👈 toggle zoom
    };
    return (
        <div className="container" style={{ backgroundImage: `url(${background})` }}>
            <div className="home" style={{ marginTop: width * 0.055, backgroundImage: "url(/image/bg-content.png)" }}>
                <img src={left} alt="left" className="left" style={{ width: width * 0.1, left: - width * 0.055 }} />
                <img src={right} alt="right" className="right" style={{ width: width * 0.1, right: - width * 0.06 }} />
                <Header />
                <Hero />
                <div className="cards" >
                    <Card img={card1} onClick={() => navigate("/baigiang/" + data?._id)} />
                    <Card img={card2} onClick={() => navigate("/dethi")} />
                    <Card img={card4} onClick={() => navigate("/tonghop")} />
                    <Card img={card3} onClick={() => navigate("/morong")} />
                </div>
                <Periodic onClick={() => setOpenModal(true)} />
                <img src={table} alt="table" style={{ position: 'absolute', width: width, bottom: -width * 0.06 }} />
                <img src={book} alt="book" style={{ position: 'absolute', width: width * 0.2, left: - width * 0.13, bottom: -width * 0.04 }} />
                <img src={glass} alt="glass" style={{ position: 'absolute', width: width * 0.17, right: -width * 0.1, bottom: -width * 0.04 }} />
            </div>
            const [zoom, setZoom] = useState(1);

            <Modal
                open={openModal}
                closeIcon={
                    <img
                        className="btn"
                        src="/image/delete.png"   // 👈 ảnh của bạn
                        alt="close"
                        style={{
                            width: 64,
                            height: 64,
                            cursor: "pointer"
                        }}
                    />
                }
                onCancel={() => {
                    setOpenModal(false)
                  setZoom( 1); // 👈 toggle zoom
                }
                }
                footer={null}
                centered
                width="90vw"
                styles={{
                    content: { background: "transparent", boxShadow: "none" },
                    body: {
                        padding: 0,
                        background: "transparent"
                    }
                }}
            >
                <div
                    style={{
                        width: "100%",
                        height: "90vh",
                        overflow: "auto"
                    }}
                >
                    <img
                        src="https://pub-b41d67fcb1994c9c810548e1c974a2ff.r2.dev/Bang-tuan-hoan.webp"
                        onDoubleClick={handleDoubleClick}
                        style={{
                            width: zoom === 1 ? "100%" : "200%",
                            maxWidth: "none",
                            display: "block",
                            margin: "auto",
                            cursor: zoom === 1 ? "zoom-in" : "zoom-out",
                            transition: "0.3s"
                        }}
                    />
                </div>
            </Modal>
            {
                loading && <TrangChoDoi title="🔬Trang chủ" />
            }
        </div>
    );
};

export default TrangChu;
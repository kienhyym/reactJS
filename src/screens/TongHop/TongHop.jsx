import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import background from "/image/background.png";
import bgcontent from "/image/bg-content.png";
import table from "/image/table2.png";
import book from "/image/book.png";
import thignhiem from "/image/robo.png";
import { Modal } from "antd";
import useWindowSize from "../../util/useWindowSize";
import Header from "./Header";
import { startApp } from "../../util/apiHeath";
import { AuthContext } from "../../component/context/authContext";
import { getKnowledge } from "../../api/Knowledge";
import "./TongHop.css";
import KnowledgePdfCard from "../../pages/Knowledge/KnowledgePdfCard/KnowledgePdfCard";
import TrangChoDoi from "../../component/TrangChoDoi/TrangChoDoi";
import { useNavigate } from "react-router-dom";
const TongHop = () => {
    const { width, height } = useWindowSize();
    const [data, setData] = useState([]);
    const hasCalled = React.useRef(false);
    const { auth, setAtuh } = useContext(AuthContext)
    const [loading, setLoading] = useState(true);
    const [previewImage, setPreviewImage] = useState(null);
    const containerRef = useRef();
    const navigate = useNavigate();
    const getData = async () => {
        setLoading(true)
        if (hasCalled.current) return;
        hasCalled.current = true;
        const res = await startApp(getKnowledge, auth, setAtuh)
        if (res) {
            setData(res.data);
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
            <img className="list-lecture-undo" src={`/image/undo.png`} alt="undo" onClick={() => navigate(-1)} />

            <div className="home" style={{ marginTop: width * 0.055, height: height * 0.7, width: width * 0.52, backgroundImage: `url(${bgcontent})` }}>
                <Header />
                <div className="content-knowledge" style={{ width: width * 0.5 }} >

                    {data?.map((item, index) => {
                        const imageIndex = (index % 10) + 1;
                        return (
                            <div className="item-know"
                                key={index}
                                onClick={() => setPreviewImage(item)}
                                style={{
                                    height: width * 0.115,
                                    marginTop: 10,
                                    backgroundSize: "cover",
                                    backgroundPosition: "center",
                                    backgroundImage: item?.imageUrl?.slice(-4) === '.pdf' ?
                                        `url(/image/knowpdf.png)` : `url(${item.imageUrl})`
                                }} >
                                {item?.imageUrl?.slice(-4) === '.pdf' ?
                                    <span className="item-label" style={{ fontSize: width * 0.0066, top: "4%" }}>📄 PDF </span>
                                    :
                                    <span className="item-label" style={{ fontSize: width * 0.0066 }}><span style={{ fontSize: width * 0.013, color: 'white' }}>◪ </span>Ảnh </span>
                                }
                                <img src={`/image/know${imageIndex}.png`} width={"100%"} height={'100%'}></img>
                                <p style={{ fontSize: width * 0.0066, height: "16%", textTransform: 'lowercase' }}>{item.title}</p>
                            </div>)
                    })}
                </div>
                <img src={table} alt="table" style={{ position: 'absolute', width: width, bottom: -width * 0.09 }} />
                <img src={book} alt="book" style={{ position: 'absolute', width: width * 0.2, left: - width * 0.16, bottom: -width * 0.04 }} />
                <img src={thignhiem} alt="thignhiem" style={{ position: 'absolute', width: width * 0.17, right: -width * 0.16, bottom: -width * 0.04 }} />
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

export default TongHop;
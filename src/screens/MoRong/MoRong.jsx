import React, { useContext, useEffect, useMemo, useState } from "react";
import "./MoRong.css";
import background from "/image/background.png";
import bgcontent from "/image/bg-content.png";

import table from "/image/table2.png";
import book from "/image/book.png";
import thignhiem from "/image/thinghiem.png";

import useWindowSize from "../../util/useWindowSize";
import Header from "./Header";
import { startApp } from "../../util/apiHeath";
import { getExtend } from "../../api/Extend";
import { AuthContext } from "../../component/context/authContext";
import TrangChoDoi from "../../component/TrangChoDoi/TrangChoDoi";
import { useNavigate } from "react-router-dom";

const MoRong = () => {
    const { width, height } = useWindowSize();
    const [data, setData] = useState([]);
    const hasCalled = React.useRef(false);
    const { auth, setAtuh } = useContext(AuthContext)
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate()
    const getData = async () => {
        setLoading(true)
        if (hasCalled.current) return;
        hasCalled.current = true;
        const res = await startApp(getExtend, auth, setAtuh)
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

    const top = useMemo(() => {
        const initWidth = window.innerWidth;
        if (initWidth < 800) {
            return initWidth * 0.5 * 322 / 2569 * 0.35;
        }
        if (initWidth < 1200) {
            return initWidth * 0.5 * 322 / 2569 * 0.32;
        }
        else {
            return initWidth * 0.5 * 322 / 2569 * 0.25;
        }
    }, [])
    return (
        <div className="container" style={{ backgroundImage: `url(${background})`, backgroundSize: "cover", backgroundPosition: 'center', height, width }}>
            <img className="list-lecture-undo btn" src={`/image/undo.png`} alt="undo" onClick={() => navigate(-1)} />
            <div className="home" style={{ marginTop: width * 0.055, height: height * 0.7, width: width * 0.52, backgroundImage: `url(${bgcontent})` }}>
                <Header />
                <div className="content-extend" style={{ width: width * 0.5 }} >

                    {data?.map((item, index) => {
                        const imageIndex = (index % 4) + 1; // 👈 lặp từ 1 -> 4
                        return (<a 
                            key={item._id} 
                            href={item?.link} 
                            target="_blank"
                            rel="noreferrer"
                            ><div   className="btn" style={{ position: "relative" }} >
                                <img src={`/image/extend-card${imageIndex}.png`} alt="header" style={{ width: width * 0.5, marginTop: 10 }} ></img>
                                <p style={{ fontSize: width * 0.009, top, left: width * 0.13, textTransform: 'lowercase' }}>{item.title}</p>
                            </div></a>)
                    })}
                </div>
                <img src={table} alt="table" style={{ position: 'absolute', width: width, bottom: -width * 0.09 }} />
                <img src={book} alt="book" style={{ position: 'absolute', width: width * 0.2, left: - width * 0.16, bottom: -width * 0.04 }} />
                <img src={thignhiem} alt="thignhiem" style={{ position: 'absolute', width: width * 0.17, right: -width * 0.16, bottom: -width * 0.04 }} />
            </div>
            {
                loading && <TrangChoDoi title="🔬Trang chủ" />
            }
        </div >
    );
};

export default MoRong;
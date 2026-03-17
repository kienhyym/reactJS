import React, { useEffect, useState } from "react";
import "./LoadingPage.css";

const LoadingPage = ({ title, style }) => {
    const [over, setOver] = useState(false)

    useEffect(() => {
        setOver(false)
        setTimeout(() => {
            setOver(true)
        }, 10000);
    }, [])

    return (
        <div className="loading-container" style={style}>

            <div className="loading-content">
                <h1 className="page-title">{title}</h1>

                <div className="atom-loader">
                    <img src="https://pub-b41d67fcb1994c9c810548e1c974a2ff.r2.dev/atom_animation.gif" style={{ height: 100 }}></img>
                </div>

                <h2>Đang tải dữ liệu...</h2>
                {over ?
                    <>
                        <p>Đang khởi động server sẽ mất chút thời gian ⏳</p>
                        <p>Xin lỗi vì xự bất tiện này</p>
                        <p>(⁎˃ᆺ˂)</p>
                    </>
                    :
                    <p>Vui lòng chờ trong giây lát ⏳</p>
                }



            </div>

        </div>
    );
};

export default LoadingPage;
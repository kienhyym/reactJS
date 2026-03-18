import React, { useContext, useEffect,  useState } from "react";
import "./LoadingPage.css";
import { AuthContext } from "../context/authContext";

const LoadingPage = ({ title, style }) => {
    const { auth } = useContext(AuthContext)
    const [showSlowText, setShowSlowText] = useState(false);
    useEffect(() => {
        let timer;
        if (auth.loading) {
            timer = setTimeout(() => {
                setShowSlowText(true);
            }, 10000);

        } else {
            setShowSlowText(false);
        }
        return () => clearTimeout(timer);
    }, [auth.loading]);
    return (
        <div className="loading-container" style={style}>

            <div className="loading-content">
                <h1 className="page-title">{title}</h1>

                <div className="atom-loader">
                    <img src="https://pub-b41d67fcb1994c9c810548e1c974a2ff.r2.dev/atom_animation.gif" style={{ height: 100 }}></img>
                </div>

                <h2>Đang tải dữ liệu...</h2>
                {showSlowText ?
                    <>
                        <p>Đang khởi động server sẽ mất chút thời gian ⏳</p>
                        <p>Xin lỗi vì xự bất tiện này</p>
                        <p>(⁎˃ᆺ˂)</p>
                        <p>Quá trình này có thể mất ~30s</p>
                    </>
                    :
                    <p>Vui lòng chờ trong giây lát ⏳</p>
                }



            </div>

        </div>
    );
};

export default LoadingPage;
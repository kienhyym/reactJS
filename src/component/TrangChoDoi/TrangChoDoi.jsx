import React, { useContext, useEffect, useState } from "react";
import "./TrangChoDoi.css";
import { AuthContext } from "../context/authContext";
import useWindowSize from "../../util/useWindowSize";

const TrangChoDoi = ({ title, style }) => {
    const { auth } = useContext(AuthContext)
    const [showSlowText, setShowSlowText] = useState(false);
    const { width, height } = useWindowSize();

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
        <div className="loading-container" >

            <div className="loading-content" style={{paddingTop:height*0.25}}>
                <div className="atom-loader">
                    <img src="https://pub-b41d67fcb1994c9c810548e1c974a2ff.r2.dev/atom_animation.gif" style={{ height: width *0.09 }}></img>
                </div>

                {showSlowText &&
                    <>
                        <p>Đang khởi động server sẽ mất chút thời gian ⏳</p>
                        {/* <p>Xin lỗi vì xự bất tiện này</p>
                        <p>(⁎˃ᆺ˂)</p> */}
                        <p>Quá trình này có thể mất ~30s</p>
                    </>
                }



            </div>

        </div>
    );
};

export default TrangChoDoi;
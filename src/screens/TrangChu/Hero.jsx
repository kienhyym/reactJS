import "./TrangChu.css";
import React from "react";
import header from "../../../public/image/header.png";
import useWindowSize from "../../util/useWindowSize";

const Hero = () => {
        const { width, height } = useWindowSize();

    return (
        <div className="hero">
            <img src={header} alt="header" style={{ width: width * 0.25 }} />
            <p  style={{ fontSize: width * 0.01 }}>Khám phá thế giới hóa học thật dễ hiểu và sinh động!</p>
        </div>
    );
};

export default Hero;
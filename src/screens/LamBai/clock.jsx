import React from "react";
import header from "../../../public/image/clock.png";
import useWindowSize from "../../util/useWindowSize";

const Clock = ({ time }) => {
    const { width, height } = useWindowSize();
    return (
        <div className="clock" style={{ width: width * 0.07, textAlign: 'center', top: width * 0.2, right: width * 0.085 }} >
            <img src={header} alt="header" style={{ width: width * 0.07, textAlign: 'center' }} />
            <p style={{ fontSize: width * 0.01 }}>{time}</p>
        </div>
    );
};

export default Clock;
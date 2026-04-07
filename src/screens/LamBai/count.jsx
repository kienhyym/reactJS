import React from "react";
import header from "../../../public/image/count.png";
import useWindowSize from "../../util/useWindowSize";

const Count = ({ count }) => {
    const { width, height } = useWindowSize();

    return (
        <div className="count" style={{ width: width * 0.15, textAlign: 'center', top: width * 0.12, right: width * 0.05 }} >
            <img src={header} alt="header" style={{ width: width * 0.15, textAlign: 'center' }} />
            <p style={{ fontSize: width * 0.01 }}>{count}</p>
        </div>
    );
};

export default Count;
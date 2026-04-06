import React from "react";
import header from "../../../public/image/header-lectures.png";
import useWindowSize from "../../util/useWindowSize";

const HeaderRight = ({ title }) => {
    const { width, height } = useWindowSize();
    return (
        <div className="header" style={{ width: width * 0.2, top: -width * 0.06}} >
            <img src={header} alt="header" style={{ width: width * 0.2}} />
            <h3 style={{fontSize:width*0.01}}>{title}</h3>
        </div> 
    );
};

export default HeaderRight;
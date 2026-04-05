import React from "react";
import header from "../../../public/image/BG.png";
import useWindowSize from "../../util/useWindowSize";

const Header = ({ title }) => {
    const { width, height } = useWindowSize();
    return (
        <div className="header" style={{ width: width * 0.4, top: -width * 0.052}} >
            <img src={header} alt="header" style={{ width: width * 0.39}} />
            <h3 style={{fontSize:width*0.01}}>{title}</h3>
        </div> 
    );
};

export default Header;
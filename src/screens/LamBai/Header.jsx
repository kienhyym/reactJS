import React from "react";
import header from "../../../public/image/BTK2.png";
import useWindowSize from "../../util/useWindowSize";

const Header = ({ tite, name }) => {
    const { width, height } = useWindowSize();

    return (
        <div className="header" style={{ width: width * 0.52, textAlign: 'center', top: -width * 0.065 }} >
            <img src={header} alt="header" style={{ width: width * 0.52, textAlign: 'center' }} />
            <p style={{ fontSize: width * 0.01 }}>{tite}</p>
            <span style={{ fontSize: width * 0.01 }}>{name}</span>
        </div>
    );
};

export default Header;
import React from "react";
import header from "../../../public/image/BTK.png";
import useWindowSize from "../../util/useWindowSize";

const Header = () => {
    const { width, height } = useWindowSize();

    return (
        <div className="header" style={{ width: width * 0.6, textAlign: 'center', top: -width * 0.065 }} >
            <img src={header} alt="header" style={{ width: width * 0.52, textAlign: 'center' }} />
        </div>
    );
};

export default Header;
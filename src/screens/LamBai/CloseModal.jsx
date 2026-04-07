import React from "react";
import header from "../../../public/image/delete.png";
import useWindowSize from "../../util/useWindowSize";

const CloseModal = ({ onClick }) => {
    const { width, height } = useWindowSize();
    return (
        <div onClick={onClick} className="clock" style={{ width: width * 0.06, textAlign: 'center', top: -width * 0.02, right: width * 0.001}} >
            <img src={header} alt="header" style={{ width: width * 0.04, textAlign: 'center' }} />
        </div>
    );
};

export default CloseModal;
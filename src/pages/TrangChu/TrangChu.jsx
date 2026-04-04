import Header from "./Header";
import Hero from "./Hero";
import Periodic from "./Periodic";
import "./TrangChu.css";
import React from "react";
import background from "../../../public/image/background.png";
import left from "../../../public/image/left.png";
import right from "../../../public/image/right.png";
import book from "../../../public/image/book.png";
import glass from "../../../public/image/glass.png";
import table from "../../../public/image/tbale.png";
import Card from "./Card";
import card1 from "../../../public/image/card1.png";
import card2 from "../../../public/image/card2.png";
import card3 from "../../../public/image/card3.png";
import card4 from "../../../public/image/card4.png";
import useWindowSize from "../../util/useWindowSize";
import { useNavigate } from "react-router-dom";

const TrangChu = () => {
    const navigate = useNavigate();
    const [openModalExtend, setOpenModalExtend] = React.useState(false);
    const { width } = useWindowSize();
    return (
        <div className="container" style={{ backgroundImage: `url(${background})` }}>
            <div className="home" style={{ marginTop: width * 0.055 }}>
                <img src={left} alt="left" className="left" style={{ width: width * 0.1, left: - width * 0.065 }} />
                <img src={right} alt="right" className="right" style={{ width: width * 0.1, right: - width * 0.07 }} />
                <Header />
                <Hero />
                <div className="cards">
                    <Card img={card1} onClick={() => navigate("/lessons")} />
                    <Card img={card2} onClick={() => navigate("/dethi")} />
                    <Card img={card4} onClick={() => navigate("/tonghop")} />
                    <Card img={card3} onClick={() => navigate("/morong")}/>
                </div>
                <Periodic />
                <img src={table} alt="table" style={{ position: 'absolute', width: width, bottom: -width * 0.06 }} />
                <img src={book} alt="book" style={{ position: 'absolute', width: width * 0.2, left: - width * 0.13, bottom: -width * 0.04 }} />
                <img src={glass} alt="glass" style={{ position: 'absolute', width: width * 0.17, right: -width * 0.1, bottom: -width * 0.04 }} />
            </div>
        </div>
    );
};

export default TrangChu;
import React from "react";
import "./MoRong.css";
import background from "/image/background.png";
import bgcontent from "/image/bg-content.png";

import table from "/image/table2.png";
import book from "/image/book.png";
import thignhiem from "/image/thinghiem.png";

import useWindowSize from "../../util/useWindowSize";
import Header from "./Header";

const MoRong = () => {
    const { width ,height} = useWindowSize();
    return (
        <div className="container" style={{ backgroundImage: `url(${background})`, backgroundSize: "cover", backgroundPosition: 'center',height,width }}>
            <div className="home" style={{ marginTop: width * 0.055 ,height:height*0.7,width: width * 0.52 ,backgroundImage: `url(${bgcontent})`}}>
                {/* <img src={left} alt="left" className="left" style={{ width: width * 0.1, left: - width * 0.065 }} /> */}
                <Header />
                {/* <Hero /> */}
                <div className="content" style={{width: width * 0.5}} >
                    <img src="/image/extend-card1.png" alt="header" style={{ width: width * 0.5 ,marginTop:10}} />
                    <img src="/image/extend-card2.png" alt="header" style={{ width: width * 0.5 ,marginTop:10}} />
                    <img src="/image/extend-card3.png" alt="header" style={{ width: width * 0.5 ,marginTop:10}} />
                    <img src="/image/extend-card4.png" alt="header" style={{ width: width * 0.5 ,marginTop:10}} />
                         <img src="/image/extend-card1.png" alt="header" style={{ width: width * 0.5 ,marginTop:10}} />
                    <img src="/image/extend-card2.png" alt="header" style={{ width: width * 0.5 ,marginTop:10}} />
                    <img src="/image/extend-card3.png" alt="header" style={{ width: width * 0.5 ,marginTop:10}} />
                    <img src="/image/extend-card4.png" alt="header" style={{ width: width * 0.5 ,marginTop:10}} />
                </div>
                {/* <Periodic /> */}
                <img src={table} alt="table" style={{ position: 'absolute', width: width, bottom: -width * 0.09 }} />
                <img src={book} alt="book" style={{ position: 'absolute', width: width * 0.2, left: - width * 0.16, bottom: -width * 0.04 }} />
                <img src={thignhiem} alt="thignhiem" style={{ position: 'absolute', width: width * 0.17, right: -width * 0.16, bottom: -width * 0.04 }} />
            </div>
        </div>
    );
};

export default MoRong;
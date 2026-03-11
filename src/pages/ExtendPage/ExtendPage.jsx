import React, { useState, useEffect } from "react";
import ExtendCard from "./ExtendCard/ExtendCard";
import "./ExtendPage.css";
import { getExtend } from "../../api/Extend";

const ExtendPage = () => {

  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);

  const [selectedVideo, setSelectedVideo] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {

    const getData = async () => {

      const res = await getExtend();

      if (res) {
        setData(res.data);
      } else {
        console.log("res error");
      }

    }

    getData();

  }, []);

  const pageSize = 8;
  const start = (page - 1) * pageSize;

  const current = data.slice(start, start + pageSize);

  const totalPages = Math.ceil(data.length / pageSize);

  const handleOpenVideo = (extend) => {
    setSelectedVideo(extend);
    setOpen(true);

  }

  const handleClose = () => {
    setOpen(false);
    setSelectedVideo(null);
  }

  return (

    <div className="extend-container">

      <h1 className="page-title">📚 Danh sách video thí nghiệm</h1>

      <div className="extend-grid">

        {current.map((extend) => (
          <ExtendCard
            key={extend._id}
            extend={extend}
            onClick={() => handleOpenVideo(extend)}
          />
        ))}

      </div>

      {/* pagination */}

      <div className="pagination">

        {Array.from({ length: totalPages }).map((_, i) => (

          <button
            key={i}
            className={page === i + 1 ? "active" : ""}
            onClick={() => setPage(i + 1)}
          >
            {i + 1}
          </button>

        ))}

      </div>

      {/* modal video */}

      {open && (

        <div className="video-modal">

          <div className="video-modal-content">
            <div className="box-close">
              <button
                className="close-btn"
                onClick={handleClose}
              >
                ✕
              </button>
            </div>
            {selectedVideo && (

              <video
                controls
                autoPlay
                src={selectedVideo.videoUrl}
                className="video-player"
              />

            )}

          </div>

        </div>

      )}

    </div>

  );
};

export default ExtendPage;
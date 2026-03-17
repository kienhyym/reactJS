import React, { useState, useEffect } from "react";
import LessonCard from "./LessonCard/LessonCard";
import "./LessonList.css";
import { getLessonList } from "../../api/Lesson";
import { message } from "antd";
import LoadingPage from "../../component/loadingPage/LoadingPage";


const LessonList = () => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      const res = await getLessonList()
      if (res) {
        setData(res.data)
      }
      else {
        message.error("lỗi lấy dữ liệu")
      }
      setLoading(false)
    }
    getData()
  }, [])
  const [page, setPage] = useState(1);

  const pageSize = 8;

  const start = (page - 1) * pageSize;

  const current = data.slice(start, start + pageSize);

  const totalPages = Math.ceil(data.length / pageSize);
  if (loading) {
    return <LoadingPage title="📖 Danh sách bài giảng"  />
  }
  return (

    <div className="lesson-container">

      <h1 className="page-title">📖 Danh sách bài giảng</h1>

      <div className="lesson-grid">

        {current.map((lesson) => (
          <LessonCard
            key={lesson.id}
            lesson={lesson}
          />
        ))}

      </div>

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

    </div>
  );
};

export default LessonList;
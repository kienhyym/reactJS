import React, { useState } from "react";
import LessonCard from "./LessonCard/LessonCard";
import "./LessonList.css";


const LessonList = (params) => {
  const data = params.data
  const [page, setPage] = useState(1);
  const pageSize = 8;

  const start = (page - 1) * pageSize;

  const current = data.slice(start, start + pageSize);

  const totalPages = Math.ceil(data.length / pageSize);

  return (
    <>
      <div className="lesson-grid">
        {current.map((lesson) => (
          <LessonCard
            key={lesson._id}
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
    </>
  );
};

export default LessonList;
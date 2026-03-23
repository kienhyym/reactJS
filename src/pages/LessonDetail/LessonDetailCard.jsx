import React from "react";
import "./LessonDetail.css";
import { useParams, useNavigate } from "react-router-dom";

const LessonDetailCard = ({data}) => {
    const { id } = useParams();
    const navigate = useNavigate();
    return (
            <div className="lesson-sidebar-menu">
                <h4>{data.title} {data?.name}</h4>
                {data.lectures?.map((item) => (
                    <div
                        key={item._id}
                        className={`sidebar-item ${item._id === id ? "active" : ""
                            }`}
                        onClick={() => navigate(`/lessons/${item._id}`)}
                    >
                        {item?.title}
                    </div>
                ))}
            </div>
    );
};

export default LessonDetailCard;
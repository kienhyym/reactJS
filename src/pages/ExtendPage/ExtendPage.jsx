import React from "react";
import { useNavigate } from "react-router-dom";
import "./ExtendPage.css";

const ExtendPage = () => {

  const navigate = useNavigate();

  return (
    <div className="coming-container">

      <div className="coming-card">

        <div className="icon">🚧</div>

        <h1>Chức năng kiến thức mở rộng đang được cập nhật</h1>

        <p>
          Trang này đang được phát triển. <br />
          Vui lòng quay lại sau.
        </p>

        <button onClick={() => navigate("/")}>
          ⬅ Quay về trang chủ
        </button>

      </div>

    </div>
  );
};

export default ExtendPage;
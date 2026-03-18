import { message } from "antd";
import { getKnowledge } from "../../api/Knowledge";
import KnowledgeItem from "./KnowledgeItem/KnowledgeItem";
import "./KnowledgePage.css";
import { useContext, useEffect, useRef, useState } from "react";
import LoadingPage from "../../component/loadingPage/LoadingPage";
import { AuthContext } from "../../component/context/authContext";
import { startApp } from "../../util/apiHeath";

const KnowledgePage = () => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true);
  const { auth, setAtuh } = useContext(AuthContext)
  const hasCalled = useRef(false);
  useEffect(() => {
    const getData = async () => {
      setLoading(true)
      if (hasCalled.current) return;
      hasCalled.current = true;
      const res = await startApp(getKnowledge, auth, setAtuh)
      if (res) {
        setData(res.data);
      } else {
        message.error("lỗi lấy dữ liệu")
      }
      setLoading(false)
    }
    getData();
  }, [])

  if (loading) {
    return <LoadingPage title="🧩 Tổng hợp kiến thức" />
  }
  return (

    <div className="knowledge-container">

      <h1 className="page-title">🧩 Tổng hợp kiến thức</h1>

      <div className="knowledge-list">

        {data.map(item => (
          <KnowledgeItem
            key={item._id}
            item={item}
          />
        ))}

      </div>

    </div>

  );

};

export default KnowledgePage;
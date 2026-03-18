import { message } from "antd";
import { getKnowledge } from "../../api/Knowledge";
import KnowledgeItem from "./KnowledgeItem/KnowledgeItem";
import "./KnowledgePage.css";
import { useEffect, useState } from "react";
import LoadingPage from "../../component/loadingPage/LoadingPage";

const KnowledgePage = () => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      const res = await getKnowledge()
      if (res) {
        setData(res.data)
      }
      else {
        message.error("Lỗi lấy dữ liệu")
      }
      setLoading(false)
    }
    getData()
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
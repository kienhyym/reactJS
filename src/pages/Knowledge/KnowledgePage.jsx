import { message } from "antd";
import { getKnowledge } from "../../api/Knowledge";
import "./KnowledgePage.css";
import { useContext, useEffect, useRef, useState } from "react";
import LoadingPage from "../../component/loadingPage/LoadingPage";
import { AuthContext } from "../../component/context/authContext";
import { startApp } from "../../util/apiHeath";
import 'react-pdf/dist/Page/AnnotationLayer.css';
import KnowledgePdfCard from "./KnowledgePdfCard/KnowledgePdfCard";


const KnowledgePage = () => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true);
  const { auth, setAtuh } = useContext(AuthContext)
  const containerRef = useRef();
  const [width, setWidth] = useState(1200);

  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setWidth(containerRef.current.offsetWidth);
      }
    };

    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

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
          item.imageUrl.slice(-4) === '.pdf' ?
            <KnowledgePdfCard data={item} width={width} containerRef={containerRef} key={item._id} />
            :
            <img src={item.imageUrl} alt={item.title} key={item._id}  />
        ))}
      </div>

    </div>

  );

};

export default KnowledgePage;
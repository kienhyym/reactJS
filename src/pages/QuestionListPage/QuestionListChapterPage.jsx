import { notification } from "antd";
import { useContext, useEffect, useRef, useState } from "react";
import {  getOpenChapters } from "../../api/Lesson";
import { startApp } from "../../util/apiHeath";
import { AuthContext } from "../../component/context/authContext";
import QuestionListPage from "./QuestionListPage";
import "./QuestionListPage";
import LoadingPage from "../../component/loadingPage/LoadingPage";

const QuestionListChapterPage = () => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true);
    const { auth, setAtuh } = useContext(AuthContext)
    const hasCalled = useRef(false);
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            if (hasCalled.current) return;
            hasCalled.current = true;
            const res = await startApp(getOpenChapters, auth, setAtuh)
            if (res) {
                setData(res.data);
            } else {
                notification.error({
                    message: 'Lỗi',
                    description: res?.message || 'Có lỗi xảy ra khi lấy danh sách người dùng',
                });
            }
            setLoading(false)
        }
        fetchData()
    }, [])
    if (loading) {
        return <LoadingPage title="✍ Câu hỏi ôn tập" style={{
            background: `linear-gradient(
    135deg,
    #e0f7fa,
    #fce4ec
  )`}} />
    }
    return (
        <div className="question-container">
            <h1 className="page-title">✍ Câu hỏi ôn tập</h1>
            {data?.map((item, index) => {
                return (
                    <div className="question-grid" key={item._id}>
                        <h3  style={{textTransform:'uppercase'}}>{item?.title} {item?.name}</h3>
                        <QuestionListPage data={item.lectures} />
                    </div>
                )
            })}
        </div>
    )
}
export default QuestionListChapterPage;
import { notification } from "antd";
import { useContext, useEffect, useRef, useState } from "react";
import {  getOpenChapters } from "../../api/Lesson";
import { startApp } from "../../util/apiHeath";
import { AuthContext } from "../../component/context/authContext";
import LessonList from "./LessonList";
import "./LessonList.css";
import LoadingPage from "../../component/loadingPage/LoadingPage";

const LessonListChapter = () => {
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
        return <LoadingPage title="📖 Danh sách bài giảng" />
    }
    return (
        <div className="lesson-container">
            <h1 className="page-title">📖 Danh sách bài giảng</h1>
            {data?.map((item, index) => {
                return (
                    <div className="lesson-list-card" key={item._id}>
                        <h3>{item.title} {item.name}</h3>
                        <LessonList data={item.lectures} />
                    </div>
                )
            })}
        </div>
    )
}
export default LessonListChapter;
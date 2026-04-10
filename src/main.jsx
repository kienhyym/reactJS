import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './style/global.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import RegisterPage from './pages/register.jsx'
import UserPage from './pages/user.jsx'
import HomePage from './pages/Home/HomePage.jsx'
import LoginPage from './pages/login.jsx'
import { AuthWrapper } from './component/context/authContext.jsx'
import QuizPage from './pages/QuizPage/QuizPage.jsx'
import QuestionListPage from './pages/QuestionListPage/QuestionListPage.jsx'
import LessonList from './pages/LessonList/LessonList.jsx'
import LessonDetail from './pages/LessonDetail/LessonDetail.jsx'
import KnowledgePage from './pages/Knowledge/KnowledgePage.jsx'
import ExtendPage from './pages/ExtendPage/ExtendPage.jsx'
import LessonListChapter from './pages/LessonList/LessonListChapter.jsx'
import QuestionListChapterPage from './pages/QuestionListPage/QuestionListChapterPage.jsx'
import TrangChu from './screens/TrangChu/TrangChu.jsx'
import MoRong from './screens/MoRong/MoRong.jsx'
import TongHop from './screens/TongHop/TongHop.jsx'
import DeThi from './screens/DeThi/DeThi.jsx'
import BaiGiang from './screens/BaiGiang/BaiGiang.jsx'
import LamBai from './screens/LamBai/LamBai.jsx'

const checkMobile = () => {
  return window.innerWidth < 768 ||
    /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
};
const isMobile = checkMobile();
console.log("🚀 ~ isMobile:", isMobile)
const ui = localStorage.getItem("interface");
console.log("🚀 ~ ui:", ui === "normally")
const router = createBrowserRouter(
  !isMobile
    ? ui === "normally"? [
      // 📱 MOBILE ROUTES
      {
        path: "/",
        element: <App />,
        children: [
          { index: true, element: <HomePage /> },
          { path: "user", element: <UserPage /> },
          { path: "quiz", element: <QuestionListChapterPage /> },
          { path: "quiz/:lessonId", element: <QuizPage /> },
          { path: "lessons", element: <LessonListChapter /> },
          { path: "lessons/:id", element: <LessonDetail /> },
          { path: "knowledge", element: <KnowledgePage /> },
          { path: "extend", element: <ExtendPage /> },
        ],
      },
      // fallback
      { path: "*", element: <HomePage /> }
    ]: [
      // 💻 DESKTOP ROUTES
      { path: "/", element: <TrangChu /> },
      { path: "/trangchu", element: <TrangChu /> },
      { path: "/morong", element: <MoRong /> },
      { path: "/tonghop", element: <TongHop /> },
      { path: "/dethi", element: <DeThi /> },
      { path: "/baigiang/:id", element: <BaiGiang /> },
      { path: "/lambai/:lessonId", element: <LamBai /> },
      { path: "*", element: <TrangChu /> }
    ]
    :[
      // 📱 MOBILE ROUTES
      {
        path: "/",
        element: <App />,
        children: [
          { index: true, element: <HomePage /> },
          { path: "user", element: <UserPage /> },
          { path: "quiz", element: <QuestionListChapterPage /> },
          { path: "quiz/:lessonId", element: <QuizPage /> },
          { path: "lessons", element: <LessonListChapter /> },
          { path: "lessons/:id", element: <LessonDetail /> },
          { path: "knowledge", element: <KnowledgePage /> },
          { path: "extend", element: <ExtendPage /> },
        ],
      },
      // fallback
      { path: "*", element: <HomePage /> }
    ]
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthWrapper>
      <RouterProvider router={router} />
    </AuthWrapper>
  </React.StrictMode>,
)

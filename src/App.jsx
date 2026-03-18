import { Outlet } from "react-router-dom"
import Header from "./component/layout/header"
import { useContext, useEffect, useRef } from "react"
import './style/main.css'
import { AuthContext } from "./component/context/authContext"
import { homeApi } from "./util/api"
import { startApp } from "./util/apiHeath"

function App() {
  const { auth, setAtuh } = useContext(AuthContext)
  const hasCalled = useRef(false);

  useEffect(() => {
    if (hasCalled.current) return;
    hasCalled.current = true;
    startApp(homeApi, auth, setAtuh)
  }, [])

  return (
    <div className="App">
      <>
        <Header />
        <div className="outlet-main">
          <Outlet />
        </div>
      </>
    </div>

  )
}

export default App

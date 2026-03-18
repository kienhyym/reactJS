import { Outlet } from "react-router-dom"
import Header from "./component/layout/header"
import { useContext, useEffect } from "react"
import './style/main.css'
import { AuthContext } from "./component/context/authContext"

function App() {
  const { auth, setAtuh } = useContext(AuthContext)

  async function waitForServer(url, timeout = 60000) {
    const start = Date.now();

    while (Date.now() - start < timeout) {
      try {
        const res = await fetch(url);

        if (res.ok) {
          console.log("Server ready");
          return true;
        }
      } catch (err) {
        console.log("Server not ready, retrying...");
      }

      await new Promise(r => setTimeout(r, 3000)); // chờ 3s rồi thử lại
    }

    throw new Error("Server did not start in time");
  }
  async function startApp() {
    try {
      await waitForServer("https://hoc8.onrender.com/v1/api");
      setAtuh({ ...auth, loading: false })
    } catch (err) {
      console.error("Server failed to start", err);
    }
  }

  useEffect(() => {
    setAtuh({ ...auth, loading: true })
    startApp()
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

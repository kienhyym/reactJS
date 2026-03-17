import { Outlet } from "react-router-dom"
import Header from "./component/layout/header"
import axios from "./util/axios.custiomzie"
import { useContext, useEffect } from "react"
import { AuthContext } from "./component/context/authContext"
import { use } from "react"
import { homeApi } from "./util/api"
import './style/main.css'

function App() {

  async function fetchData() {
    const res = await fetch("https://hoc8.onrender.com/v1/api");
      console.log("Server warming, retrying...",res);

    if (res.status === 503) {
      const data = await res.json();
      console.log("Server warming, retrying...End");
      await new Promise(r => setTimeout(r, data.retry_after * 1000));
      return fetchData();
    }

    return res.json();
  }

  useEffect(() => {
    fetchData()
  }, [])
  return (
    <div className="App">
      {/* {loading ? <div>Loading...</div> : */}
      <>
        <Header />
        <div className="outlet-main">
          <Outlet />
        </div>
      </>
      {/* } */}
    </div>

  )
}

export default App

import { Outlet } from "react-router-dom"
import Header from "./component/layout/header"
import axios from "./util/axios.custiomzie"
import { useContext, useEffect } from "react"
import { AuthContext } from "./component/context/authContext"
import { use } from "react"
import { homeApi } from "./util/api"
import './style/main.css'

function App() {

  useEffect(() => {
    const checkApi = async () => {
      const res = await homeApi();
    }
    checkApi()
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

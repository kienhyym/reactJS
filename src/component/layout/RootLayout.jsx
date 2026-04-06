import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import usePlatform from "../../util/usePlatform";

const RootLayout = () => {
  const { isMobile } = usePlatform();
  const navigate = useNavigate();

  useEffect(() => {
    if (isMobile) {
      navigate("/trangchu");
    }
  }, [isMobile]);

  return <Outlet />; // 👈 QUAN TRỌNG
};

export default RootLayout;
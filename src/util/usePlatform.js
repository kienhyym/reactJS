import { useEffect, useState } from "react";

const usePlatform = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  console.log("🚀 ~ usePlatform ~ isMobile:", isMobile)

  return { isMobile };
};

export default usePlatform;
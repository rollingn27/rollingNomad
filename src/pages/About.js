import React, { useContext, useEffect, useState } from "react";
import LoggerContext from "../contexts/logger";

const About = () => {
  const [isChange, setIsChange] = useState(false);
  const { log } = useContext(LoggerContext);
  const confirmMessage =
    "변경사항이 있습니다. 정말로 이 페이지를 나가시겠습니까?";
  useEffect(() => {
    const handleBeforeUnload = (event) => {
      if (isChange) {
        event.returnValue = confirmMessage;
        return confirmMessage;
      }
    };

    const handlePopstate = () => {
      if (isChange) {
        const navigateFlag = window.confirm(confirmMessage);
        if (!navigateFlag) {
          window.history.pushState(null, "", window.location.href);
        }
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    window.addEventListener("popstate", handlePopstate);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("popstate", handlePopstate);
    };
  }, [isChange]);

  const handleInputChange = () => {
    setIsChange(true);
  };
  const onTest = () => {
    log("About", "log test");
  };
  return (
    <div>
      <h1>2페이지</h1>
      <div onClick={onTest}>페이지 벗어나기 테스트</div>
      <input onChange={handleInputChange}></input>
      벗어나기상태: {isChange ? "true" : "false"}
    </div>
  );
};

export default About;

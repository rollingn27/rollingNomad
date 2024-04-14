import { useEffect, useState } from "react";
import ColorBox from "../components/ColorBox";
import { ColorProvier } from "../contexts/color";
import SelectColors from "../components/SelectColor";
import { useContext } from "react";
import LoggerContext from "../contexts/logger";
import { Link } from "react-router-dom";

const Home = () => {
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
      console.log("destroy");
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("popstate", handlePopstate);
    };
  }, [isChange]);

  const handleInputChange = () => {
    setIsChange(true);
  };
  const testLog = () => {
    log("Home", "Log Test");
  };
  return (
    <>
      <div>
        <h1>1페이지</h1>
        <div onClick={testLog}>페이지 벗어나기 테스트</div>
        <Link to="/about">About</Link>
        <input onChange={handleInputChange}></input>
        <br />
        <input onChange={handleInputChange}></input>
        벗어나기상태: {isChange ? "true" : "false"}
      </div>
      <ColorProvier>
        <SelectColors />
        <ColorBox />
      </ColorProvier>
    </>
  );
};

export default Home;

import "../styles/CompleteWriting.css";

import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import Menu from "../components/Menu";
import icon_home from "../assets/icon_home.png";
import icon_menu from "../assets/icon_menu.png";
import img_btn from "../assets/CompleteWriting_btn.png";

const CompleteWriting = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [openMenu, setOpenMenu] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const userNickname = sessionStorage.getItem("nickname");

  const theme = location.state?.theme || "1";

  const themes = {
    1: "rememory",
    2: "birthday",
    3: "graduration",
    4: "love",
    5: "christmas",
    6: "parents",
    7: "teacher",
  };

  import(`../styles/theme/${themes[theme]}.css`);

  const menuHandler = () => {
    if (!isLoaded) {
      setIsLoaded(true);
    }
    setOpenMenu(!openMenu);
  };

  const newCapsule = () => {
    navigate("/capsule/settings/theme");
  };

  return (
    <div className={`CompleteWriting`}>
      <div className="btn_top">
        <img
          className="icon_home"
          alt=""
          src={icon_home}
          onClick={() => {
            userNickname ? navigate(`/login/kakao/home`) : navigate(`/`);
          }}
        />
        <img
          className="icon_menu"
          alt=""
          src={icon_menu}
          onClick={menuHandler}
        />
      </div>
      {isLoaded && (
        <div className={`menu ${openMenu ? "open" : ""}`}>
          <Menu menuHandler={menuHandler} />
        </div>
      )}

      <div className="img_check" alt=""></div>
      <p className="text_Complete">편지 작성 완료!</p>
      <div className="img_capsule" alt="" />

      <div className="chat">
        <div alt="" />
        <p>캡슐이 열리길 기다리는 동안 ••</p>
      </div>

      <div className="btn" onClick={newCapsule}>
        <img alt="" src={img_btn} />
        <p>새로운 캡슐 만들러가기</p>
      </div>
    </div>
  );
};

export default CompleteWriting;

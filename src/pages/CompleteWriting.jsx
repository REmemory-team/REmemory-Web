//편지 작성 완료 화면

import "../styles/CompleteWriting.css";

import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import Menu from "../components/Menu";
import icon_home from "../assets/icon_home.png";
import icon_menu from "../assets/icon_menu.png";
import img_check from "../assets/CompleteWring_check.png";
import img_capsule from "../assets/기본 캡슐이미지1.png";
import img_chat from "../assets/CompleteWriting_chat.png";
import img_btn from "../assets/CompleteWriting_btn.png";

const CompleteWriting = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [openMenu, setOpenMenu] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const userNickname = sessionStorage.getItem("nickname");

  const theme = location.state ? location.state.theme : "";
  const status = location.state ? location.state.status : "";
  const isPcapsule = location.state && location.state.pcapsule_name;

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
    <div className={["CompleteWriting", theme].join(" theme")}>
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
        <div className={["menu", openMenu].join(" ")}>
          <Menu menuHandler={menuHandler} />
        </div>
      )}
      <img className="img_check" alt="" src={img_check} />
      <p className="text_Complete">편지 작성 완료!</p>
      <img className="img_capsule" alt="" src={img_capsule} />

      <div className="chat">
        <img alt="" src={img_chat} />
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

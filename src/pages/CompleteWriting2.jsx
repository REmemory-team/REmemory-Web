import "../styles/CompleteWriting2.css";

import { useLocation, useNavigate } from "react-router-dom";

import CheckIcon from "../assets/check_icon";
import Menu from "../components/Menu";
import MetaTag from "../components/seo/SEOMetaTag";
import React from "react";
import icon_home from "../assets/icon_home.png";
import icon_menu from "../assets/icon_menu.png";
import { useState } from "react";

export default function Complete() {
  const location = useLocation();
  const navigate = useNavigate();
  // const theme = location.state.theme;
  let theme = 1; // 기본 테마
  if (location.state && location.state.theme) {
    theme = location.state.theme;
  }
  const userNickname = sessionStorage.getItem("nickname");
  const [openMenu, setOpenMenu] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const menuHandler = () => {
    if (!isLoaded) {
      setIsLoaded(true);
    }
    setOpenMenu(!openMenu);
  };
  const newCapsule = () => {
    if (sessionStorage.getItem("token")) {
      navigate("/capsule/settings/theme");
    } else {
      navigate("/");
    }
  };

  return (
    <div className={`complete complete-theme${theme}`}>
      <MetaTag
        title="RE:memory"
        description="감정을 기억하고 선물하다, RE:memory 
    감정을 기억하고 선물할 수 있는 온라인 롤링페이퍼, 편지, 타임캡슐 서비스"
        keywords="RE:memory, 감정을 기억하고 선물하다, 온라인 롤링페이퍼, 온라인 편지, 온라인 타임캡슐, 롤링페이퍼, 편지, 타임캡슐"
      />
      <div className="complete__top">
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
      <div className="complete__message">
        <div style={{ marginBottom: "1rem" }}>
          {theme === 1 && <CheckIcon color="white" />}
          {theme === 2 && <CheckIcon color="#5F3619" />}
          {theme === 3 && <CheckIcon color="#7D5871" />}
          {theme === 4 && <CheckIcon color="white" />}
          {theme === 5 && <CheckIcon color="white" />}
          {theme === 6 && <CheckIcon color="white" />}
          {theme === 7 && <CheckIcon color="white" />}
        </div>
        <span className={`complete__message-theme${theme}`}>
          편지 작성 완료!
        </span>
      </div>
      <img
        src={require(`../assets/capsule${theme}.png`)}
        alt="캡슐 이미지"
        className={`img-theme${theme}`}
        style={{ marginBottom: "3rem" }}
      ></img>
      <div className="complete__waiting">
        <img
          src={require(`../assets/chat${theme}.png`)}
          alt="chat"
          className={`img-chat${theme}`}
        ></img>
        <p>캡슐이 열리길 기다리는 동안..</p>
      </div>
      <button className="complete__btn" onClick={newCapsule}>
        새로운 캡슐 만들러 가기
      </button>
      <iframe
        src="https://ads-partners.coupang.com/widgets.html?id=775712&template=carousel&trackingCode=AF7731510&subId=&width=320&height=90&tsource="
        width="320"
        height="90"
        frameborder="0"
        scrolling="no"
        referrerPolicy="unsafe-url"
        browsingtopics
      ></iframe>
      <div>
        <p style={{ fontSize: "10px", color: "#495057" }}>
          쿠팡 파트너스 활동을 통해 일정액의 수수료를 제공받을 수 있음
        </p>
      </div>
    </div>
  );
}

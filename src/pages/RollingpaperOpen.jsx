// 롤링페이퍼 타임캡슐 오픈 시 화면

import "../styles/RollingpaperOpen.css";

import { useLocation, useNavigate } from "react-router-dom";

import React from "react";
import RollingpaperContents from "../components/RollingpaperContents";

// import rollingContentsTest from "../Data/rollingContentsTest";

export default function RollingpaperOpen() {
  const location = useLocation();
  const navigate = useNavigate();

  const backBtnHandler = () => {
    navigate(-1);
  };
  const homeBtnHandler = () => {
    if (sessionStorage.getItem("token")) {
      navigate("/login/kakao/home"); // 로그인한 경우 "홈 화면"으로 이동
    } else {
      navigate("/"); // 로그인하지 않은 경우 "웹 처음 입장 시" 화면으로 이동
    }
  };

  return (
    <div
      className={`rollingpaper-open-page rolling-open-page-theme${location.state.theme}`}
    >
      <div className="top-menu">
        <img
          src="../assets/back-button.svg"
          alt="Back"
          className="back-btn"
          onClick={backBtnHandler}
        />
        <img
          src="../assets/home-button.svg"
          alt="Home"
          className="home-btn"
          onClick={homeBtnHandler}
        />
      </div>
      <div className="rolling-capsule-name">캡슐 이름</div>
      {location.state.rcapsule_cnt.map((item, index) => {
        return (
          <RollingpaperContents
            key={item.id}
            sender={item.sender}
            format={item.content_type}
            theme={location.state.theme}
            recipient={location.state.dear_name}
            contents={item.contents}
          />
        );
      })}
    </div>
  );
}

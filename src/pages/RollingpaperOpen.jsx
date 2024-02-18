// 롤링페이퍼 타임캡슐 오픈 시 화면

import "../styles/RollingpaperOpen.css";

import { useLocation, useNavigate } from "react-router-dom";

import { ReactComponent as BackIcon } from "../assets/back_btn.svg";
import { ReactComponent as BackIcon2 } from "../assets/back_btn2.svg";
import { ReactComponent as HomeIcon } from "../assets/home_btn.svg";
import { ReactComponent as HomeIcon2 } from "../assets/home_btn2.svg";
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

  const darkIcon = location.state.theme === 2 || location.state.theme === 4;
  const BackIconToUse = darkIcon ? BackIcon2 : BackIcon;
  const HomeIconToUse = darkIcon ? HomeIcon2 : HomeIcon;

  console.log(location.state.rcapsules);

  return (
    <div
      className={`rollingpaper-open-page rolling-open-page-theme${location.state.theme}`}
    >
      <div className="top-menu">
        <BackIconToUse className="back-btn" onClick={backBtnHandler} />
        <HomeIconToUse className="home-btn" onClick={homeBtnHandler} />
      </div>
      <div className="rolling-capsule-name">{location.state.rcapsule_name}</div>
      {location.state.rcapsules.map((item, index) => {
        return (
          <RollingpaperContents
            key={item.writer_id}
            writerId={item.writer_id}
            sender={item.from_name}
            format={item.content_type}
            theme={location.state.theme}
            recipient={location.state.dear_name}
          />
        );
      })}
    </div>
  );
}

import "../styles/RollingpaperOpen.css";

import { useLocation, useNavigate } from "react-router-dom";

import { ReactComponent as BackIcon } from "../assets/back_btn.svg";
import { ReactComponent as BackIcon2 } from "../assets/back_btn2.svg";
import { ReactComponent as HomeIcon } from "../assets/home_btn.svg";
import { ReactComponent as HomeIcon2 } from "../assets/home_btn2.svg";
import React from "react";
import RollingpaperContents from "../components/RollingpaperContents";

export default function RollingpaperOpen() {
  const location = useLocation();
  const navigate = useNavigate();

  const backBtnHandler = () => {
    navigate(-1);
  };
  const homeBtnHandler = () => {
    if (sessionStorage.getItem("token")) {
      navigate("/login/kakao/home");
    } else {
      navigate("/");
    }
  };

  const darkIcon = location.state.theme === 2 || location.state.theme === 3;
  const BackIconToUse = darkIcon ? BackIcon2 : BackIcon;
  const HomeIconToUse = darkIcon ? HomeIcon2 : HomeIcon;

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

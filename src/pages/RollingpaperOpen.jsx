import "../styles/RollingpaperOpen.css";

import { useLocation, useNavigate } from "react-router-dom";

import { ReactComponent as BackIcon } from "../assets/back_btn.svg";
import { ReactComponent as BackIcon2 } from "../assets/back_btn2.svg";
import { ReactComponent as HomeIcon } from "../assets/home_btn.svg";
import { ReactComponent as HomeIcon2 } from "../assets/home_btn2.svg";
import MetaTag from "../components/seo/SEOMetaTag";
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
      <MetaTag
        title="RE:memory"
        description="감정을 기억하고 선물하다, RE:memory 
    감정을 기억하고 선물할 수 있는 온라인 롤링페이퍼, 편지, 타임캡슐 서비스"
        keywords="RE:memory, 감정을 기억하고 선물하다, 온라인 롤링페이퍼, 온라인 편지, 온라인 타임캡슐, 롤링페이퍼, 편지, 타임캡슐"
      />
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

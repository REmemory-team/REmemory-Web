import "../styles/ReceivedText.css";

import { useLocation, useNavigate } from "react-router-dom";

import { ReactComponent as BackIcon } from "../assets/back_btn.svg";
import { ReactComponent as BackIcon2 } from "../assets/back_btn2.svg";
import { ReactComponent as HomeIcon } from "../assets/home_btn.svg";
import { ReactComponent as HomeIcon2 } from "../assets/home_btn2.svg";
import MetaTag from "../components/seo/SEOMetaTag";
import React from "react";

export default function ReceivedText() {
  const navigate = useNavigate();
  const location = useLocation();

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
      className={`received-text-page received-text-page-theme${location.state.theme}`}
    >
      <MetaTag
        title="RE:memory"
        description="감정을 기억하고 선물하다, RE:memory 
    감정을 기억하고 선물할 수 있는 온라인 롤링페이퍼, 편지, 타임캡슐 서비스"
        keywords="RE:memory, 감정을 기억하고 선물하다, 온라인 롤링페이퍼, 온라인 편지, 온라인 타임캡슐, 롤링페이퍼, 편지, 타임캡슐"
      />
      <div className="top-menu">
        <BackIconToUse
          className="back-btn"
          onClick={backBtnHandler}
          style={{ cursor: "pointer" }}
        />
        <HomeIconToUse
          className="home-btn"
          onClick={homeBtnHandler}
          style={{ cursor: "pointer" }}
        />
      </div>
      <div className="text-contents-box">
        <p className="received-recipient">To. {location.state.dear_name}</p>
        <div className={`text-contents align-${location.state.align_type}`}>
          {location.state.text_img_data.map((item, index) => {
            if (item.body) {
              return <p key={index}>{item.body}</p>;
            } else if (item.image_url) {
              return (
                <img
                  key={index}
                  src={item.image_url}
                  alt={`Content ${index}`}
                />
              );
            }
            return null;
          })}
        </div>
        {location.state.sender && (
          <p className="received-sender">From. {location.state.sender}</p>
        )}
      </div>
    </div>
  );
}

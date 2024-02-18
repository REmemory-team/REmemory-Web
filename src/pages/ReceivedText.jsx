// 글&사진 편지 확인

import "../styles/ReceivedText.css";

import { useLocation, useNavigate } from "react-router-dom";

import { ReactComponent as BackIcon } from "../assets/back_btn.svg";
import { ReactComponent as BackIcon2 } from "../assets/back_btn2.svg";
import { ReactComponent as HomeIcon } from "../assets/home_btn.svg";
import { ReactComponent as HomeIcon2 } from "../assets/home_btn2.svg";
import React from "react";

export default function ReceivedText() {
  const navigate = useNavigate();
  const location = useLocation();

  // 받는 사람, 보낸 사람, 편지 내용, 테마 정보 필요

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

  return (
    <div
      className={`received-text-page received-text-page-theme${location.state.theme}`}
    >
      <div className="top-menu">
        <BackIconToUse className="back-btn" onClick={backBtnHandler} />
        <HomeIconToUse className="home-btn" onClick={homeBtnHandler} />
      </div>
      <div className="text-contents-box">
        <p className="received-recipient">To. {location.state.dear_name}</p>
        <div className={`text-contents align-${location.state.align_type}`}>
          {location.state.text_img_data.map((item, index) => {
            if (item.body) {
              // 텍스트 데이터가 있는 경우
              return <p key={index}>{item.body}</p>;
            } else if (item.image_url) {
              // 이미지 데이터가 있는 경우
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

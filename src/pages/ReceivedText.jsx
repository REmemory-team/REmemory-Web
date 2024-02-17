// 글&사진 편지 확인

import "../styles/ReceivedText.css";

import { useLocation, useNavigate } from "react-router-dom";

import React from "react";

// import 생일1 from "../assets/생일축하2.jpg";

// import textTest from "../Data/textTest";

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

  return (
    <div
      className={`received-text-page received-text-page-theme${location.state.theme}`}
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

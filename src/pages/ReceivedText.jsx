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
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="27"
          height="19"
          viewBox="0 0 27 19"
          fill="none"
          className="back-btn"
          onClick={backBtnHandler}
        >
          <path
            d="M26.625 8.04167H5.96042L11.1812 2.80625L9.125 0.75L0.375 9.5L9.125 18.25L11.1812 16.1938L5.96042 10.9583H26.625V8.04167Z"
            fill="white"
          />
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="26"
          height="24"
          viewBox="0 0 26 24"
          fill="none"
          className="home-btn"
          onClick={homeBtnHandler}
        >
          <path
            d="M12.9167 0C12.9167 0 4.92642 6.8975 0.461125 10.633C0.319038 10.7568 0.204561 10.9091 0.125122 11.08C0.0456818 11.2509 0.00305301 11.4366 0 11.625C0 11.9676 0.136086 12.2961 0.37832 12.5383C0.620555 12.7806 0.949095 12.9167 1.29167 12.9167H3.875V21.9583C3.875 22.3009 4.01109 22.6294 4.25332 22.8717C4.49556 23.1139 4.8241 23.25 5.16667 23.25H9.04167C9.38424 23.25 9.71278 23.1139 9.95501 22.8717C10.1972 22.6294 10.3333 22.3009 10.3333 21.9583V16.7917H15.5V21.9583C15.5 22.3009 15.6361 22.6294 15.8783 22.8717C16.1206 23.1139 16.4491 23.25 16.7917 23.25H20.6667C21.0092 23.25 21.3378 23.1139 21.58 22.8717C21.8223 22.6294 21.9583 22.3009 21.9583 21.9583V12.9167H24.5417C24.8842 12.9167 25.2128 12.7806 25.455 12.5383C25.6973 12.2961 25.8333 11.9676 25.8333 11.625C25.8315 11.433 25.7861 11.2438 25.7003 11.072C25.6146 10.9001 25.4909 10.75 25.3386 10.633C20.9043 6.8975 12.9167 0 12.9167 0Z"
            fill="white"
            fill-opacity="0.9"
          />
        </svg>
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

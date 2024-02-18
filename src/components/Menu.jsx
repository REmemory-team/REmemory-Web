// 캡슐 확인 - 메뉴

import "../styles/Menu.css";

import boundary_line from "../assets/boundary_line.png";
import icon_capsule from "../assets/icon_capsule.png";
import icon_chat from "../assets/icon_chat.png";
import icon_close from "../assets/icon_close.png";
import icon_instagram from "../assets/icon_instagram.png";
import icon_profile from "../assets/icon_profile.png";
import icon_setting from "../assets/icon_setting.png";
import image_logo from "../assets/image_logo.png";
import text_logo from "../assets/text_logo.png";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const Menu = ({ menuHandler }) => {
  const navigate = useNavigate();
  //임시
  // const userName = "린서";
  const { Kakao } = window;

  useEffect(() => {
    const initKakao = async () => {
      if (!Kakao.isInitialized()) {
        Kakao.init(process.env.REACT_APP_KAKAO_API_KEY);
      }
    };
    initKakao();
  }, []);

  const loginHandler = async () => {
    try {
      const isAndroid = Boolean(navigator.userAgent.match(/Android/i));
      const isIOS = Boolean(navigator.userAgent.match(/iPhone|iPad|iPod/i));

      await Kakao.Auth.authorize({
        redirectUri: "http://rememory.site",
        throughTalk: isAndroid ? false : isIOS ? false : true,
      });
    } catch (error) {
      console.error("Kakao login error:", error);
    }
  };

  const goInstagram = () => {
    window.open("https://www.instagram.com/rememory_official", "_blank");
  };

  const closeMenu = () => {
    menuHandler();
  };
  const userNickname = sessionStorage.getItem("nickname");
  console.log(userNickname);

  return (
    <div className="Menu">
      <img className="btn_close" alt="" src={icon_close} onClick={closeMenu} />
      <div className="buttons">
        {userNickname ? (
          <div>
            <div className="button_section">
              <img className="profile" alt="" src={icon_profile} />
              <div className="profile">
                <button>{userNickname} 님</button>
                <p>카카오톡으로 로그인 중</p>
              </div>
            </div>
            <div className="button_section">
              <img alt="" src={icon_setting} />
              <button
                onClick={() => {
                  navigate("/login/kakao/settings");
                }}
              >
                계정 설정
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="button_section">
              <img className="profile" alt="" src={icon_profile} />
              <div className="profile">
                <button onClick={loginHandler}>로그인</button>
                <p>현재 비로그인 상태입니다.</p>
              </div>
            </div>
          </div>
        )}
        <div className="button_section">
          <img alt="" src={icon_capsule} />
          <button
            onClick={() => {
              navigate("/capsule/input-number");
            }}
          >
            타임캡슐 조회
          </button>
        </div>
        <img className="line" alt="" src={boundary_line} />
        <div className="button_section">
          <img alt="" src={icon_chat} />
          <button>질문/문의</button>
        </div>
        <div className="button_section">
          <img alt="" src={icon_instagram} />
          <button onClick={goInstagram}>인스타그램</button>
        </div>
      </div>
      <div className="logo">
        <img className="image" alt="logo_rememory" src={image_logo} />
        <img className="text" alt="logo_rememory" src={text_logo} />
        {/* <p>RE:memory</p> */}
      </div>
    </div>
  );
};

export default Menu;

// 캡슐 확인 - 메뉴

import "../styles/Menu.css";

import boundary_line from "../assets/boundary_line.png";
import icon_capsule from "../assets/icon_capsule.png";
import icon_chat from "../assets/icon_chat.png";
import icon_close from "../assets/icon_close.png";
import icon_instagram from "../assets/icon_instagram.png";
import icon_profile from "../assets/icon_profile.png";
import icon_setting from "../assets/icon_setting.png";
import { useState } from "react";

const Menu = ({ menuHandler }) => {
  const userName = "린서";
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSocial, setIsSocial] = useState(true);

  const loginHandler = () => {
    setIsLoggedIn(!isLoggedIn);
  };
  const closeMenu = () => {
    menuHandler();
  };

  return (
    <div className="Menu">
      <img className="btn_close" alt="" src={icon_close} onClick={closeMenu} />
      <div className="buttons">
        {isLoggedIn ? (
          <div>
            <div className="button_section">
              <img className="profile" alt="" src={icon_profile} />
              <div className="profile">
                <button>{userName} 님</button>
                {isSocial && <p>카카오톡으로 로그인 중</p>}
              </div>
            </div>
            <div className="button_section">
              <img alt="" src={icon_setting} />
              <button>계정 설정</button>
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
          <button>타임캡슐 조회</button>
        </div>
        <img className="line" alt="" src={boundary_line} />
        <div className="button_section">
          <img alt="" src={icon_chat} />
          <button>질문/문의</button>
        </div>
        <div className="button_section">
          <img alt="" src={icon_instagram} />
          <button>인스타그램</button>
        </div>
      </div>
    </div>
  );
};

export default Menu;

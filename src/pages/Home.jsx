// 카카오 로그인 - 홈 화면

import "../styles/Home.css";

import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import ListItem from "../components/CapsuleListItem.jsx";
import Menu from "../components/Menu";
//import axios from "axios";
import capsuleImg1 from "../assets/capsule_list1.png";
import capsuleImg2 from "../assets/capsule_list2.png";
import capsuleImg3 from "../assets/capsule_list3.png";
import capsuleImg4 from "../assets/capsule_list4.png";
import capsuleImg5 from "../assets/capsule_list5.png";
import capsuleImg6 from "../assets/capsule_list6.png";
import capsuleImg7 from "../assets/capsule_list7.png";
import closeIcon from "../assets/icon_x.svg";
import icon_menu from "../assets/icon_menu.png";
import starIcon from "../assets/Vector.svg";

export default function Home() {
  const location = useLocation();
  const navigate = useNavigate();

  const [openMenu, setOpenMenu] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [popupOpen, setPopupOpen] = useState("");
  const [capsuleList, setCapsuleList] = useState([]);

  const capsuleImages = [
    capsuleImg1,
    capsuleImg2,
    capsuleImg3,
    capsuleImg4,
    capsuleImg5,
    capsuleImg6,
    capsuleImg7,
  ];
  const maxCapsule = 50;

  //const token = sessionStorage.getItem("token");
  //const userId = sessionStorage.getItem("userId");
  //const userNickname = sessionStorage.getItem("nickname");
  const userNickname = location.state.nickname;

  /*useEffect(() => {
    if (popupOpen) {
      //캡슐 목록 받아오기
      /*axios
        .get(`${process.env.REACT_APP_API_BASE_URL}/capsule/retrieve/all`, {
          params: {
            userId: userId,
          },
          headers: {
            authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          console.log("팝업-서버응답:", response);
          setCapsuleList(response.data.result.capsules);
        })
        .catch((error) => {
          console.error("팝업-오류:", error);
        });

    }
  }, [popupOpen, token, userId]);
  */

  //홈화면 메뉴
  const menuHandler = () => {
    if (!isLoaded) {
      setIsLoaded(true);
    }
    setOpenMenu(!openMenu);
  };

  //만들기 버튼 누를시
  const handleSetting = () => {
    navigate("/capsule/settings/theme");
  };

  //내가 만든 타임캡슐 버튼 누를시(팝업창)
  const handleChecking = () => {
    setPopupOpen(true);
  };

  //캡슐번호로 타임캡슐 확인 버튼 누를시
  const handleInputNumber = () => {
    navigate("/capsule/input-number");
  };

  //팝업창 닫기
  const handleClosePopup = () => {
    setPopupOpen(false);
  };

  return (
    <div className="home">
      <img
        className="image_menu"
        src={icon_menu}
        alt="메뉴아이콘"
        onClick={menuHandler}
      />

      {isLoaded && (
        <div className={["menu", openMenu].join(" ")}>
          <Menu menuHandler={menuHandler} />
        </div>
      )}

      <div className="image_box">
        <div className="capsule_image"></div>
        <span>?</span>
      </div>
      
      <div className="button_box">
          <button className="home_btn button_main" onClick={handleSetting}>
            타임캡슐 만들기
          </button>
          <button className="home_btn button_main" onClick={handleChecking}>
            내가 만든 타임캡슐
          </button>
          <button className="home_btn button_input_number" onClick={handleInputNumber}>
            캡슐번호로 타임캡슐 확인
          </button>
      </div>

      {popupOpen && (
        <div className="capsule_popup">
          <div className="popup_header">
            <img id="star" src={starIcon} alt="별아이콘" />
            <span>
              {userNickname}의 타임캡슐 목록 ({capsuleList.length}/{maxCapsule})
            </span>
            <img
              id="x"
              src={closeIcon}
              alt="닫기아이콘"
              onClick={handleClosePopup}
            />
          </div>
          <div className="content_box">
            {capsuleList.map((capsule, index) => (
              <ListItem
                key={index}
                imgSrc={capsuleImages[capsule.theme - 1]}
                name={capsule.capsule_name}
                number={capsule.capsule_number}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

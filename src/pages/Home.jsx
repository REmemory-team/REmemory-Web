// 카카오 로그인 - 홈 화면

import "../styles/Home.css";

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import capsuleImg1 from "../assets/capsule_list1.png";
import capsuleImg2 from "../assets/capsule_list2.png";
import capsuleImg3 from "../assets/capsule_list3.png";
import capsuleImg4 from "../assets/capsule_list4.png";
import capsuleImg5 from "../assets/capsule_list5.png";
import closeIcon from "../assets/icon_x.svg";
import starIcon from "../assets/Vector.svg";
import icon_menu from "../assets/icon_menu.png";

import Menu from "../components/Menu";
import ListItem from "../components/CapsuleListItem.jsx";

import axios from 'axios';

export default function Home() {

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
    capsuleImg5
  ];
  const maxCapsule = 50;

  const token = sessionStorage.getItem("token");
  const userId = sessionStorage.getItem("userId");
  const userNickname = sessionStorage.getItem("nickname");

  useEffect(()=>{
    if(popupOpen){
    //캡슐 목록 받아오기
      axios.get(`${process.env.REACT_APP_API_BASE_URL}/capsule/retrieve/all`,{
        params: {
          userId : userId,
        },
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("팝업-서버응답:",response);
        setCapsuleList(response.data.result.capsules);
      })
      .catch((error) => {
        console.error('팝업-오류:', error);
      });
   }
  },[popupOpen, token, userId]);

  //홈화면 메뉴
  const menuHandler = () => {
    if(!isLoaded){
      setIsLoaded(true);
    }
    setOpenMenu(!openMenu);
  };

  //만들기 버튼 누를시
  const handleSetting = () => {
    //타임캡슐 만들기로 라우팅
    navigate("/capsule/settings");
  };

  //확인하기 버튼 누를시(팝업창)
  const handleChecking = () => {
    setPopupOpen(true);
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

      { isLoaded && <div className={["menu", openMenu].join(" ")}>
        <Menu menuHandler={menuHandler}/>
      </div>}
      <div className="image_box">
        <div className="capsule_image"></div>
        <span>?</span>
      </div>

      <div className="button_making">
        <button className="home_btn" onClick={handleSetting}>타임캡슐 만들기</button>
      </div>
      <div className="button_checking">
        <button className="home_btn" onClick={handleChecking}>타임캡슐 확인하기</button>
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
            {
              capsuleList.map((capsule,index)=>(
                <ListItem
                key={index}
                imgSrc={capsuleImages[capsule.capsule_theme-1]}
                name={capsule.capsule_name}
                number={capsule.capsule_number}
                />
              ))
            }
          </div>
        </div>
      )}
    </div>
  );
}


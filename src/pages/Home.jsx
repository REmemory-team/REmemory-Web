//홈 화면

import "../styles/Home.css";
import React, { useState, useEffect } from 'react';
//import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

import starIcon from '../assets/Vector.svg';
import closeIcon from '../assets/icon_x.svg';
import capsuleImg1 from '../assets/capsule_list1.png';
import capsuleImg2 from '../assets/capsule_list2.png';
import capsuleImg3 from '../assets/capsule_list3.png'; 


export default function Home() {
  const location = useLocation();
  const userInfo = location.state;

  const navigate = useNavigate();

  const [popupOpen, setPopupOpen] = useState("");

  const numberOfCapsules = 3;

  //const [capsules, setCapsules] = useState("");

  /*useEffect(() => {
    if(userInfo && userInfo.userNickname){
      console.log(userInfo.userNickname);
    }
  },[userInfo]);*/

  // useEffect(()=>{
  //   const capsuleData = async () => {
  //     try{
  //       const response = await axios.get('serverURL');
  //       setCapsules(response.data);
  //     }
  //     catch(error){
  //       console.log(error);
  //     }
  //   };

  //   capsuleData();
  // },[]);

  //만들기 버튼 누를시
  const handleSetting = () => {
    //타임캡슐 만들기로 라우팅
    navigate('/capsuleSetting');
  };

  //확인하기 버튼 누를시(팝업창) 
  const handleChecking = () => {
    setPopupOpen(true);
  };

  //팝업창 닫기
  const handleClosePopup = () => {
    setPopupOpen(false);
  };

  // const capsuleImg = (id) => {
  //   const capsuleNumber = id % 3;
  //   if (capsuleNumber === 1) {
  //     return <img src={capsuleImg1} alt="1번 캡슐" />;
  //   } else if (capsuleNumber === 2) {
  //     return <img src={capsuleImg2} alt="2번 캡슐" />;
  //   } else {
  //     return <img src={capsuleImg3} alt="3번 캡슐" />;
  //   }
  // };

  return (
    <div className="container">
        <div className="image_box">
            <div className="capsule_image"></div>
            <span>?</span>
        </div>

        <div className="button_making">
            <button onClick={handleSetting}>타임캡슐 만들기</button>
        </div>
        <div className="button_checking">
            <button onClick={handleChecking}>타임캡슐 확인하기</button>
        </div>
        
        {popupOpen && (<div className="capsule_popup">
            <div className="popup_header">
                <img src={starIcon} alt="별아이콘"/>
                <span>{userInfo.userNickname}의 타임캡슐 목록 ({numberOfCapsules}/50)</span>
                <img src={closeIcon} alt="닫기아이콘" onClick={handleClosePopup}/>
            </div>
            <div className="content_box">
              {/*
                capsules.map((capsule)=>(
                  <div className="capsule_list">
                    <div className="list_image">
                      <img src={capsuleImg(capsule.id)} />
                    </div>
                    <span>타임캡슐 ${capsule.id}</span>
                  </div>
                ))
              */}
                <div className="capsule_list">
                    <div className="list_image"><img src={capsuleImg1} alt="캡슐이미지1"/></div>
                    <span>타임캡슐 1</span>
                </div>
                <div className="capsule_list">
                    <div className="list_image"><img src={capsuleImg2} alt="캡슐이미지2"/></div>
                    <span>타임캡슐 2</span>
                </div>
                <div className="capsule_list">
                    <div className="list_image"><img src={capsuleImg3} alt="캡슐이미지3"/></div>
                    <span>타임캡슐 3</span>
                </div>
            </div>
        </div>)}
    </div>
  )
}

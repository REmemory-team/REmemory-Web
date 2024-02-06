// 카카오 로그인 - 이름(닉네임) 설정

import "../styles/Nickname.css";

import React, { useState } from "react";

import { useNavigate } from "react-router-dom";

//import axios from 'axios';


export default function Nickname() {
  const [userNickname, setUserNickname] = useState("");
  const maxLength = 10;
  const navigate = useNavigate();

  //로그인 과정에서 받은 데이터
  /*const userToken = 'user_token';
  const userEmail = 'user_mail';
  const userGender = 'user_gender';

  const userData = {
    token: userToken,
    email: userEmail,
    gender: userGender,
    nickname: userNickname,
  }*/

  //사용자가 입력한 닉네임 저장 함수
  const handleInputChange = (event) => {
    setUserNickname(event.target.value);
  };

  //이걸로 할게요! 버튼 누를시
  const handleSubmit = () => {
    if(userNickname.length <= maxLength && userNickname.length > 0){
      navigate("/login/kakao/home", { state: { userNickname } });
      //백엔드로 데이터 넘기기
      /*axios.post(backend, userData)
        .then(response => {
          console.log(response.data);
        })
        .catch(error => {
          console.log(error);
        });*/
    }
    else{
      alert("닉네임은 10자 이내로 설정해 주세요");
    }
  };

  return (
    <div className="nickname_page">
      <div className="label_box">
        <label htmlFor="nickname_input">사용할 닉네임을 입력해주세요!</label>
      </div>

      <div className="nickname_box">
        <input
          type="text"
          id="nickname_input"
          placeholder="입력해주세요"
          value={userNickname}
          onChange={handleInputChange}
          maxLength={maxLength}
        />
        <span>
          {userNickname.length}/{maxLength}
        </span>
      </div>

      <button type="submit" id="nickname_submit" onClick={handleSubmit}>
        이걸로 할게요!
      </button>
    </div>
  );
}

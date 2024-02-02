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

  //닉네임 글자수 확인 함수
  const handleInputChange = (event) => {
    const inputNickname = event.target.value;
    if (inputNickname.length <= maxLength) {
      setUserNickname(inputNickname);
    }
  };

  //이걸로 할게요! 버튼 누를시
  const handleSubmit = () => {
    //백엔드로 데이터 넘기기
    /*axios.post(backend, userData)
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.log(error);
      });*/
    navigate("/login/kakao/home", { state: { userNickname } });
  };

  return (
    <div className="nickname_container">
      <div className="container">
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
    </div>
  );
}

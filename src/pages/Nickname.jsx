// 카카오 로그인 - 이름(닉네임) 설정

import "../styles/Nickname.css";

import React, { useState } from "react";

import { useNavigate } from "react-router-dom";

import axios from "axios";

export default function Nickname() {
  const [userNickname, setUserNickname] = useState("");
  const maxLength = 10;
  const navigate = useNavigate();

  //사용자가 입력한 닉네임 저장 함수
  const handleInputChange = (event) => {
    const inputNickname = event.target.value;
    if (inputNickname.length > maxLength) {
      alert("닉네임은 10자 이내로 설정해 주세요");
    } else setUserNickname(inputNickname);
  };

  //닉네임 유효성 검사
  const validNickname = (nickname) => {
    const regex = /^(?!\s)([ㄱ-ㅎ가-힣a-zA-Z0-9?!@#$%^&*()-_+=~`\s]){1,10}$/;
    return regex.test(nickname);
  };

  //이걸로 할게요! 버튼 누를시
  const handleSubmit = () => {
    if (validNickname(userNickname)) {
      navigate("/login/kakao/home", { state: { userNickname } });
    } else {
      alert("한글, 영어, 숫자, 특수문자로 구성된 닉네임을 입력해 주세요");
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

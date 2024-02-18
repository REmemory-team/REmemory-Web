// 카카오 로그인 - 이름(닉네임) 설정

import "../styles/Nickname.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

export default function Nickname() {
  const [userNickname, setUserNickname] = useState(
    sessionStorage.getItem("nickname") || ""
  );
  const maxLength = 10;
  const navigate = useNavigate();

  //로그인 과정에서 받은 데이터(아이디)
  const userId = sessionStorage.getItem("userId");

  //사용자가 입력한 닉네임 저장 함수
  const handleInputChange = (e) => {
    if(e.target.value.length > maxLength){
      alert("닉네임은 10자 이내로 설정해 주세요");
    }
    else setUserNickname(e.target.value);
  };

  //닉네임 유효성 검사
  const validNickname = (nickname) =>{
    const regex = /^(?!\s)([ㄱ-ㅎㅏ-ㅣ가-힣a-zA-Z0-9?!@#$%^&*()-_+=~`'"\s]){1,10}$/;
    return regex.test(nickname);
  };

  //이걸로 할게요! 버튼 누를시
  const handleSubmit = () => {
    console.log(userNickname);
    if(validNickname(userNickname)){
      sessionStorage.setItem("nickname", nickname);
      const token = sessionStorage.getItem("token");
      axios
        .patch(
          `${process.env.REACT_APP_API_BASE_URL}/user/nickname`,
          {
            userId: userId,
            nickname: userNickname,
          },
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response)=>{
          console.log("서버응답: ",response);
          navigate("/login/kakao/home");
        })
        .catch((error)=>{
          console.log("오류: ",error);
        })
        // navigate("/login/kakao/home", { state: { userNickname } });
    }
    else{
      alert("한글, 영어, 숫자, 특수문자로 구성된 1~10자리 닉네임을 입력해주세요");
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

      <button id="nickname_submit" onClick={handleSubmit}>
        이걸로 할게요!
      </button>
    </div>
  );
}
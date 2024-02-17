// 카카오 로그인 - 이름(닉네임) 설정

import "../styles/Nickname.css";

import React, { useState, useEffect } from "react";

import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Nickname() {
  const [userNickname, setUserNickname] = useState("");

  const maxLength = 10;
  const navigate = useNavigate();

  //로그인 과정에서 받은 데이터(아이디)
  const userId = sessionStorage.getItem("userId");

  useEffect(() => {
    // 세션 스토리지에서 닉네임을 가져와서 설정합니다.
    const storedNickname = sessionStorage.getItem("userNickname");
    if (storedNickname !== null) {
      setUserNickname(storedNickname);
    }
  }, []);

  const handleInputChange = (e) => {
    setUserNickname(e.target.value);
  };

  //닉네임 유효성 검사
  const validNickname = (nickname) => {
    const regex =
      /^(?!\s)([ㄱ-ㅎㅏ-ㅣ가-힣a-zA-Z0-9?!@#$%^&*()-_+=~`'"\s]){1,10}$/;
    return regex.test(nickname);
  };

  //이걸로 할게요! 버튼 누를시
  const handleSubmit = () => {
    if (validNickname(userNickname)) {
      // Bearer 토큰 가져오기
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
        .then((response) => {
          console.log("서버응답: ", response);
          navigate("/login/kakao/home");
        })
        .catch((error) => {
          console.log("오류: ", error);
        });
    } else {
      alert(
        "한글, 영어, 숫자, 특수문자로 구성된 1~10자리 닉네임을 입력해주세요"
      );
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

import "../styles/Nickname.css";

import React, { useState } from "react";

import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Nickname() {
  const [userNickname, setUserNickname] = useState("");
  const maxLength = 10;
  const navigate = useNavigate();

  const userId = sessionStorage.getItem("userId");

  const handleInputChange = (e) => {
    if (e.target.value.length > maxLength) {
      alert("닉네임은 10자 이내로 설정해 주세요");
    } else setUserNickname(e.target.value);
  };

  const validNickname = (nickname) => {
    const regex =
      /^(?!\s)([ㄱ-ㅎㅏ-ㅣ가-힣a-zA-Z0-9?!@#$%^&*()-_+=~`'"\s]){1,10}$/;
    return regex.test(nickname);
  };

  const handleSubmit = () => {
    if (validNickname(userNickname)) {
      navigate("/login/kakao/home", {
        state: {
          nickname: userNickname,
        },
      });
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
          sessionStorage.setItem("nickname", userNickname);
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

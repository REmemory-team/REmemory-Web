// 2,3번 용도 시작 - 타임캡슐 받을 사람 입력

import "../styles/RecipientInput.css";

import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function RecipientInput() {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = location.state.theme; // 이전 페이지에서 가져온 테마 정보
  const purpose = location.state.purpose; // 이전 페이지에서 가져온 용도 정보
  const [recipient, setRecipient] = useState(""); // 받는 사람 정보를 저장할 상태 변수

  const handleRecipientChange = (event) => {
    setRecipient(event.target.value);
  };
  // 다했어요! 버튼을 누르면 실행되는 함수
  const doneBtnHandler = () => {
    if (!recipient) {
      alert("타임캡슐을 받을 사람을 적어주세요!");
    } else if (purpose === "toSomeone") {
      // 용도2인 경우, 작성 형식 선택 화면으로 이동
      // 받는 사람, 테마 정보 전달
      navigate("/capsule/letter-format", {
        state: {
          recipient: recipient,
          theme: theme,
        },
      });
    } else if (purpose === "rollingPaper") {
      // 용도3인 경우, 캡슐번호 & URL 부여 화면으로 이동
      navigate("/capsule/assign-number-url");
    }
  };

  return (
    <div className="recipient-input-page">
      <p className="recipient-input-message">
        타임캡슐을 받을 사람을 적어주세요!
      </p>
      <div className="recipient-input-field">
        <span className="prefix-to">To. </span>
        <input
          className="recipient"
          onChange={handleRecipientChange}
          maxLength="10"
        ></input>
      </div>
      <button className="recipient-page-done-btn" onClick={doneBtnHandler}>
        다했어요!
      </button>
    </div>
  );
}

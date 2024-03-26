// 2,3번 용도 시작 - 타임캡슐 받을 사람 입력

import "../styles/RecipientInput.css";

import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import axios from "axios";

export default function RecipientInput() {
  const navigate = useNavigate();
  const location = useLocation();
  const purpose = location.state.purpose; // 용도
  const [recipient, setRecipient] = useState(""); // 받는 사람

  const userId = sessionStorage.getItem("userId");
  const token = sessionStorage.getItem("token");

  const handleRecipientChange = (event) => {
    setRecipient(event.target.value);
  };
  // 다했어요! 버튼을 누르면 실행되는 함수
  const doneBtnHandler = () => {
    if (!recipient) {
      alert("타임캡슐을 받을 사람을 적어주세요!");
    } else if (purpose === "toSomeone") {
      // 용도2인 경우, 작성 형식 선택 화면으로 이동
      navigate("/capsule/letter-format", {
        state: {
          pcapsule_name: location.state.pcapsule_name,
          open_date: location.state.open_date,
          dear_name: recipient,
          theme: location.state.theme,
          purpose: location.state.purpose,
        },
      });
    } else if (purpose === "rollingPaper") {
      // 용도3인 경우
      // 캡슐번호 & URL 부여 화면으로 이동 (캡슐 번호, URL 전달)
      axios
        .post(
          `${process.env.REACT_APP_API_BASE_URL}/rcapsule/create`,
          {
            rcapsule_name: location.state.pcapsule_name,
            open_date: location.state.open_date,
            dear_name: recipient,
            theme: location.state.theme,
          },
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          if (response.status === 200) {
            console.log(response);
            navigate("/capsule/assign-number-url", {
              state: {
                capsule_number: response.data.result.capsule_number,
                capsule_url: response.data.result.url,
              },
            });
          }
        })
        .catch((error) => {
          console.error(error);
          if (error.response.status === 400) {
            alert("잘못된 요청입니다.");
          } else {
            alert("오류가 발생했습니다.");
          }
        });
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
          type="text"
          value={recipient}
          className="recipient"
          onChange={handleRecipientChange}
          maxLength={10}
        ></input>
      </div>
      <button className="recipient-page-done-btn" onClick={doneBtnHandler}>
        다했어요!
      </button>
    </div>
  );
}

// URL 들어왔을 시 화면

import "../styles/EnterURL.css";

import React, { useEffect, useState } from "react";

import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function EnterURL() {
  const navigate = useNavigate();
  const [recipient, setRecipient] = useState(""); // 서버로부터 가져온 받는 사람 정보 저장할 상태 변수
  const [theme, setTheme] = useState(""); // 서버로부터 가져온 테마 정보 저장할 상태 변수
  const [sender, setSender] = useState(""); // 보내는 사람 저장할 상태 변수
  const [charNum, setCharNum] = useState(0); // 보내는 사람 글자 수 세기 위한 상태 변수

  // 서버로부터 받는 사람, 테마 정보 가져오기
  // URL 정보를 서버에 전송?
  useEffect(() => {
    axios
      .get("서버_URL")
      .then((response) => {
        setRecipient(response.data.recipient);
        setTheme(response.data.theme);
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  }, []);

  const handleSenderChange = (event) => {
    setSender(event.target.value);
    setCharNum(event.target.value.length);
  };
  // 정했어요! 버튼 누르면 실행되는 함수
  const decisionBtnHandler = () => {
    if (!sender) {
      alert("자신을 알려주세요!");
    } else {
      // 작성 형식 선택 화면으로 이동
      // 받는 사람, 테마, 보내는 사람 정보 전달
      navigate("/capsule/letter-format", {
        state: { recipient: recipient, theme: theme, sender: sender },
      });
    }
  };

  return (
    <div className="url-page">
      <p className="url-recipient-message">받는 사람!</p>
      <div className="url-recipient">To. </div>
      <p className="url-sender-message">자신을 알려주세요!</p>
      <div className="sender-input-field">
        <input
          className="sender"
          onChange={handleSenderChange}
          maxLength="10"
          placeholder="입력해주세요"
        ></input>
        <span className="count-char-num">{charNum}/10</span>
      </div>
      <div className="how-to-write">
        <p className="how-to-write-title">
          &nbsp;&nbsp;롤링페이퍼 작성 방법 설명
        </p>
        <p className="how-to-write-content">
          • 해당 링크로 접속 시 접속자 개별적으로 이름과 <br />
          &nbsp;&nbsp;&nbsp;간단한 비밀번호를 설정하게 됩니다.
        </p>
        <p className="how-to-write-content">
          • 이름과 비밀번호를 설정하였다면 개별적으로 롤링페이퍼를 <br />
          &nbsp;&nbsp;&nbsp;받으시는 분께 편지 혹은 음성녹음을 첨부하실 수 있게
          됩니다.
        </p>
        <p className="how-to-write-content">
          • 첨부하면 롤링페이퍼를 받으시는 분의 <br />
          &nbsp;&nbsp;&nbsp;타임캡슐에 자동적으로 등록됩니다!
        </p>
      </div>
      <button className="url-page-decision-btn" onClick={decisionBtnHandler}>
        정했어요!
      </button>
    </div>
  );
}

// URL 들어왔을 시 화면

import "../styles/EnterURL.css";

import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import axios from "axios";

export default function EnterURL() {
  const { rcapsule_number } = useParams();
  const navigate = useNavigate();
  const [recipient, setRecipient] = useState(""); // 서버로부터 가져온 받는 사람 정보 저장할 상태 변수
  const [theme, setTheme] = useState(""); // 서버로부터 가져온 테마 정보 저장할 상태 변수
  const [sender, setSender] = useState(""); // 보내는 사람 저장할 상태 변수
  const [charNum, setCharNum] = useState(0); // 보내는 사람 글자 수 세기 위한 상태 변수
  const purpose = "rollingPaper";

  console.log(rcapsule_number);

  // 서버로부터 받는 사람, 테마 정보 가져오기
  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_API_BASE_URL}/rcapsule/url_info/${rcapsule_number}`
      )
      .then((response) => {
        if (response.status === 200) {
          setRecipient(response.data.result.dear_name);
          setTheme(response.data.result.theme);
        }
      })
      .catch((error) => {
        console.log(error);
        if (error.response.status === 400) {
          alert("잘못된 요청입니다.");
        } else {
          alert("오류가 발생했습니다.");
        }
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
        state: {
          dear_name: recipient,
          theme: theme,
          sender: sender,
          purpose: purpose,
          capsule_number: rcapsule_number,
        },
      });
    }
  };

  return (
    <div className="url-page">
      <p className="url-recipient-message">받는 사람!</p>
      <div className="url-recipient">To. {recipient}</div>
      <p className="url-sender-message">자신을 알려주세요!</p>
      <div className="sender-input-field">
        <input
          type="text"
          value={sender}
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
          • 해당 링크에서는 접속자 개별적으로 내용을 작성할 수 있습니
          <br />
          &nbsp;&nbsp;&nbsp;다.
        </p>
        <p className="how-to-write-content">
          • 이 화면에서 설정한 닉네임으로 작성 완료 시, 롤링페이퍼를
          <br />
          &nbsp;&nbsp;&nbsp;받으시는 분의 타임캡슐에 자동적으로 등록됩니다!
        </p>
      </div>
      <button className="url-page-decision-btn" onClick={decisionBtnHandler}>
        정했어요!
      </button>
    </div>
  );
}

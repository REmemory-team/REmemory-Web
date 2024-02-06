// 캡슐번호로 타임캡슐 확인

import "../styles/CheckCapsuleByNumber.css";

import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function CheckCapsuleByNumber() {
  const navigate = useNavigate();
  const [capsuleNum, setCapsuleNum] = useState(""); // 캡슐 번호 저장할 상태 변수
  const [password, setPassword] = useState(""); // 비밀번호 저장할 상태 변수
  const [capsuleName, setCapsuleName] = useState("");
  const [openDate, setOpenDate] = useState("");
  const [dearName, setDearName] = useState("");
  const [theme, setTheme] = useState("");
  const [status, setStatus] = useState("");

  const handleCapsuleNumChange = (event) => {
    setCapsuleNum(event.target.value);
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  // 확인 버튼 누르면 실행되는 함수
  const confirmBtnHandler = () => {
    // 서버에 캡슐 번호와 비밀번호 전송
    // 서버로부터 캡슐 번호, 캡슐 이름, 오픈 날짜, 받는 사람, 테마, 상태 정보 받아와 캡슐 확인페이지로 전달
    axios
      .get("/pcapsule/retrieve", {
        capsule_number: capsuleNum,
        password: password,
      })
      .then((response) => {
        setCapsuleNum(response.data.capsule_number);
        setCapsuleName(response.data.pcapsule_name);
        setOpenDate(response.data.open_data);
        setDearName(response.data.dear_name);
        setTheme(response.data.theme);
        setStatus(response.data.status);
        navigate("/capsule/verify", {
          state: {
            status: status,
            capsule_number: capsuleNum,
            password: password,
            pcapsule_name: capsuleName,
            open_data: openDate,
            dear_name: dearName,
            theme: theme,
          },
        });
        // 비밀번호가 올바르지 않은 경우, 없는 캡슐 번호일 경우 처리
      })
      .catch(function (error) {
        console.log(error);
        alert("오류가 발생했습니다.");
      });
  };

  return (
    <div className="check-capsule-page">
      <p className="check-capsule-message">캡슐번호로 타임캡슐 확인하기</p>
      <input
        type="text"
        value={capsuleNum}
        onChange={handleCapsuleNumChange}
        placeholder="캡슐번호를 입력해주세요"
        className="number-input-field"
      ></input>
      <br />
      <input
        type="password"
        value={password}
        onChange={handlePasswordChange}
        placeholder="비밀번호를 입력해주세요"
        className="password-input-field"
      ></input>
      <br />
      <button onClick={confirmBtnHandler} className="capsule-check-btn">
        확인
      </button>
    </div>
  );
}

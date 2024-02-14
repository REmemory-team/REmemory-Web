// 캡슐번호 부여 (용도1&2)

import "../styles/CapsuleCodeAssignment.css";

import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { CopyToClipboard } from "react-copy-to-clipboard";
import Copyimg from "../assets/Copy.png";
import axios from "axios";

const CapsuleCodeAssignment = ({ initialNickname }) => {
  // const [capsuleNumber, setCapsuleNumber] = useState("");
  const [copied, setCopied] = useState(false);
  // const [nickname, setNickname] = useState(initialNickname || "");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  // useEffect(() => {
  //   generateCapsuleNumber();
  // }, [nickname]);

  // const generateCapsuleNumber = () => {
  //   const randomNum = Math.floor(Math.random() * 1000);
  //   const paddedRandomNum = randomNum.toString().padStart(4, "0");
  //   const newCapsuleNumber = `${paddedRandomNum} ${nickname}`;
  //   setCapsuleNumber(newCapsuleNumber);
  //   setCopied(false);

  //   // 백엔드 API로 캡슐번호 비밀번호 전송
  //   axios
  //     .post("https://dev.mattie3e.store/pcapsule/create/savePassword", {
  //       capsule_number: location.state.capsule_number,
  //       pcapsule_password: password,
  //     })
  //     .then((response) => {
  //       console.log(response);
  //     })
  //     .catch((error) => {
  //       console.error("Error while sending capsule number:", error);
  //     });
  // };

  const handleCopyClick = () => {
    console.log("카피 완료!");
    setCopied(true);
    setTimeout(() => setCopied(false), 820);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSavePassword = () => {
    // 비밀번호가 숫자로만 구성되어 있고, 길이가 6자리인지 확인
    if (/^\d{6}$/.test(password)) {
      // 비밀번호가 유효한 경우
      axios
        .post("https://dev.mattie3e.store/pcapsule/create/savePassword", {
          capsule_number: location.state.capsule_number,
          pcapsule_password: password,
        })
        .then((response) => {
          if (response.status === 200) {
            window.alert("타입캡슐이 성공적으로 생성되었습니다!");
            navigate("/login/kakao/home");
          }
        })
        .catch((error) => {
          console.error("Error while sending capsule number:", error);
        });
    } else {
      // 비밀번호가 유효하지 않은 경우
      window.alert("비밀번호는 숫자 6자리여야 합니다.");
    }
  };

  return (
    <div className="capsule-code-assignment">
      <p className="message">캡슐번호를 기억하세요!</p>
      <div className="code-box">
        <div className="code-container">
          <span className="code">캡슐번호&nbsp;</span>
          <span className="assigned-code">
            |&nbsp;{location.state.capsule_number}
          </span>
        </div>
        <div className="copy-container">
          <img src={Copyimg} alt="복사하기" className="copy-img" />
          <CopyToClipboard
            text={location.state.capsule_number}
            onCopy={handleCopyClick}
          >
            <span className="copy">복사</span>
          </CopyToClipboard>
        </div>
      </div>
      <div className="password-box">
        <span className="password">비밀번호&nbsp;&nbsp;</span>
        <span className="divide">|&nbsp;&nbsp;</span>
        <input
          type="password"
          maxLength="6"
          value={password}
          onChange={handlePasswordChange}
          placeholder="숫자 6자"
          className="password-input"
        ></input>
      </div>
      <div className="guide-box">
        <p className="guide-title">&nbsp;&nbsp;꼭 읽어보세요!</p>
        <p className="guide-content">
          • 캡슐번호는 홈화면에서 “타임캡슐 확인하기"를 통해 다시 확
          <br />
          &nbsp;&nbsp;&nbsp;인하실 수 있습니다.
        </p>
        <p className="guide-content">
          • 비밀번호는 설정 후 변경할 수 없으며, 캡슐을 오픈할 때 캡슐
          <br />
          &nbsp;&nbsp;&nbsp;번호와 함께 쓰이기 때문에 꼭 기억해주세요.
        </p>
      </div>
      <button className="btn" onClick={handleSavePassword}>
        확인했어요!
      </button>
      {copied && <div className="copied-message">복사되었습니다!</div>}
    </div>
  );
};

export default CapsuleCodeAssignment;

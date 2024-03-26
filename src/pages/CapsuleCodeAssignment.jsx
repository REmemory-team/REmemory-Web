// 캡슐번호 부여 (용도1&2)

import "../styles/CapsuleCodeAssignment.css";

import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { CopyToClipboard } from "react-copy-to-clipboard";
import Copyimg from "../assets/Copy.png";
import axios from "axios";

const CapsuleCodeAssignment = ({ initialNickname }) => {
  const [copied, setCopied] = useState(false);
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const handleCopyClick = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 820);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSavePassword = () => {
    // 비밀번호가 숫자로만 구성되어 있고, 길이가 6자리인지 확인
    if (/^\d{6}$/.test(password)) {
      axios
        .post(
          `${process.env.REACT_APP_API_BASE_URL}/pcapsule/create/savePassword`,
          {
            capsule_number: location.state.capsule_number,
            pcapsule_password: password,
          }
        )
        .then((response) => {
          if (response.status === 200) {
            window.alert("타입캡슐이 성공적으로 생성되었습니다!");
            navigate("/login/kakao/home", { state: { nickname: "리메모리" } });
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
    } else {
      window.alert("비밀번호는 숫자 6자리여야 합니다.");
    }
  };

  return (
    <div className="capsule-code-assignment">
      <div className="container">
        <p className="message">캡슐번호를 기억하세요!</p>
        <div className="code-box">
          <div className="code-container">
            <span className="code">캡슐번호&nbsp;</span>
            {location.state && location.state.capsule_number ? (
              <span className="assigned-code">
                |&nbsp;{location.state.capsule_number}
              </span>
            ) : (
              <span className="assigned-code">|&nbsp;capsule number</span>
            )}
          </div>
          <div className="copy-container">
            <img src={Copyimg} alt="복사하기" className="copy-img" />
            <CopyToClipboard
              text={location.state?.capsule_number}
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
          <p className="guide-title">&nbsp;&nbsp;캡슐번호와 비밀번호</p>
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
    </div>
  );
};

export default CapsuleCodeAssignment;

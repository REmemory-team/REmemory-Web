import "../styles/URLnCodeAssignment.css";

import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { CopyToClipboard } from "react-copy-to-clipboard";
import Copyimg from "../assets/Copy.png";
import axios from "axios";

const URLnCodeAssignment = () => {
  const [copied, setCopied] = useState(false);
  const [copiedUrl, setCopiedUrl] = useState(false);
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const handleCopyClick = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 820);
  };

  const handleCopyUrlClick = () => {
    setCopiedUrl(true);
    setTimeout(() => setCopiedUrl(false), 820);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSavePassword = () => {
    if (/^\d{6}$/.test(password)) {
      axios
        .patch(
          `${process.env.REACT_APP_API_BASE_URL}/rcapsule/${location.state.capsule_number}`,
          {
            rcapsule_password: password,
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
    <div className="url-code-assignment">
      <p className="message">캡슐번호와 URL을 기억하세요!</p>
      <div className="code-box">
        <div className="code-container">
          <span className="code">캡슐번호&nbsp;&nbsp;</span>
          {location.state && location.state.capsule_number ? (
            <span className="assigned-code">
              |&nbsp;&nbsp;{location.state.capsule_number}
            </span>
          ) : (
            <span className="assigned-code">|&nbsp;&nbsp;capsule number</span>
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
      <div className="url-box">
        <div className="url">롤링페이퍼 URL</div>
        <div className="url-copy-container">
          {location.state && location.state.capsule_url ? (
            <>
              <span className="assigned-url">{location.state.capsule_url}</span>
              <img src={Copyimg} alt="복사하기" className="copy-img" />
              <CopyToClipboard
                text={location.state.capsule_url}
                onCopy={handleCopyUrlClick}
              >
                <span className="copy">복사</span>
              </CopyToClipboard>
            </>
          ) : (
            <span className="assigned-url">No URL available</span>
          )}
        </div>
      </div>
      <div className="guide-box">
        <p className="guide-title">&nbsp;&nbsp;캡슐번호와 비밀번호</p>
        <p className="guide-content">
          &nbsp;&nbsp;&nbsp;• 캡슐 번호는 홈 화면에서 "타임캡슐 확인하기"를 통해
          다시 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;확인하실 수 있습니다.
        </p>
        <p className="guide-content">
          &nbsp;&nbsp;&nbsp;• 비밀번호는 설정 후 변경할 수 없으며, 캡슐을 오픈할
          때 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;캡슐 번호와 함께 쓰이기 때문에
          꼭 기억해 주세요.
        </p>
        <p className="guide-title">&nbsp;&nbsp;롤링페이퍼 작성 방법 설명</p>
        <p className="guide-content">
          &nbsp;&nbsp;&nbsp;• 해당 링크로 접속 시 접속자 개별적으로 내용을
          작성할 수 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;있습니다.
        </p>
        <p className="guide-content">
          &nbsp;&nbsp;&nbsp;• 작성 완료 시 롤링페이퍼를 받으시는 분의 타임캡슐에
          자 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;동적으로 등록됩니다!
        </p>
      </div>
      <button className="btn" onClick={handleSavePassword}>
        확인했어요!
      </button>
      {copied && <div className="copied-message">복사되었습니다!</div>}
      {copiedUrl && <div className="copied-message2">복사되었습니다!</div>}
    </div>
  );
};

export default URLnCodeAssignment;

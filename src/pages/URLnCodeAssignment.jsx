import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CopyToClipboard } from "react-copy-to-clipboard";
import "../styles/URLnCodeAssignment.css";
import Copyimg from "../assets/Copy.png";

const URLnCodeAssignment = () => {
  const [capsuleNumber, setCapsuleNumber] = useState("");
  const [copied, setCopied] = useState(false);
  const [url, setUrl] = useState("");
  const [copiedUrl, setCopiedUrl] = useState(false);
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    generateCapsuleNumber();
    generateUrl();
  }, []);

  const generateCapsuleNumber = () => {
    const randomNum = Math.floor(Math.random() * 1000);
    const paddedRandomNum = randomNum.toString().padStart(4, "0");
    const newCapsuleNumber = `${paddedRandomNum}`;
    setCapsuleNumber(newCapsuleNumber);
    setCopied(false);
  };

  const handleCopyClick = () => {
    console.log("카피 완료!");
    setCopied(true);
  };

  const generateUrl = () => {
    // URL 생성 로직 추가 (예: 서버에서 고유한 URL을 가져오거나 자체 로직으로 생성)
    const newUrl = "https://example.com/" + generateRandomString();
    setUrl(newUrl);
    setCopiedUrl(false);
  };

  const generateRandomString = () => {
    // 원하는 길이의 랜덤 문자열 생성 로직 추가
    const length = 6;
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
      result += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    return result;
  };

  const handleCopyUrlClick = () => {
    setCopiedUrl(true);
  };

  const handlePasswordChange = (e) => {
    console.log("비밀번호 입력:", e.target.value);
    setPassword(e.target.value);
  };

  const handleSavePassword = () => {
    // 비밀번호를 어디에 어떻게 저장할지 상의 후 추가
    console.log("비밀번호 저장 완료!");
    navigate("/");
    window.alert("타입캡슐이 성공적으로 생성되었습니다!");
  };

  return (
    <div className="URLnCodeAssignment">
      <div className="text-2">캡슐번호와 URL을 기억하세요!</div>
      <div className="box2-1">
        <div className="copy2">
          <span className="CapsuleNumbertext2-1">캡슐번호</span>
          <CopyToClipboard text={capsuleNumber} onCopy={handleCopyClick}>
            <span className="CapsuleNumbertext2-2">
              {" "}
              &nbsp;&nbsp;| &nbsp;{capsuleNumber}
            </span>
          </CopyToClipboard>
        </div>
      </div>

      <div className="Copy2">
        <img src={Copyimg} alt="복사하기" />
      </div>
      <div className="CopyText2" onClick={() => handleCopyClick()}>
        복사
      </div>

      <div className="box2-2">
        <div className="password-input2">
          <span className="passwordtext2">비밀번호 &nbsp;</span>
          <input
            className=".input"
            type="password"
            value={password}
            onChange={handlePasswordChange}
            placeholder="비밀번호 (숫자 6자)"
          />
        </div>
      </div>

      <div className="box2-3">
        <span className="URLtext">롤링페이퍼 URL</span>
        <CopyToClipboard text={url} onCopy={handleCopyUrlClick}>
          <span className="URLtext2">{url}</span>
        </CopyToClipboard>
      </div>
      <div className="reading-box-2"></div>
      <div className="reading-text2-1">롤링페이퍼 작성 방법 설명</div>
      <div className="reading-text2-2">
        <ul>
          <li>
            해당 링크로 접속 시 접속자 개별적으로 이름과 간단한 비밀번호를
            설정하게 됩니다.
          </li>
          <li>
            이름과 비밀번호를 설정하였다면 개별적으로 롤링페이퍼를 받으시는 분께
            편지 혹은 음성녹음을 첨부하실 수 있게 됩니다.
          </li>
          <li>
            첨부하면 롤링페이퍼를 받으시는 분의 타임캡슐에 자동적으로
            등록됩니다!
          </li>
        </ul>
      </div>
      <div className="reading-text2-3">꼭 읽어보세요!</div>
      <div className="reading-text2-4">
        <ul>
          <li>비회원이실 경우 캡슐번호 분실 시 찾으실 수 없습니다.</li>
          <li>
            카카오톡으로 로그인 하셨을 경우 RE:memory 카카오톡 플러스친구를 통해
            캡슐번호를 전송해 드립니다!
          </li>
          <li>
            카카오톡으로 로그인 하셨을 경우 로그인 후 만든 타임캡슐 확인이
            가능합니다!
          </li>
        </ul>
      </div>
      <button className="checked-2" onClick={handleSavePassword}>
        확인했어요!
      </button>
    </div>
  );
};

export default URLnCodeAssignment;

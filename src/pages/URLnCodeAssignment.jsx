import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CopyToClipboard } from "react-copy-to-clipboard";
import "../styles/URLnCodeAssignment.css";

const URLnCodeAssignment = () => {
  const [capsuleNumber, setCapsuleNumber] = useState("");
  const [copiedCapsule, setCopiedCapsule] = useState(false);
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
    setCopiedCapsule(false);
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

  const handleCopyCapsuleClick = () => {
    setCopiedCapsule(true);
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
        캡슐번호 |
        <CopyToClipboard text={capsuleNumber} onCopy={handleCopyCapsuleClick}>
          <span style={{ cursor: "pointer" }}>{capsuleNumber}</span>
        </CopyToClipboard>
      </div>
      <div className="box2-2"></div>

      <div className="password-input2">
        <input
          type="password"
          value={password}
          onChange={handlePasswordChange}
          placeholder="비밀번호 (숫자 6자)"
        />
      </div>
      <div className="box2-3">
        URL |
        <CopyToClipboard text={url} onCopy={handleCopyUrlClick}>
          <span style={{ cursor: "pointer" }}>{url}</span>
        </CopyToClipboard>
      </div>
      <div className="reading-box-2"></div>
      <div className="reading-text1"></div>
      <div className="reading-text2"></div>
      <button className="checked-2" onClick={handleSavePassword}>
        확인했어요!
      </button>
    </div>
  );
};

export default URLnCodeAssignment;

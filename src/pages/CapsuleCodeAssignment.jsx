// 캡슐번호 부여 (용도1&2)

import "../styles/CapsuleCodeAssignment.css";

import React, { useEffect, useState } from "react";

import { CopyToClipboard } from "react-copy-to-clipboard";
import Copyimg from "../assets/Copy.png";
import { useNavigate } from "react-router-dom";

const CapsuleCodeAssignment = ({ initialNickname }) => {
  const [capsuleNumber, setCapsuleNumber] = useState("");
  const [copied, setCopied] = useState(false);
  const [nickname, setNickname] = useState(initialNickname || "");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    generateCapsuleNumber();
  }, [nickname]);

  const generateCapsuleNumber = () => {
    const randomNum = Math.floor(Math.random() * 1000);
    const paddedRandomNum = randomNum.toString().padStart(4, "0");
    const newCapsuleNumber = `${paddedRandomNum} ${nickname}`;
    setCapsuleNumber(newCapsuleNumber);
    setCopied(false);
  };

  const handleCopyClick = () => {
    console.log("카피 완료!");
    setCopied(true);
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
    <div className="CapsuleCodeAssignment">
      <div className="text-1">캡슐번호를 기억하세요!</div>
      <div className="box1-1">
        <div className="copy">
          <span className="CapsuleNumbertext1">캡슐번호</span>
          <CopyToClipboard text={capsuleNumber} onCopy={handleCopyClick}>
            <span className="CapsuleNumbertext2">
              {" "}
              &nbsp;&nbsp;| &nbsp;{capsuleNumber}
            </span>
          </CopyToClipboard>
        </div>
      </div>

      <div className="Copy">
        <img src={Copyimg} alt="복사하기" />
      </div>
      <div className="CopyText" onClick={() => handleCopyClick()}>
        복사
      </div>
      <div className="box1-2">
        <div className="password-input">
          {" "}
          <span className="passwordtext1">비밀번호 &nbsp;</span>
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            placeholder="비밀번호 (숫자 6자)"
          />
        </div>
      </div>

      <div className="reading-box-1"></div>
      <div className="reading-text1">꼭 읽어보세요!</div>
      <div className="reading-text2">
        <ul>
          <li>
            비회원이실 경우 <b>캡슐번호 분실 시 찾으실 수 없습니다.</b>
          </li>
          <li>
            카카오톡으로 로그인 하셨을 경우 RE:memory 카카오톡 플러스친구를 통해
            캡슐번호를 전송해 드립니다!
          </li>
          <li>
            카카오톡으로 로그인 하셨을 경우 로그인 후 만든 타임캡슐 확인이
            가능합니다!
          </li>
          <li>
            비밀번호 추가 사용 설명멘트 (찾을 때 사용된다 이런식으로 어떻게
            쓰이는지)
          </li>
        </ul>
      </div>
      <button className="checked-1" onClick={handleSavePassword}>
        확인했어요!
      </button>
    </div>
  );
};

export default CapsuleCodeAssignment;

import "../styles/URLnCodeAssignment.css";

import React, { useEffect, useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import Copyimg from "../assets/Copy.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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

    savePasswordToBackend(newCapsuleNumber, password);
  };

  const savePasswordToBackend = (newCapsuleNumber, password) => {
    axios
      .post(
        `${process.env.REACT_APP_API_BASE_URL}pcapsule/create/savePassword`,
        {
          capsule_number: newCapsuleNumber,
          pcapsule_password: password,
        }
      )
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.error("Error while sending capsule number:", error);
      });
  };

  const handleCopyClick = () => {
    console.log("카피 완료!");
    setCopied(true);
    setTimeout(() => setCopied(false), 820);
  };

  const generateUrl = () => {
    const newUrl = "https://example.com/" + generateRandomString();
    setUrl(newUrl);
    setCopiedUrl(false);
  };

  const generateRandomString = () => {
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
    setTimeout(() => setCopiedUrl(false), 820);
  };

  const handlePasswordChange = (e) => {
    console.log("비밀번호 입력:", e.target.value);
    setPassword(e.target.value);
  };

  const handleSavePassword = () => {
    if (/^\d{6}$/.test(password)) {
      console.log("비밀번호 저장 완료!");
      navigate("/login/kakao/home");
      window.alert("타입캡슐이 성공적으로 생성되었습니다!");
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
          <span className="assigned-code">|&nbsp;&nbsp;{capsuleNumber}</span>
        </div>
        <div className="copy-container">
          <img src={Copyimg} alt="복사하기" className="copy-img" />
          <CopyToClipboard text={capsuleNumber} onCopy={handleCopyClick}>
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
          <span className="assigned-url">{url}</span>
          <img src={Copyimg} alt="복사하기" className="copy-img" />
          <CopyToClipboard text={url} onCopy={handleCopyUrlClick}>
            <span className="copy">복사</span>
          </CopyToClipboard>
        </div>
      </div>
      <div className="guide-box">
        <p className="guide-title">&nbsp;&nbsp;꼭 읽어보세요!</p>
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
    //   <div className="URLnCodeAssignment">
    //     <div className="text-2">캡슐번호와 URL을 기억하세요!</div>
    //     <div className="box2-1">
    //       <div className="copy2">
    //         <span className="CapsuleNumbertext2-1">캡슐번호</span>
    //         <CopyToClipboard text={capsuleNumber} onCopy={handleCopyClick}>
    //           <span className="CapsuleNumbertext2-2">
    //             {" "}
    //             &nbsp;&nbsp;| &nbsp;{capsuleNumber}
    //           </span>
    //         </CopyToClipboard>
    //       </div>
    //     </div>

    //     <div className="Copy2">
    //       <img src={Copyimg} alt="복사하기" />
    //     </div>
    //     <div className="CopyText2" onClick={() => handleCopyClick()}>
    //       복사
    //     </div>

    //     <div className="box2-2">
    //       <div className="password-input2">
    //         <span className="passwordtext2">비밀번호 &nbsp;</span>
    //         <input
    //           className=".input"
    //           type="password"
    //           value={password}
    //           onChange={handlePasswordChange}
    //           placeholder="비밀번호 (숫자 6자)"
    //         />
    //       </div>
    //     </div>

    //     <div className="box2-3">
    //       <span className="URLtext">롤링페이퍼 URL</span>
    //       <CopyToClipboard text={url} onCopy={handleCopyUrlClick}>
    //         <span className="URLtext2">{url}</span>
    //       </CopyToClipboard>
    //     </div>
    //     <div className="reading-box-2"></div>
    //     <div className="reading-text2-1">롤링페이퍼 작성 방법 설명</div>
    //     <div className="reading-text2-2">
    //       <ul>
    //         <li>
    //           해당 링크로 접속 시 접속자 개별적으로 이름과 간단한 비밀번호를
    //           설정하게 됩니다.
    //         </li>
    //         <li>
    //           이름과 비밀번호를 설정하였다면 개별적으로 롤링페이퍼를 받으시는 분께
    //           편지 혹은 음성녹음을 첨부하실 수 있게 됩니다.
    //         </li>
    //         <li>
    //           첨부하면 롤링페이퍼를 받으시는 분의 타임캡슐에 자동적으로
    //           등록됩니다!
    //         </li>
    //       </ul>
    //     </div>
    //     <div className="reading-text2-3">꼭 읽어보세요!</div>
    //     <div className="reading-text2-4">
    //       <ul>
    //         <li>비회원이실 경우 캡슐번호 분실 시 찾으실 수 없습니다.</li>
    //         <li>
    //           카카오톡으로 로그인 하셨을 경우 RE:memory 카카오톡 플러스친구를 통해
    //           캡슐번호를 전송해 드립니다!
    //         </li>
    //         <li>
    //           카카오톡으로 로그인 하셨을 경우 로그인 후 만든 타임캡슐 확인이
    //           가능합니다!
    //         </li>
    //       </ul>
    //     </div>
    //     <button className="checked-2" onClick={handleSavePassword}>
    //       확인했어요!
    //     </button>
    //   </div>
  );
};

export default URLnCodeAssignment;

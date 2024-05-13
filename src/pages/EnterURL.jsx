import "../styles/EnterURL.css";

import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import MetaTag from "../components/seo/SEOMetaTag";
import axios from "axios";

export default function EnterURL() {
  const { rcapsule_number } = useParams();
  const navigate = useNavigate();
  const [recipient, setRecipient] = useState("");
  const [theme, setTheme] = useState("");
  const [sender, setSender] = useState("");
  const [charNum, setCharNum] = useState(0);
  const purpose = "rollingPaper";

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_API_BASE_URL}/rcapsule/url_info/${rcapsule_number}`
      )
      .then((response) => {
        if (response.status === 200) {
          setRecipient(response.data.result.data.dear_name);
          setTheme(response.data.result.data.theme);
        }
      })
      .catch((error) => {
        if (error.response.status === 400) {
          alert("잘못된 요청입니다.");
        } else if (error.response.status === 403) {
          alert("유효하지 않은 타임캡슐입니다.");
        } else {
          alert("오류가 발생했습니다.");
        }
      });
  }, []);

  const handleSenderChange = (event) => {
    setSender(event.target.value);
    setCharNum(event.target.value.length);
  };

  const decisionBtnHandler = () => {
    if (!sender) {
      alert("자신을 알려주세요!");
    } else {
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
      <MetaTag
        title="RE:memory"
        description="감정을 기억하고 선물하다, RE:memory 
    감정을 기억하고 선물할 수 있는 온라인 롤링페이퍼, 편지, 타임캡슐 서비스"
        keywords="RE:memory, 감정을 기억하고 선물하다, 온라인 롤링페이퍼, 온라인 편지, 온라인 타임캡슐, 롤링페이퍼, 편지, 타임캡슐"
      />
      <p className="url-recipient-message">받는 사람!</p>
      <div className="url-recipient">To. {recipient}</div>
      <p className="url-sender-message">자신을 알려주세요!</p>
      <div className="sender-input-field">
        <input
          type="text"
          className="sender"
          onChange={handleSenderChange}
          maxLength={10}
          placeholder="입력해주세요"
        ></input>
        <span className="count-char-num">{charNum}/10</span>
      </div>
      <div className="how-to-write">
        <p className="how-to-write-title">&nbsp;&nbsp;롤링페이퍼 URL</p>
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

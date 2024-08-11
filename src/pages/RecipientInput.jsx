import "../styles/RecipientInput.css";

import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { ReactComponent as BackIcon } from "../assets/back_btn.svg";
import MetaTag from "../components/seo/SEOMetaTag";
import axios from "axios";

export default function RecipientInput() {
  const navigate = useNavigate();
  const location = useLocation();
  const purpose = location.state.purpose;
  const [recipient, setRecipient] = useState("");

  const userId = sessionStorage.getItem("userId");
  const token = sessionStorage.getItem("token");

  const handleRecipientChange = (event) => {
    setRecipient(event.target.value);
  };

  const doneBtnHandler = () => {
    if (!recipient) {
      alert("타임캡슐을 받을 사람을 적어주세요!");
    } else if (purpose === "toSomeone") {
      navigate("/capsule/letter-format", {
        state: {
          pcapsule_name: location.state.pcapsule_name,
          open_date: location.state.open_date,
          dear_name: recipient,
          theme: location.state.theme,
          purpose: location.state.purpose,
        },
      });
    } else if (purpose === "rollingPaper") {
      axios
        .post(
          `${process.env.REACT_APP_API_BASE_URL}/rcapsule/create`,
          {
            rcapsule_name: location.state.pcapsule_name,
            open_date: location.state.open_date,
            dear_name: recipient,
            theme: location.state.theme,
          },
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          if (response.status === 200) {
            navigate("/capsule/assign-number-url", {
              state: {
                capsule_number: response.data.result.capsule_number,
                capsule_url: response.data.result.url,
              },
            });
          }
        })
        .catch((error) => {
          console.error(error);
          if (error.response.status === 400) {
            alert("잘못된 요청입니다.");
          } else {
            alert("오류가 발생했습니다.");
          }
        });
    }
  };

  const backBtnHandler = () => {
    navigate(-1);
  };

  return (
    <div className="recipient-input-page">
      <MetaTag
        title="RE:memory"
        description="감정을 기억하고 선물하다, RE:memory 
    감정을 기억하고 선물할 수 있는 온라인 롤링페이퍼, 편지, 타임캡슐 서비스"
        keywords="RE:memory, 감정을 기억하고 선물하다, 온라인 롤링페이퍼, 온라인 편지, 온라인 타임캡슐, 롤링페이퍼, 편지, 타임캡슐"
      />
      <div className="recipient-input-top">
        <BackIcon onClick={backBtnHandler} style={{ cursor: "pointer" }} />
      </div>
      <p className="recipient-input-message">
        타임캡슐을 받을 사람을 적어주세요!
      </p>
      <div className="recipient-input-field">
        <span className="prefix-to">To. </span>
        <input
          type="text"
          value={recipient}
          className="recipient"
          onChange={handleRecipientChange}
          maxLength={10}
        ></input>
      </div>
      <button className="recipient-page-done-btn" onClick={doneBtnHandler}>
        다했어요!
      </button>
    </div>
  );
}

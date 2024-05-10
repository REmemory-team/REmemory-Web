import "../styles/WritingFormat.css";

import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { ReactComponent as BackIcon } from "../assets/back_btn.svg";
import { ReactComponent as PencilIcon } from "../assets/pencil.svg";
import axios from "axios";

export default function WritingFormat() {
  const location = useLocation();
  const navigate = useNavigate();
  const [format, setFormat] = useState(0);
  const token = sessionStorage.getItem("token");

  const decisionBtnHandler = () => {
    if (!format) {
      alert("작성 형식을 선택해주세요!");
      return;
    }
    if (location.state.purpose === "rollingPaper") {
      if (format === 1) {
        navigate("/capsule/write/text", {
          state: {
            dear_name: location.state.dear_name,
            theme: location.state.theme,
            purpose: location.state.purpose,
            capsule_number: location.state.capsule_number,
            from_name: location.state.sender,
          },
        });
      } else if (format === 2) {
        navigate("/capsule/write/voice", {
          state: {
            dear_name: location.state.dear_name,
            theme: location.state.theme,
            purpose: location.state.purpose,
            capsule_number: location.state.capsule_number,
            from_name: location.state.sender,
          },
        });
      }
    } else {
      axios
        .post(
          `${process.env.REACT_APP_API_BASE_URL}/pcapsule/create`,
          {
            userId: sessionStorage.getItem("userId"),
            pcapsule_name: location.state.pcapsule_name,
            open_date: location.state.open_date,
            dear_name: location.state.dear_name,
            theme: location.state.theme,
            content_type: format,
          },
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          if (response.status === 200) {
            if (format === 1) {
              navigate("/capsule/write/text", {
                state: {
                  dear_name: location.state.dear_name,
                  theme: location.state.theme,
                  purpose: location.state.purpose,
                  capsule_number: response.data.result.capsule_number,
                },
              });
            } else if (format === 2) {
              navigate("/capsule/write/voice", {
                state: {
                  dear_name: location.state.dear_name,
                  theme: location.state.theme,
                  purpose: location.state.purpose,
                  capsule_number: response.data.result.capsule_number,
                },
              });
            }
          }
        })
        .catch(function (error) {
          console.log(error);
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
    <div className="format-select-page">
      <div className="format-top">
        <BackIcon onClick={backBtnHandler} />
      </div>
      <div className="container">
        <div className="division-line1">
          <hr className="line1" />
          <PencilIcon className="pencil-icon" />
          <hr className="line2" />
        </div>
        <p className="person-to-send">To. {location.state.dear_name}</p>
        <p className="select-message">작성할 형식을 선택하세요!</p>
        <div className="select-format">
          <div className="text-container">
            <div
              className={`text ${format === 1 ? "selected-format" : ""}`}
              onClick={() => setFormat(1)}
            >
              글 & 사진
            </div>
          </div>
          <div className="voice-container">
            <div
              className={`voice ${format === 2 ? "selected-format" : ""}`}
              onClick={() => setFormat(2)}
            >
              음성
            </div>
          </div>
        </div>
        <hr className="division-line2" />
        <div className="decision-btn-container">
          <button className="format-decision-btn" onClick={decisionBtnHandler}>
            정했어요!
          </button>
        </div>
      </div>
    </div>
  );
}

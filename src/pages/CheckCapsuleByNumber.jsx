import "../styles/CheckCapsuleByNumber.css";

import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { ReactComponent as BackIcon } from "../assets/back_btn2.svg";
import MetaTag from "../components/seo/SEOMetaTag";
import React from "react";
import axios from "axios";

export default function CheckCapsuleByNumber() {
  const navigate = useNavigate();
  const location = useLocation();
  const [capsuleNum, setCapsuleNum] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (location.state && location.state.capsule_number) {
      setCapsuleNum(location.state.capsule_number);
    }
  }, [location.state]);

  const handleCapsuleNumChange = (event) => {
    setCapsuleNum(event.target.value);
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const confirmBtnHandler = () => {
    if (!capsuleNum) {
      alert("캡슐번호를 입력해주세요.");
      return;
    }
    if (!password) {
      alert("비밀번호를 입력해주세요.");
      return;
    }
    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/capsule/retrieve`, {
        params: {
          capsule_number: capsuleNum,
          capsule_password: password,
        },
      })
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          if (response.data.result.pcapsules) {
            navigate("/capsule/verify", {
              state: {
                capsule_number: response.data.result.pcapsules.capsule_number,
                password: password,
                pcapsule_name: response.data.result.pcapsules.pcapsule_name,
                open_date: response.data.result.pcapsules.open_date,
                dear_name: response.data.result.pcapsules.dear_name,
                theme: response.data.result.pcapsules.theme,
                content_type: response.data.result.pcapsules.content_type,
                status: response.data.result.pcapsules.status,
              },
            });
          } else {
            navigate("/capsule/verify", {
              state: {
                capsule_number: response.data.result.rcapsules.capsule_number,
                password: password,
                rcapsule_name: response.data.result.rcapsules.pcapsule_name,
                open_date: response.data.result.rcapsules.open_date,
                dear_name: response.data.result.rcapsules.dear_name,
                theme: response.data.result.rcapsules.theme,
                rcapsule_cnt: response.data.result.rcapsules.count,
                status: response.data.result.rcapsules.status,
              },
            });
          }
        }
      })
      .catch(function (error) {
        console.log(error);
        if (error.response.status === 404) {
          alert("캡슐을 찾을 수 없습니다.");
        } else if (error.response.status === 400) {
          alert(error.response.data.message);
        } else {
          alert("오류가 발생했습니다.");
        }
      });
  };

  const backBtnHandler = () => {
    navigate(-1);
  };

  return (
    <div className="check-capsule-page">
      <MetaTag
        title="RE:memory"
        description="감정을 기억하고 선물하다, RE:memory 
    감정을 기억하고 선물할 수 있는 온라인 롤링페이퍼, 편지, 타임캡슐 서비스"
        keywords="RE:memory, 감정을 기억하고 선물하다, 온라인 롤링페이퍼, 온라인 편지, 온라인 타임캡슐, 롤링페이퍼, 편지, 타임캡슐"
      />
      <div className="check-capsule-top">
        <BackIcon onClick={backBtnHandler} />
      </div>
      <p className="check-capsule-message">캡슐번호로 타임캡슐 확인하기</p>
      <input
        type="text"
        value={capsuleNum}
        onChange={handleCapsuleNumChange}
        placeholder="캡슐번호를 입력해주세요"
        className="number-input-field"
      ></input>
      <br />
      <input
        type="password"
        value={password}
        onChange={handlePasswordChange}
        placeholder="비밀번호를 입력해주세요"
        className="password-input-field"
        maxLength={6}
      ></input>
      <br />
      <button onClick={confirmBtnHandler} className="capsule-check-btn">
        확인
      </button>
      <iframe
        src="https://ads-partners.coupang.com/widgets.html?id=775712&template=carousel&trackingCode=AF7731510&subId=&width=320&height=90&tsource="
        width="320"
        height="90"
        frameBorder="0"
        scrolling="no"
        referrerPolicy="unsafe-url"
        browsingtopics="true"
      ></iframe>
      <div>
        <p style={{ fontSize: "10px", color: "#495057" }}>
          쿠팡 파트너스 활동을 통해 일정액의 수수료를 제공받을 수 있음
        </p>
      </div>
    </div>
  );
}

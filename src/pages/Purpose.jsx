import "../styles/Purpose.css";

import { useLocation, useNavigate } from "react-router-dom";

import { ReactComponent as BackIcon } from "../assets/back_btn.svg";
import { ReactComponent as LineIcon } from "../assets/Line.svg";
import MetaTag from "../components/seo/SEOMetaTag";
import { ReactComponent as PersonIcon } from "../assets/person.svg";
import { ReactComponent as PersonsIcon } from "../assets/persons.svg";
import React from "react";
import { useState } from "react";

export default function Purpose() {
  const navigate = useNavigate();
  const location = useLocation();
  const [purpose, setPurpose] = useState("");
  const theme = location.state.theme;

  const handleSelection = (purposeOption) => {
    setPurpose(purposeOption);
  };
  const btnHandler = () => {
    if (!purpose) {
      alert("용도를 선택해주세요!");
      return;
    }
    navigate("/capsule/settings/name-date", {
      state: { theme: theme, purpose: purpose },
    });
  };

  const backBtnHandler = () => {
    navigate(-1);
  };

  return (
    <div className={`purpose purpose__theme${theme}`}>
      <MetaTag
        title="RE:memory"
        description="감정을 기억하고 선물하다, RE:memory 
    감정을 기억하고 선물할 수 있는 온라인 롤링페이퍼, 편지, 타임캡슐 서비스"
        keywords="RE:memory, 감정을 기억하고 선물하다, 온라인 롤링페이퍼, 온라인 편지, 온라인 타임캡슐, 롤링페이퍼, 편지, 타임캡슐"
      />
      <div className="purpose-top">
        <BackIcon onClick={backBtnHandler} />
      </div>
      <div className="purpose__wrapper">
        <img
          src={require(`../assets/기본 캡슐이미지${theme}.png`)}
          alt="캡슐 이미지"
          className="purpose__image"
        ></img>
        <p className="purpose__message">어떤 용도의 타임캡슐인지 알려주세요!</p>
        <div className="purpose__options">
          <div
            className={`purpose__option ${
              purpose === "toMe" ? "purpose__selected" : ""
            }`}
            onClick={() => handleSelection("toMe")}
          >
            <PersonIcon className={`purpose__icon${theme} purpose__person`} />

            <p>자신에게 쓰는 거예요!</p>
          </div>
          <div
            className={`purpose__option ${
              purpose === "toSomeone" ? "purpose__selected" : ""
            }`}
            onClick={() => handleSelection("toSomeone")}
          >
            <div className="purpose__icons">
              <PersonIcon className={`purpose__icon${theme} `} />
              <LineIcon className={`purpose__icon${theme} `} />
              <PersonIcon className={`purpose__icon${theme} `} />
            </div>
            <p>제가 누군가(1인)에게 줄 거예요!</p>
          </div>
          <div
            className={`purpose__option ${
              purpose === "rollingPaper" ? "purpose__selected" : ""
            }`}
            onClick={() => handleSelection("rollingPaper")}
          >
            <div className="purpose__icons">
              <PersonsIcon
                className={`purpose__icon${theme} purpose__persons`}
              />
              <LineIcon className={`purpose__icon${theme} `} />
              <PersonIcon className={`purpose__icon${theme} `} />
            </div>
            <p>다같이 1명에게 쓰는 롤링페이퍼예요!</p>
          </div>
        </div>
        <div className="purpose__container">
          <button className="purpose__btn" onClick={btnHandler}>
            next
          </button>
        </div>
        <iframe
          src="https://ads-partners.coupang.com/widgets.html?id=775712&template=carousel&trackingCode=AF7731510&subId=&width=320&height=90&tsource="
          width="320"
          height="90"
          frameborder="0"
          scrolling="no"
          referrerPolicy="unsafe-url"
          browsingtopics
        ></iframe>
        <div>
          <p style={{ fontSize: "10px", color: "#495057" }}>
            쿠팡 파트너스 활동을 통해 일정액의 수수료를 제공받을 수 있음
          </p>
        </div>
      </div>
    </div>
  );
}

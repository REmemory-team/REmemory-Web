// 캡슐 기본 설정 페이지

import "../styles/CapsuleBasicSetting.css";

import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function CapsuleBasicSetting() {
  const [capsuleName, setCapsuleName] = useState(""); // 캡슐 이름을 저장할 상태 변수 설정
  const [year, setYear] = useState(""); // 캡슐 오픈 시기(년)를 저장할 상태 변수 설정
  const [month, setMonth] = useState(""); // 캡슐 오픈 시기(월)를 저장할 상태 변수 설정
  const [day, setDay] = useState(""); // 캡슐 오픈 시기(일)를 저장할 상태 변수 설정
  const [purpose, setPurpose] = useState(""); // 캡슐 용도를 저장할 상태 변수 설정
  const [theme, setTheme] = useState(""); //캡슐 테마를 저장할 상태 변수 설정
  const navigate = useNavigate();

  // 캡슐 이름 유효성 검사를 위한 정규 표현식
  const validateCapsuleName = (name) => {
    const regex = /^[ㄱ-ㅎ가-힣a-zA-Z0-9]+$/;
    return regex.test(name);
  };

  // 사용자가 입력한 값을 상태 변수 capsuleName에 실시간으로 반영하여 저장하기 위한 함수
  // 유효성 검사 후 유효한 이름일 경우에만 저장
  const handleCapsuleNameChange = (event) => {
    const name = event.target.value;
    if (name === "" || validateCapsuleName(name)) {
      setCapsuleName(name);
    } else {
      alert("한글, 영어, 숫자로만 작성해주세요!");
    }
  };
  // 사용자가 입력한 값을 상태 변수 year에 실시간으로 반영하여 저장하기 위한 함수
  const handleYearChange = (event) => {
    setYear(event.target.value);
  };
  // 사용자가 입력한 값을 상태 변수 month에 실시간으로 반영하여 저장하기 위한 함수
  const handleMonthChange = (event) => {
    setMonth(event.target.value);
  };
  // 사용자가 입력한 값을 상태 변수 day에 실시간으로 반영하여 저장하기 위한 함수
  const handleDayChange = (event) => {
    setDay(event.target.value);
  };
  // 사용자가 선택한 캡슐의 용도를 상태 변수 purposeOption에 실시간으로 반영하여 저장하기 위한 함수
  const handlePurposeSelection = (purposeOption) => {
    setPurpose(purposeOption);
  };
  // 사용자가 선택한 테마를 상태 변수 themeOption에 실시간으로 반영하여 저장하기 위한 함수
  const handleThemeSelection = (themeOption) => {
    setTheme(themeOption);
  };
  // 모든 항목이 채워졌는지 확인하기 위한 함수
  const isFormValid = () => {
    return capsuleName && year && month && day && purpose && theme;
  };
  // nexy버튼을 누를 경우 작동하는 함수
  // 모든 항목이 채워진 경우 설정확인 페이지로 넘어감
  // 페이지를 넘길 때 캡슐이름, 캡슐 오픈 시기, 용도, 테마 정보를 넘겨줌
  const nextBtnHandler = () => {
    if (isFormValid()) {
      navigate("/confirm", {
        state: {
          capsuleName: capsuleName,
          year: year,
          month: month,
          day: day,
          purpose: purpose,
          theme: theme,
        },
      });
    } else {
      alert("모든 항목에 답해주세요!");
    }
  };

  return (
    <div className="basic-setting-page">
      <div className="capsule-image"></div>
      <p className="basic-setting-input-message">캡슐의 이름을 설정해주세요!</p>
      <input
        type="text"
        value={capsuleName}
        onChange={handleCapsuleNameChange}
        className="name-input-field"
      ></input>
      <p className="basic-setting-input-message">
        캡슐이 언제 열릴지 알려주세요!
      </p>
      <div className="opening-time-input-field">
        <input
          type="text"
          value={year}
          onChange={handleYearChange}
          className="opening-time-input opening-time-input-year"
        />
        <span className="date">년</span>
        <input
          type="type"
          value={month}
          onChange={handleMonthChange}
          className="opening-time-input"
        />
        <span className="date">월</span>
        <input
          type="type"
          value={day}
          onChange={handleDayChange}
          className="opening-time-input"
        />
        <span className="date">일</span>
      </div>
      <p className="basic-setting-input-message">
        어떤 용도의 타임캡슐인지 알려주세요!
      </p>
      <div
        className={`purpose-option ${
          purpose === "toMe" ? "selected-purpose" : ""
        }`}
        onClick={() => handlePurposeSelection("toMe")}
      >
        자신한테 쓰는 거예요!
      </div>
      <div
        className={`purpose-option ${
          purpose === "toSomeone" ? "selected-purpose" : ""
        }`}
        onClick={() => handlePurposeSelection("toSomeone")}
      >
        제가 누군가(1인)에게 줄 거예요!
      </div>
      <div
        className={`purpose-option ${
          purpose === "rollingPaper" ? "selected-purpose" : ""
        }`}
        onClick={() => handlePurposeSelection("rollingPaper")}
      >
        다같이 1명에게 쓰는 롤링페이퍼예요!
      </div>
      <p className="basic-setting-input-message">테마를 선택해주세요!</p>
      <div
        className={`theme-option ${
          theme === "reMemory" ? "selected-theme" : ""
        }`}
        onClick={() => handleThemeSelection("reMemory")}
        style={{ backgroundColor: "#D5C1FF" }}
      >
        RE:memory 테마
      </div>
      <div
        className={`theme-option ${
          theme === "birthday" ? "selected-theme" : ""
        }`}
        onClick={() => handleThemeSelection("birthday")}
        style={{ backgroundColor: "#FFF9C1" }}
      >
        생일 테마
      </div>
      <div
        className={`theme-option ${
          theme === "graduate" ? "selected-theme" : ""
        }`}
        onClick={() => handleThemeSelection("graduate")}
        style={{ backgroundColor: "#B0C5ED" }}
      >
        졸업 테마
      </div>
      <div
        className={`theme-option ${theme === "love" ? "selected-theme" : ""}`}
        onClick={() => handleThemeSelection("love")}
        style={{ backgroundColor: "#F9D8F0" }}
      >
        사랑 테마
      </div>
      <div
        className={`theme-option ${
          theme === "christmas" ? "selected-theme" : ""
        }`}
        onClick={() => handleThemeSelection("christmas")}
        style={{ backgroundColor: "#C3DBBF" }}
      >
        크리스마스 테마
      </div>
      <button className="basic-setting-next-btn" onClick={nextBtnHandler}>
        next
      </button>
    </div>
  );
}

// 캡슐 기본 설정

import "../styles/CapsuleBasicSetting.css";

import { useEffect, useState } from "react";

import React from "react";
import { useNavigate } from "react-router-dom";

export default function CapsuleBasicSetting() {
  const [capsuleName, setCapsuleName] = useState(""); // 캡슐 이름을 저장할 상태 변수 설정
  const [year, setYear] = useState(""); // 캡슐 오픈 시기(년)를 저장할 상태 변수 설정
  const [month, setMonth] = useState(""); // 캡슐 오픈 시기(월)를 저장할 상태 변수 설정
  const [day, setDay] = useState(""); // 캡슐 오픈 시기(일)를 저장할 상태 변수 설정
  const [purpose, setPurpose] = useState(""); // 캡슐 용도를 저장할 상태 변수 설정
  const [theme, setTheme] = useState(0); //캡슐 테마를 저장할 상태 변수 설정
  // 현재 날짜를 저장할 상태 변수
  const [currentYear, setCurrentYear] = useState("");
  const [currentMonth, setCurrentMonth] = useState("");
  const [currentDay, setCurrentDay] = useState("");

  const navigate = useNavigate();

  // 캡슐 이름 유효성 검사를 위한 정규 표현식
  const validateCapsuleName = (name) => {
    const regex = /^[ㄱ-ㅎ가-힣a-zA-Z0-9]+$/;
    return regex.test(name);
  };
  // 사용자가 입력한 값을 상태 변수 capsuleName에 실시간으로 반영하여 저장하기 위한 함수
  const handleCapsuleNameChange = (event) => {
    setCapsuleName(event.target.value);
  };
  // 현재 날짜를 가져와 저장
  useEffect(() => {
    const today = new Date();
    const formattedMonth = (today.getMonth() + 1).toString().padStart(2, "0"); // 한 자리 수일 경우 0을 채워줌
    const formattedDay = today.getDate().toString().padStart(2, "0");

    setCurrentYear(today.getFullYear().toString());
    setCurrentMonth(formattedMonth);
    setCurrentDay(formattedDay);
  }, []);

  // 숫자 입력 검증 함수
  const isValidNumberInput = (value) => {
    return /^\d*$/.test(value);
  };
  // 사용자가 입력한 날짜가 현재 날짜 이후인지 확인하는 함수
  const isPastDate = (inputYear, inputMonth, inputDay) => {
    const currentDate = new Date();
    const inputDate = new Date(inputYear, inputMonth - 1, inputDay);

    return inputDate <= currentDate;
  };
  // 입력된 날짜가 유효한지 검사하는 함수
  const isValidDate = (inputYear, inputMonth, inputDay) => {
    const year = parseInt(inputYear, 10);
    const month = parseInt(inputMonth, 10) - 1;
    const day = parseInt(inputDay, 10);

    const date = new Date(year, month, day);
    // 유효한 날짜인지 확인: getFullYear, getMonth, getDate를 사용하여 입력된 날짜와 생성된 날짜가 같은지 비교
    return (
      date.getFullYear() === year &&
      date.getMonth() === month &&
      date.getDate() === day
    );
  };
  // 사용자가 입력한 값을 상태 변수 year에 실시간으로 반영하여 저장하기 위한 함수
  const handleYearChange = (event) => {
    const value = event.target.value;
    if (isValidNumberInput(value)) {
      setYear(value);
    }
  };
  // 사용자가 입력한 값을 상태 변수 month에 실시간으로 반영하여 저장하기 위한 함수
  const handleMonthChange = (event) => {
    const value = event.target.value;
    if (isValidNumberInput(value)) {
      setMonth(value);
    }
  };
  // 사용자가 입력한 값을 상태 변수 day에 실시간으로 반영하여 저장하기 위한 함수
  const handleDayChange = (event) => {
    const value = event.target.value;
    if (isValidNumberInput(value)) {
      setDay(value);
    }
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
  // next버튼을 누를 경우 작동하는 함수
  // 페이지를 넘길 때 캡슐이름, 캡슐 오픈 시기, 용도, 테마 정보를 넘겨줌
  const nextBtnHandler = () => {
    // 모든 필드가 채워졌는지 확인
    if (!isFormValid()) {
      alert("모든 항목에 답해주세요!");
      return;
    }
    // 캡슐 이름 유효성 검사
    if (!validateCapsuleName(capsuleName)) {
      alert("캡슐 이름을 한글, 영어, 숫자로만 작성해주세요!");
      return;
    }
    // 날짜 유효성 검사
    if (!isValidDate(year, month, day)) {
      alert("유효하지 않은 날짜입니다. 다시 입력해주세요!");
      return;
    }
    // 사용자가 입력한 날짜가 과거인지 확인
    if (isPastDate(year, month, day)) {
      alert("캡슐 오픈 시기는 내일 이후로 설정해주세요!");
      return;
    }
    // 모든 항목이 올바르게 채워진 경우, 다음 페이지로 이동
    navigate("/capsule/settings/confirm", {
      state: {
        capsuleName: capsuleName,
        year: year,
        month: month,
        day: day,
        purpose: purpose,
        theme: theme,
      },
    });
  };

  return (
    <div className="basic-setting-page">
      <div className="capsule-image"></div>
      <p className="basic-setting-input-message">캡슐의 이름을 설정해주세요!</p>
      <input
        type="text"
        onChange={handleCapsuleNameChange}
        placeholder="입력해주세요"
        className="name-input-field"
      ></input>
      <p className="basic-setting-input-message">
        캡슐이 언제 열릴지 알려주세요!
      </p>
      <div className="opening-time-input-field">
        <input
          type="text"
          onChange={handleYearChange}
          placeholder={currentYear}
          className="opening-time-input opening-time-input-year"
          inputMode="numeric"
        />
        <span className="date">년</span>
        <input
          type="text"
          onChange={handleMonthChange}
          placeholder={currentMonth}
          className="opening-time-input"
          inputMode="numeric"
        />
        <span className="date">월</span>
        <input
          type="text"
          onChange={handleDayChange}
          placeholder={currentDay}
          className="opening-time-input"
          inputMode="numeric"
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
        className={`theme-option ${theme === 1 ? "selected-theme" : ""}`}
        onClick={() => handleThemeSelection(1)}
        style={{ backgroundColor: "#D5C1FF" }}
      >
        RE:memory 테마
      </div>
      <div
        className={`theme-option ${theme === 2 ? "selected-theme" : ""}`}
        onClick={() => handleThemeSelection(2)}
        style={{ backgroundColor: "#FFF9C1" }}
      >
        생일 테마
      </div>
      <div
        className={`theme-option ${theme === 3 ? "selected-theme" : ""}`}
        onClick={() => handleThemeSelection(3)}
        style={{ backgroundColor: "#B0C5ED" }}
      >
        졸업 테마
      </div>
      <div
        className={`theme-option ${theme === 4 ? "selected-theme" : ""}`}
        onClick={() => handleThemeSelection(4)}
        style={{ backgroundColor: "#F9D8F0" }}
      >
        사랑 테마
      </div>
      <div
        className={`theme-option ${theme === 5 ? "selected-theme" : ""}`}
        onClick={() => handleThemeSelection(5)}
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

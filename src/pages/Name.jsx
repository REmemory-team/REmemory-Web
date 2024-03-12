import "../styles/Name.css";

import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import React from "react";

export default function Name() {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = location.state.theme;
  const [capsuleName, setCapsuleName] = useState("");
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");

  // 현재 날짜를 저장
  const [currentYear, setCurrentYear] = useState("");
  const [currentMonth, setCurrentMonth] = useState("");
  const [currentDay, setCurrentDay] = useState("");

  // 캡슐 이름 유효성 검사
  const validateCapsuleName = (name) => {
    const regex = /^[ㄱ-ㅎ가-힣a-zA-Z0-9\s]+$/;
    return regex.test(name);
  };
  const handleNameChange = (event) => {
    setCapsuleName(event.target.value);
  };
  // 현재 날짜 가져오기
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
  // 사용자가 입력한 날짜가 현재 날짜 이후인지 확인
  const isPastDate = (inputYear, inputMonth, inputDay) => {
    const currentDate = new Date();
    const inputDate = new Date(inputYear, inputMonth - 1, inputDay);

    return inputDate <= currentDate;
  };
  // 날짜 유효성 검사
  const isValidDate = (inputYear, inputMonth, inputDay) => {
    const year = parseInt(inputYear, 10);
    const month = parseInt(inputMonth, 10) - 1;
    const day = parseInt(inputDay, 10);

    const date = new Date(year, month, day);

    return (
      date.getFullYear() === year &&
      date.getMonth() === month &&
      date.getDate() === day
    );
  };
  const handleYearChange = (event) => {
    const value = event.target.value;
    if (isValidNumberInput(value)) {
      setYear(value);
    }
  };
  const handleMonthChange = (event) => {
    const value = event.target.value;
    if (isValidNumberInput(value)) {
      setMonth(value);
    }
  };
  const handleDayChange = (event) => {
    const value = event.target.value;
    if (isValidNumberInput(value)) {
      setDay(value);
    }
  };
  const btnHandler = () => {
    const trimmedCapsuleName = capsuleName.trim();

    const formattedMonth = month.padStart(2, "0");
    const formattedDay = day.padStart(2, "0");

    if (!capsuleName) {
      alert("캡슐 이름을 입력해주세요!");
      return;
    }
    // 캡슐 이름 유효성 검사
    if (!validateCapsuleName(trimmedCapsuleName)) {
      alert("캡슐 이름은 한글, 영어, 숫자로만 작성해주세요!");
      return;
    }
    if (!year && !month && !day) {
      alert("오픈 날짜를 입력해주세요!");
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
    navigate("/capsule/settings/confirm", {
      state: {
        theme: theme,
        purpose: location.state.purpose,
        capsuleName: trimmedCapsuleName,
        year: year,
        month: formattedMonth,
        day: formattedDay,
      },
    });
  };

  return (
    <div className={`name name__theme${theme}`}>
      <div className="name__wrapper">
        <img
          src={require(`../assets/기본 캡슐이미지${theme}.png`)}
          alt="캡슐 이미지"
          className="name__image"
        ></img>
        <p className="name__message1">캡슐의 이름을 설정해주세요!</p>
        <input
          type="text"
          onChange={handleNameChange}
          placeholder="입력해주세요"
          className="name__name"
        ></input>
        <p className="name__message2">캡슐이 언제 열릴지 알려주세요!</p>
        <div className="name__date">
          <input
            type="text"
            value={year}
            onChange={handleYearChange}
            placeholder={currentYear}
            className="name__date--input name__date--year"
            inputMode="numeric"
          />
          <span className="name__date--mark">년</span>
          <input
            type="text"
            value={month}
            onChange={handleMonthChange}
            placeholder={currentMonth}
            className="name__date--input"
            inputMode="numeric"
          />
          <span className="name__date--mark">월</span>
          <input
            type="text"
            value={day}
            onChange={handleDayChange}
            placeholder={currentDay}
            className="name__date--input"
            inputMode="numeric"
          />
          <span className="name__date--mark">일</span>
        </div>
        <div className="name__container">
          <button className="name__btn" onClick={btnHandler}>
            next
          </button>
        </div>
      </div>
    </div>
  );
}

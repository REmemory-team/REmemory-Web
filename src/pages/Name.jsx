import "../styles/Name.css";

import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { ReactComponent as BackIcon } from "../assets/back_btn.svg";
import MetaTag from "../components/seo/SEOMetaTag";
import React from "react";

export default function Name() {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = location.state.theme;
  const [capsuleName, setCapsuleName] = useState("");
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");

  const [currentYear, setCurrentYear] = useState("");
  const [currentMonth, setCurrentMonth] = useState("");
  const [currentDay, setCurrentDay] = useState("");

  const validateCapsuleName = (name) => {
    const regex = /^[ㄱ-ㅎ가-힣a-zA-Z0-9\s]+$/;
    return regex.test(name);
  };

  const handleNameChange = (event) => {
    setCapsuleName(event.target.value);
  };

  useEffect(() => {
    const today = new Date();
    const formattedMonth = (today.getMonth() + 1).toString().padStart(2, "0");
    const formattedDay = today.getDate().toString().padStart(2, "0");

    setCurrentYear(today.getFullYear().toString());
    setCurrentMonth(formattedMonth);
    setCurrentDay(formattedDay);
  }, []);

  const isValidNumberInput = (value) => {
    return /^\d*$/.test(value);
  };

  const isPastDate = (inputYear, inputMonth, inputDay) => {
    const currentDate = new Date();
    const inputDate = new Date(inputYear, inputMonth - 1, inputDay);

    const currentWithoutTime = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate()
    );

    const inputWithoutTime = new Date(
      inputDate.getFullYear(),
      inputDate.getMonth(),
      inputDate.getDate()
    );
    const oneWeekLater = new Date(
      currentWithoutTime.getTime() + 7 * 24 * 60 * 60 * 1000
    );

    return (
      inputWithoutTime < currentWithoutTime || inputWithoutTime >= oneWeekLater
    );
  };

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

    if (!validateCapsuleName(trimmedCapsuleName)) {
      alert("캡슐 이름은 한글, 영어, 숫자로만 작성해주세요!");
      return;
    }
    if (!year && !month && !day) {
      alert("오픈 날짜를 입력해주세요!");
      return;
    }

    if (!isValidDate(year, month, day)) {
      alert("유효하지 않은 날짜입니다. 다시 입력해주세요!");
      return;
    }

    if (isPastDate(year, month, day)) {
      alert(
        "캡슐 오픈 시기는 오늘부터 7일 이내로 설정해주세요!\n더욱 발전하여 설정기간을 늘릴 수 있도록 노력하겠습니다.\n응원해주세요!"
      );
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

  const backBtnHandler = () => {
    navigate(-1);
  };

  const [themename, setThemename] = useState("");
  useEffect(() => {
    if (theme === 1) setThemename("default");
    else if (theme === 2) setThemename("birthday");
    else if (theme === 3) setThemename("love");
    else if (theme === 4) setThemename("parents");
    else if (theme === 5) setThemename("teachers");
    else if (theme === 6) setThemename("graduation");
    else if (theme === 7) setThemename("christmas");
  }, [theme]);

  return (
    <div className={`name name__theme${theme}`}>
      <MetaTag
        title="RE:memory"
        description="감정을 기억하고 선물하다, RE:memory 
    감정을 기억하고 선물할 수 있는 온라인 롤링페이퍼, 편지, 타임캡슐 서비스"
        keywords="RE:memory, 감정을 기억하고 선물하다, 온라인 롤링페이퍼, 온라인 편지, 온라인 타임캡슐, 롤링페이퍼, 편지, 타임캡슐"
      />
      <div className="name-top">
        <BackIcon onClick={backBtnHandler} />
      </div>
      <div className="name__wrapper">
        <img
          src={require(`../assets/capsules/capsule_${themename}.png`)}
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
    </div>
  );
}

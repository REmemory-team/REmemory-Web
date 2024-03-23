import "../styles/Theme.css";

import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Theme() {
  const navigate = useNavigate();
  const [theme, setTheme] = useState(0);

  const handleSelection = (themeOption) => {
    setTheme(themeOption);
  };
  const btnHandler = () => {
    if (!theme) {
      alert("테마를 선택해주세요!");
      return;
    }
    navigate("/capsule/settings/purpose", { state: { theme: theme } });
  };

  return (
    <div className="theme">
      <div className="theme__wrapper">
        <p className="theme__message">테마를 선택해주세요!</p>
        <div className="theme__options">
          <div
            className={`theme__option ${theme === 1 ? "theme__selected" : ""}`}
            onClick={() => handleSelection(1)}
            style={{ backgroundColor: "#D5C1FF" }}
          >
            RE:memory 테마
          </div>
          <div
            className={`theme__option ${theme === 2 ? "theme__selected" : ""}`}
            onClick={() => handleSelection(2)}
            style={{ backgroundColor: "#FFF9C1" }}
          >
            생일 테마
          </div>
          <div
            className={`theme__option ${theme === 3 ? "theme__selected" : ""}`}
            onClick={() => handleSelection(3)}
            style={{ backgroundColor: "#F9D8F0" }}
          >
            사랑 테마
          </div>
          <div
            className={`theme__option ${theme === 4 ? "theme__selected" : ""}`}
            onClick={() => handleSelection(4)}
            style={{ backgroundColor: "#E0CABE" }}
          >
            어버이날 테마
          </div>
          <div
            className={`theme__option ${theme === 5 ? "theme__selected" : ""}`}
            onClick={() => handleSelection(5)}
            style={{ backgroundColor: "#A5C8D3" }}
          >
            스승의 날 테마
          </div>
        </div>
        <div className="theme__container">
          <button className="theme__btn" onClick={btnHandler}>
            next
          </button>
        </div>
      </div>
    </div>
  );
}

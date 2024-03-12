// 캡슐 기본 설정 확인

import "../styles/ConfirmBasicSetting.css";

import { useLocation, useNavigate } from "react-router-dom";

import { ReactComponent as ClockIcon } from "../assets/clock.svg";
import { ReactComponent as LetterIcon } from "../assets/letter.svg";
import { ReactComponent as ThemeIcon } from "../assets/theme.svg";

export default function ConfirmBasicSetting() {
  const location = useLocation();
  const navigate = useNavigate();
  const userData = location.state; // 캡슐 기본 설정 페이지로부터 전달받은 데이터

  // '확인했어요!' 버튼을 누르면 실행되는 함수
  // 용도에 따라 다른 화면으로 이동
  // 캡슐 이름, 오픈 날짜, 받는 사람, 테마 정보 등을 전달
  const confirmBtnHandler = (event) => {
    if (userData.purpose === "toMe") {
      navigate("/capsule/letter-format", {
        state: {
          pcapsule_name: userData.capsuleName,
          open_date: `${userData.year}-${userData.month}-${userData.day}`,
          dear_name: "ME",
          theme: userData.theme,
          purpose: userData.purpose,
        },
      });
    } else if (
      userData.purpose === "toSomeone" ||
      userData.purpose === "rollingPaper"
    ) {
      navigate("/capsule/input-recipients", {
        state: {
          pcapsule_name: userData.capsuleName,
          open_date: `${userData.year}-${userData.month}-${userData.day}`,
          theme: userData.theme,
          purpose: userData.purpose,
        },
      });
    }
  };

  return (
    <div
      className={`confirm-setting-page confirm-setting-page${userData.theme}`}
    >
      <p className="confirm-message">타임캡슐 설정을 확인하세요!</p>
      <div className="blur-container"></div>
      <div className="setting-info-container">
        <p className="capsuleName">{userData.capsuleName}</p>
        <div className="info-boxes">
          <div className="info-box">
            <span className="info-icon">
              <ClockIcon
                className={`theme-icon theme-icon${userData.theme} theme-icon-clock`}
              />
            </span>
            <span className="info-content">
              {userData.year}년 {userData.month}월 {userData.day}일
            </span>
          </div>
          <div className="info-box">
            <span className="info-icon">
              <LetterIcon
                className={`theme-icon theme-icon${userData.theme}`}
              />
            </span>
            <span className="info-content">
              {userData.purpose === "toMe" && "자신한테 쓰는 거예요!"}
              {userData.purpose === "toSomeone" &&
                "제가 누군가(1인)에게 줄 거예요!"}
              {userData.purpose === "rollingPaper" &&
                "다같이 1명에게 쓰는 롤링페이퍼예요!"}
            </span>
          </div>
          <div className="info-box">
            <span className="info-icon">
              <ThemeIcon className={`theme-icon theme-icon${userData.theme}`} />
            </span>
            <span className="info-content">
              {userData.theme === 1 && "RE:memory 테마"}
              {userData.theme === 2 && "생일 테마"}
              {userData.theme === 3 && "졸업 테마"}
              {userData.theme === 4 && "사랑 테마"}
              {userData.theme === 5 && "크리스마스 테마"}
            </span>
          </div>
        </div>
      </div>
      <button className="setting-confirm-btn" onClick={confirmBtnHandler}>
        확인했어요!
      </button>
    </div>
  );
}

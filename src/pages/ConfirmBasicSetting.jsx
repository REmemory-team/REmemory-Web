// 캡슐 기본 설정 확인

import "../styles/ConfirmBasicSetting.css";

import { useLocation, useNavigate } from "react-router-dom";

export default function ConfirmBasicSetting() {
  const location = useLocation();
  const navigate = useNavigate();
  const userData = location.state; // 캡슐 기본 설정 페이지로부터 전달받은 데이터

  console.log(userData.capsuleName);
  console.log(`${userData.year}-${userData.month}-${userData.day}`);
  console.log(userData.theme);

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
    <div className="confirm-setting-page">
      <p className="confirm-message">타임캡슐 설정을 확인하세요!</p>
      <div className="blur-container"></div>
      <div className="setting-info-container">
        <p className="capsuleName">{userData.capsuleName}</p>
        <div className="info-box">
          <span className="info-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="24"
              viewBox="0 0 20 24"
              fill="none"
              className="time-icon"
            >
              <circle
                cx="10"
                cy="13.7586"
                r="9"
                stroke="#1C1C1C"
                stroke-width="2"
              />
              <path
                d="M6.20703 1H13.7932"
                stroke="#1C1C1C"
                stroke-width="2"
                stroke-linecap="round"
              />
              <path
                d="M9.65423 7.20691L9.65423 14.1035L16.5508 14.1035"
                stroke="#1C1C1C"
                stroke-width="2"
                stroke-linecap="round"
              />
            </svg>
          </span>
          <span className="info-content">
            {userData.year}년 {userData.month}월 {userData.day}일
          </span>
        </div>
        <div className="info-box">
          <span className="info-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="23"
              height="16"
              viewBox="0 0 23 16"
              fill="none"
              className="purpose-icon"
            >
              <rect
                x="2"
                y="1"
                width="20"
                height="14"
                rx="1"
                stroke="#1C1C1C"
                stroke-width="2"
              />
              <path
                d="M2.55923 0.646091C2.13636 0.290851 1.50557 0.34568 1.15033 0.768555C0.795093 1.19143 0.849922 1.82222 1.2728 2.17746L2.55923 0.646091ZM11.9993 9.88236L11.3561 10.648L11.9993 11.1884L12.6426 10.648L11.9993 9.88236ZM1.2728 2.17746L11.3561 10.648L12.6426 9.11668L2.55923 0.646091L1.2728 2.17746ZM12.6426 10.648L22.7259 2.17746L21.4395 0.646091L11.3561 9.11668L12.6426 10.648Z"
                fill="#1C1C1C"
              />
            </svg>
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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="21"
              height="20"
              viewBox="0 0 21 20"
              fill="none"
              className="theme-icon"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M20.0735 13.8189C18.5554 14.5735 16.8299 15 15 15C8.92487 15 4 10.299 4 4.50002C4 3.16913 4.2594 1.89607 4.73258 0.724396C1.88167 2.60184 0 5.83118 0 9.50002C0 15.299 4.70101 20 10.5 20C14.7595 20 18.4266 17.4637 20.0735 13.8189Z"
                fill="#1C1C1C"
              />
            </svg>
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
      <button className="setting-confirm-btn" onClick={confirmBtnHandler}>
        확인했어요!
      </button>
    </div>
  );
}

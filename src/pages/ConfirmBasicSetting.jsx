import "../styles/ConfirmBasicSetting.css";

import { useLocation, useNavigate } from "react-router-dom";

import { ReactComponent as BackIcon } from "../assets/back_btn.svg";
import { ReactComponent as ClockIcon } from "../assets/clock.svg";
import { ReactComponent as LetterIcon } from "../assets/letter.svg";
import MetaTag from "../components/seo/SEOMetaTag";
import { ReactComponent as ThemeIcon } from "../assets/theme.svg";

export default function ConfirmBasicSetting() {
  const location = useLocation();
  const navigate = useNavigate();
  const userData = location.state;

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

  const backBtnHandler = () => {
    navigate(-1);
  };

  return (
    <div
      className={`confirm-setting-page confirm-setting-page${userData.theme}`}
    >
      <MetaTag
        title="RE:memory"
        description="감정을 기억하고 선물하다, RE:memory 
    감정을 기억하고 선물할 수 있는 온라인 롤링페이퍼, 편지, 타임캡슐 서비스"
        keywords="RE:memory, 감정을 기억하고 선물하다, 온라인 롤링페이퍼, 온라인 편지, 온라인 타임캡슐, 롤링페이퍼, 편지, 타임캡슐"
      />
      <div className="confirm-setting-top">
        <BackIcon onClick={backBtnHandler} />
      </div>
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
              {userData.theme === 3 && "사랑 테마"}
              {userData.theme === 4 && "어버이날 테마"}
              {userData.theme === 5 && "스승의 날 테마"}
              {userData.theme === 6 && "졸업 테마"}
              {userData.theme === 7 && "크리스마스 테마"}
            </span>
          </div>
        </div>
      </div>
      <button className="setting-confirm-btn" onClick={confirmBtnHandler}>
        확인했어요!
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

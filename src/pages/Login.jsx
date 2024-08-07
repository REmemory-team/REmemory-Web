import "../styles/Login.css";

import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import MetaTag from "../components/seo/SEOMetaTag";
import arrow from "../assets/arrow.png";
import axios from "axios";
import circle from "../assets/circle.png";
import kakaoicon from "../assets/kakaoicon.png";
import twinkle from "../assets/twinkle.png";

const Login = () => {
  const { Kakao } = window;
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const initKakao = async () => {
      if (!Kakao.isInitialized()) {
        Kakao.init(process.env.REACT_APP_KAKAO_API_KEY);
      }
    };

    initKakao();
  }, []);

  const kakaoLogin = async () => {
    try {
      const isAndroid = Boolean(navigator.userAgent.match(/Android/i));
      const isIOS = Boolean(navigator.userAgent.match(/iPhone|iPad|iPod/i));

      await Kakao.Auth.authorize({
        redirectUri: "https://rememory.site",
        throughTalk: isAndroid ? false : isIOS ? false : true,
      });
    } catch (error) {
      console.error("Kakao login error:", error);
    }
  };

  const handleKakaoCallback = async () => {
    const urlParams = new URLSearchParams(location.search);
    const code = urlParams.get("code");

    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/user/auth?code=${code}`
      );

      if (response.status === 200) {
        console.log(response);
        const { token, userId, nickname } = response.data.result;

        if (response.data.result.status === 0) {
          const confirmed = window.confirm("계정을 활성화하시겠습니까?");
          if (confirmed) {
            axios
              .patch(
                `${process.env.REACT_APP_API_BASE_URL}/user/activate`,
                { userId: userId },
                {
                  headers: {
                    authorization: `Bearer ${token}`,
                  },
                }
              )
              .then((response) => {
                console.log(response);
                if (response.status === 200) {
                  alert("계정이 활성화되었습니다!");
                }
              })
              .catch((error) => {
                console.log(error);
              });
          } else {
          }
        } else {
          sessionStorage.setItem("token", token);
          sessionStorage.setItem("userId", userId);
          sessionStorage.setItem("nickname", nickname);

          if (nickname) {
            navigate("/login/kakao/home");
          } else {
            navigate("/login/kakao/nickname");
          }
        }
      } else {
        alert("로그인 또는 회원가입에 실패했습니다.");
        navigate("/");
      }
    } catch (error) {
      console.error(error);
      navigate("/");
    }
  };

  useEffect(() => {
    if (location.search.includes("code=")) {
      handleKakaoCallback();
    }
  }, [location.search]);

  const capsuleCheck = () => {
    navigate("/capsule/input-number");
  };

  return (
    <div className="login-page">
      <MetaTag
        title="RE:memory"
        description="감정을 기억하고 선물하다, RE:memory 
    감정을 기억하고 선물할 수 있는 온라인 롤링페이퍼, 편지, 타임캡슐 서비스"
        keywords="RE:memory, 감정을 기억하고 선물하다, 온라인 롤링페이퍼, 온라인 편지, 온라인 타임캡슐, 롤링페이퍼, 편지, 타임캡슐"
      />
      <div className="logo-img">
        <img src={circle} alt="동그라미" className="circle" />
        <img src={arrow} alt="화살표" className="arrow" />
        <img src={twinkle} alt="반짝이" className="twinkle" />
        <div className="re-memory">RE:memory</div>
      </div>
      <div className="kakao-login-btn" onClick={kakaoLogin}>
        <img src={kakaoicon} alt="kakaoicon" className="kakao-icon" />
        <span className="kakao-login">카카오계정으로 캡슐 만들기</span>
      </div>
      <div className="capsule-check-btn" onClick={capsuleCheck}>
        <span className="capsule-check-txt">캡슐번호로 타임캡슐 확인</span>
      </div>
      <iframe
        src="https://ads-partners.coupang.com/widgets.html?id=775712&template=carousel&trackingCode=AF7731510&subId=&width=320&height=90&tsource="
        width="320"
        height="90"
        frameborder="0"
        scrolling="no"
        referrerpolicy="unsafe-url"
        browsingtopics
      ></iframe>
      <div>
        <p style={{ fontSize: "10px", color: "#495057" }}>
          쿠팡 파트너스 활동을 통해 일정액의 수수료를 제공받을 수 있음
        </p>
      </div>
      <div class="business-info">
        <span class="rememory">RE:memory</span>
        <span>상호 | 청춘노트</span>
        <span>대표 | 백재윤</span>
        <span>메일 | wodbs7893@gmail.com</span>
        <span>사업자 등록번호 | 763-12-02698</span>
        <span>
          주소 | 충청남도 천안시 서북구 시청로 73, 312-701 (우편번호 : 31163)
        </span>
      </div>
    </div>
  );
};

export default Login;

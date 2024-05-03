import "../styles/Login.css";

import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

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
        redirectUri: "http://rememory.site",
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

      if (response.status === 200 && response.data.isSuccess) {
        const { token, userId, nickname } = response.data.result;

        sessionStorage.setItem("token", token);
        sessionStorage.setItem("userId", userId);
        sessionStorage.setItem("nickname", nickname);

        if (nickname) {
          navigate("/login/kakao/home");
        } else {
          navigate("/login/kakao/nickname");
        }
      } else {
        alert("로그인 또는 회원가입에 실패했습니다.");
        navigate("/");
      }
    } catch (error) {
      console.error("Failed to send authorization code to server:", error);
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
    </div>
  );
};

export default Login;

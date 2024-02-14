// 웹 처음 입장 시

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
        Kakao.init(process.env.REACT_APP_KAKAO_API_KEY); //리메모리 카카오톡 API 키
      }
    };

    initKakao();
  }, [navigate]);

  const kakaoLogin = async () => {
    try {
      const isAndroid = Boolean(navigator.userAgent.match(/Android/i));
      const isIOS = Boolean(navigator.userAgent.match(/iPhone|iPad|iPod/i));

      const res = await Kakao.Auth.authorize({
        redirectUri: "http://localhost:3000/login/kakao/nickname", //http://localhost:3000/oauth/kakao/callback
        throughTalk: isAndroid ? false : isIOS ? false : true,
      });
    } catch (error) {
      console.error("Kakao login error:", error);
    }
  };

  const handleKakaoCallback = async () => {
    const urlParams = new URLSearchParams(location.search);
    const code = urlParams.get("code"); // 서버로 보낼 인가코드

    try {
      // 서버로 인가 코드 전송
      await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/user/auth?code=${code}`, // 백엔드 서버 주소 및 엔드포인트
        {
          code: code,
        }
      );
      navigate("/login/kakao/nickname");
    } catch (error) {
      console.error("Failed to send authorization code to server:", error);
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
      <div className="capsule-check-btn" onClick={capsuleCheck}>
        캡슐번호로 타임캡슐 확인
      </div>
      <div className="kakao-login-btn" onClick={kakaoLogin}>
        <img src={kakaoicon} alt="kakaoicon" className="kakao-icon" />
        <span className="kakao-login">카카오 로그인</span>
      </div>
    </div>
    // <div className="login-page">
    //   <div className="re-memory">RE:memory</div>
    //   <div className="twinkle">
    //     <img src={twinkle} alt="반짝이" />
    //   </div>
    //   <div className="circle">
    //     <img src={circle} alt="동그라미" />
    //   </div>
    //   <div className="arrow">
    //     <img src={arrow} alt="화살표" />
    //   </div>

    //   <button className="button">
    //     <span className="buttonText" onClick={capsuleCheck}>
    //       캡슐번호로 타임캡슐 확인
    //     </span>
    //   </button>

    //   <button className="kakaoLoginButton" onClick={kakaoLogin}></button>
    //   <div className="kakaoicon">
    //     <img src={kakaoicon} alt="kakaoicon" />
    //   </div>
    // </div>
  );
};

export default Login;

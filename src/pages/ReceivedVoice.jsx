// 음성 편지 확인

import "../styles/ReceivedVoice.css";

import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import React from "react";
import voiceTest from "../Data/voiceTest";

export default function ReceivedVoice() {
  const navigate = useNavigate();
  const location = useLocation();
  const audioRef = useRef(null);
  const [play, setPlay] = useState(false); // 오디오 재생 상태

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgressBar = () => {
      const currentTime = audio.currentTime;
      const duration = audio.duration;
      const percentage = (currentTime / duration) * 100;
      const progressBar = document.querySelector(".main-bar");
      if (progressBar) {
        const boldWidth = (percentage * 10.5) / 100;
        progressBar.style.width = `${boldWidth}rem`;
      }
    };

    audio.addEventListener("timeupdate", updateProgressBar);

    return () => {
      audio.removeEventListener("timeupdate", updateProgressBar);
    };
  }, []);

  const backBtnHandler = () => {
    navigate(-1);
  };
  const homeBtnHandler = () => {
    if (sessionStorage.getItem("token")) {
      navigate("/login/kakao/home"); // 로그인한 경우 "홈 화면"으로 이동
    } else {
      navigate("/"); // 로그인하지 않은 경우 "웹 처음 입장 시" 화면으로 이동
    }
  };

  const playBtnHandler = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (play) {
      audio.pause();
    } else {
      audio.play();
    }
    setPlay(!play);
  };

  const handleProgressBarClick = (e) => {
    const audio = audioRef.current;
    if (!audio) return;

    // 클릭 이벤트가 발생한 요소가 base-bar인지 main-bar인지 확인
    const isMainBarClick = e.target.classList.contains("main-bar");
    const bar = isMainBarClick ? e.target.parentNode : e.target; // main-bar 클릭 시, 부모 요소인 base-bar를 사용

    const barRect = bar.getBoundingClientRect();
    const clickPositionX = e.clientX - barRect.left; // 클릭 지점의 X 좌표
    const barWidth = barRect.width; // base-bar의 실제 너비
    const clickPositionRatio = clickPositionX / barWidth; // 클릭된 위치의 비율

    // 오디오 재생 위치 업데이트
    audio.currentTime = clickPositionRatio * audio.duration;
  };

  return (
    <div
      className={`received-voice-page received-voice-page-theme${voiceTest.theme}`}
    >
      <div className="top-menu">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="27"
          height="19"
          viewBox="0 0 27 19"
          fill="none"
          className="back-btn"
          onClick={backBtnHandler}
        >
          <path
            d="M26.625 8.04167H5.96042L11.1812 2.80625L9.125 0.75L0.375 9.5L9.125 18.25L11.1812 16.1938L5.96042 10.9583H26.625V8.04167Z"
            fill="white"
          />
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="26"
          height="24"
          viewBox="0 0 26 24"
          fill="none"
          className="home-btn"
          onClick={homeBtnHandler}
        >
          <path
            d="M12.9167 0C12.9167 0 4.92642 6.8975 0.461125 10.633C0.319038 10.7568 0.204561 10.9091 0.125122 11.08C0.0456818 11.2509 0.00305301 11.4366 0 11.625C0 11.9676 0.136086 12.2961 0.37832 12.5383C0.620555 12.7806 0.949095 12.9167 1.29167 12.9167H3.875V21.9583C3.875 22.3009 4.01109 22.6294 4.25332 22.8717C4.49556 23.1139 4.8241 23.25 5.16667 23.25H9.04167C9.38424 23.25 9.71278 23.1139 9.95501 22.8717C10.1972 22.6294 10.3333 22.3009 10.3333 21.9583V16.7917H15.5V21.9583C15.5 22.3009 15.6361 22.6294 15.8783 22.8717C16.1206 23.1139 16.4491 23.25 16.7917 23.25H20.6667C21.0092 23.25 21.3378 23.1139 21.58 22.8717C21.8223 22.6294 21.9583 22.3009 21.9583 21.9583V12.9167H24.5417C24.8842 12.9167 25.2128 12.7806 25.455 12.5383C25.6973 12.2961 25.8333 11.9676 25.8333 11.625C25.8315 11.433 25.7861 11.2438 25.7003 11.072C25.6146 10.9001 25.4909 10.75 25.3386 10.633C20.9043 6.8975 12.9167 0 12.9167 0Z"
            fill="white"
            fill-opacity="0.9"
          />
        </svg>
      </div>
      <div className="voice-contents-box">
        <p className="received-recipient">To. {voiceTest.dear_name}</p>
        <div className="voice-contents">
          <audio ref={audioRef} src={voiceTest.voice_data.voice_url} />
          <div className="record-image">
            <img
              src={require(`../assets/Recording_icon${voiceTest.theme}.png`)}
              alt="녹음 아이콘"
            ></img>
          </div>
          <div className="record-bar">
            <div className="play-btn" onClick={playBtnHandler}>
              <img
                src={require(`../assets/play_btn${voiceTest.theme}.png`)}
                alt="재생 버튼"
              ></img>
            </div>
            <div className="bar">
              <div className="base-bar" onClick={handleProgressBarClick}></div>
              <div className="main-bar" onClick={handleProgressBarClick}></div>
            </div>
          </div>
        </div>
        {voiceTest.sender && (
          <p className="received-sender">From. {voiceTest.sender}</p>
        )}
      </div>
    </div>
  );
}

// 음성 편지 확인

import "../styles/ReceivedVoice.css";

import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { ReactComponent as BackIcon } from "../assets/back_btn.svg";
import { ReactComponent as BackIcon2 } from "../assets/back_btn2.svg";
import { ReactComponent as HomeIcon } from "../assets/home_btn.svg";
import { ReactComponent as HomeIcon2 } from "../assets/home_btn2.svg";
import React from "react";

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

  const darkIcon = location.state.theme === 2 || location.state.theme === 3;
  const BackIconToUse = darkIcon ? BackIcon2 : BackIcon;
  const HomeIconToUse = darkIcon ? HomeIcon2 : HomeIcon;

  return (
    <div
      className={`received-voice-page received-voice-page-theme${location.state.theme}`}
    >
      <div className="top-menu">
        <BackIconToUse className="back-btn" onClick={backBtnHandler} />
        <HomeIconToUse className="home-btn" onClick={homeBtnHandler} />
      </div>
      <div className="voice-contents-box">
        <p className="received-recipient">To. {location.state.dear_name}</p>
        <div className="voice-contents">
          <audio ref={audioRef} src={location.state.voice_data.voice_url} />
          <div className="record-image">
            <img
              src={require(`../assets/Recording_icon${location.state.theme}.png`)}
              alt="녹음 아이콘"
            ></img>
          </div>
          <div className="record-bar">
            <div className="play-btn" onClick={playBtnHandler}>
              <img
                src={
                  play
                    ? require(`../assets/pause_btn${location.state.theme}.png`)
                    : require(`../assets/play_btn${location.state.theme}.png`)
                }
                alt={play ? "정지 버튼" : "재생 버튼"}
              ></img>
            </div>
            <div className="bar">
              <div className="base-bar" onClick={handleProgressBarClick}></div>
              <div className="main-bar" onClick={handleProgressBarClick}></div>
            </div>
          </div>
        </div>
        {location.state.sender && (
          <p className="received-sender">From. {location.state.sender}</p>
        )}
      </div>
    </div>
  );
}

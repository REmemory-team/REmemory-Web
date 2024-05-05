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
  const [play, setPlay] = useState(false);
  const [audioEnded, setAudioEnded] = useState(false);

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

    const handleEnded = () => {
      setPlay(false);
      setAudioEnded(true);
    };

    audio.addEventListener("timeupdate", updateProgressBar);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", updateProgressBar);
      audio.removeEventListener("ended", handleEnded);
    };
  }, []);

  const backBtnHandler = () => {
    navigate(-1);
  };
  const homeBtnHandler = () => {
    if (sessionStorage.getItem("token")) {
      navigate("/login/kakao/home");
    } else {
      navigate("/");
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

    const isMainBarClick = e.target.classList.contains("main-bar");
    const bar = isMainBarClick ? e.target.parentNode : e.target;

    const barRect = bar.getBoundingClientRect();
    const clickPositionX = e.clientX - barRect.left;
    const barWidth = barRect.width;
    const clickPositionRatio = clickPositionX / barWidth;

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
                  audioEnded
                    ? require(`../assets/play_btn${location.state.theme}.png`)
                    : play
                    ? require(`../assets/pause_btn${location.state.theme}.png`)
                    : require(`../assets/play_btn${location.state.theme}.png`)
                }
                alt={
                  audioEnded ? "재생 버튼" : play ? "정지 버튼" : "재생 버튼"
                }
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

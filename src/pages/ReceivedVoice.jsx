import "../styles/ReceivedVoice.css";

import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { ReactComponent as BackIcon } from "../assets/back_btn.svg";
import { ReactComponent as BackIcon2 } from "../assets/back_btn2.svg";
import { ReactComponent as HomeIcon } from "../assets/home_btn.svg";
import { ReactComponent as HomeIcon2 } from "../assets/home_btn2.svg";
import MetaTag from "../components/seo/SEOMetaTag";
import React from "react";

export default function ReceivedVoice() {
  const navigate = useNavigate();
  const location = useLocation();
  const audioRef = useRef(null);
  const [play, setPlay] = useState(false);
  const [audioEnded, setAudioEnded] = useState(false);
  const [themename, setThemename] = useState("default");

  useEffect(() => {
    const theme = location.state.theme;
    if (theme === 1) setThemename("default");
    else if (theme === 2) setThemename("birthday");
    else if (theme === 3) setThemename("love");
    else if (theme === 4) setThemename("parents");
    else if (theme === 5) setThemename("teachers");
    else if (theme === 6) setThemename("graduation");
    else if (theme === 7) setThemename("christmas");

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

    if (audioEnded) {
      audio.currentTime = 0;
      setAudioEnded(false);
    }

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
      <MetaTag
        title="RE:memory"
        description="감정을 기억하고 선물하다, RE:memory 
    감정을 기억하고 선물할 수 있는 온라인 롤링페이퍼, 편지, 타임캡슐 서비스"
        keywords="RE:memory, 감정을 기억하고 선물하다, 온라인 롤링페이퍼, 온라인 편지, 온라인 타임캡슐, 롤링페이퍼, 편지, 타임캡슐"
      />

      <div className="top-menu">
        <BackIconToUse
          className="back-btn"
          onClick={backBtnHandler}
          style={{ cursor: "pointer" }}
        />
        <HomeIconToUse
          className="home-btn"
          onClick={homeBtnHandler}
          style={{ cursor: "pointer" }}
        />
      </div>
      <div className="voice-contents-box">
        <p className="received-recipient">To. {location.state.dear_name}</p>
        <div className="voice-contents">
          <audio ref={audioRef} src={location.state.voice_data.voice_url} />
          <div className="record-image">
            <img
              src={require(`../assets/recordingIcons/record_${themename}.png`)}
              alt="녹음 아이콘"
            ></img>
          </div>
          <div className="record-bar">
            <div className="play-btn" onClick={playBtnHandler}>
              <img
                src={
                  audioEnded
                    ? require(`../assets/playIcons/play_${themename}.png`)
                    : play
                    ? require(`../assets/pauseIcons/pause_${themename}.png`)
                    : require(`../assets/playIcons/play_${themename}.png`)
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

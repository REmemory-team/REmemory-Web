// 음성 편지 작성

import "../styles/Recording.css";

import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import axios from "axios";
import fileIcon from "../assets/voice_file.png";

export default function Record() {
  //const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [stream, setStream] = useState();
  const [media, setMedia] = useState();
  const [onRec, setOnRec] = useState(true);
  const [source, setSource] = useState("");
  const [analyser, setAnalyser] = useState("");
  const [audioUrl, setAudioUrl] = useState("");
  const [playAudio, setPlayAudio] = useState();
  const [nowTheme, setNowTheme] = useState("");
  const [nowPurpose, setNowPurpose] = useState("");
  const [capsule_number, setCapsule_number] = useState("");
  const [audioState, setaudioState] = useState(false);
  const location = useLocation();
  const receivedData = location.state;
  const dear_name = receivedData.dear_name;
  const navigate = useNavigate("");
  // const userId = sessionStorage.getItem("userId");

  useEffect(() => {
    //setIsLoggedIn(false);
    setNowPurpose(receivedData.purpose);
    setNowTheme(receivedData.theme);
    setCapsule_number(receivedData.capsule_number);
  }, []);

  const attachAudio = () => {
    const fileInput = document.getElementById("audioFileInput");
    fileInput.click();
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    setAudioUrl(file);
    setPlayAudio(null);
  };

  const onRecAudio = () => {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const analyser = audioCtx.createScriptProcessor(0, 1, 1);
    setAnalyser(analyser);

    function makeSound(stream) {
      const source = audioCtx.createMediaStreamSource(stream);
      setSource(source);
      source.connect(analyser);
      analyser.connect(audioCtx.destination);
    }

    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorder.start();
        setStream(stream);
        setMedia(mediaRecorder);
        makeSound(stream);

        analyser.onaudioprocess = function (e) {
          setOnRec(false);
        };
      })
      .catch((error) => {
        alert("녹음 권한을 허용해주세요!");
      });
  };

  const offRecAudio = () => {
    media.ondataavailable = function (e) {
      setAudioUrl(e.data);
      setOnRec(true);
      setPlayAudio(null);
    };

    stream.getAudioTracks().forEach(function (track) {
      track.stop();
    });

    media.stop();

    analyser.disconnect();
    source.disconnect();
  };

  const play = () => {
    if (playAudio) {
      if (playAudio.paused) {
        playAudio.play();
        setaudioState(true);
      } else {
        playAudio.pause();
        setaudioState(false);
      }
    } else {
      if (audioUrl) {
        const newAudio = new Audio(URL.createObjectURL(audioUrl));
        newAudio.loop = false;
        newAudio.volume = 1;
        newAudio.onended = () => setaudioState(false);
        newAudio.play();
        setaudioState(true);
        setPlayAudio(newAudio); //현재 재생 중인 오디오 업데이트
      } else {
        alert("실행 가능한 녹음 파일이 없습니다");
      }
    }
  };

  const decisionBtnHandler = () => {
    const formData = new FormData();
    if (audioUrl) {
      if (window.confirm("작성을 끝낼까요? 이후 수정이 불가합니다.")) {
        if (playAudio && !playAudio.pause()) {
          playAudio.pause();
        }
        if (nowPurpose === "toMe" || nowPurpose === "toSomeone") {
          formData.append("capsule_number", capsule_number);
          formData.append("voice_pcapsule", audioUrl);
          axios
            .post(
              `${process.env.REACT_APP_API_BASE_URL}/pcapsule/create/voice`,
              formData,
              {
                headers: {
                  "Content-Type": "multipart/form-data",
                },
              }
            )
            .then((response) => {
              console.log("서버응답:", response);
              navigate("/capsule/assign-number", {
                state: { capsule_number: capsule_number },
              });
            })
            .catch((error) => {
              window.alert("오류:", error);
            });
        } else if (nowPurpose === "rollingPaper") {
          formData.append("voice_rcapsule", audioUrl);
          axios
            .post(
              `${process.env.REACT_APP_API_BASE_URL}/rcapsule/voice/${capsule_number}`,
              formData,
              {
                params: {
                  from_name: receivedData.from_name,
                  content_type: "2",
                },
                headers: {
                  "Content-Type": "multipart/form-data",
                },
              }
            )
            .then((response) => {
              console.log("서버응답:", response);
              navigate("/"); //편지 작성 완료 화면으로
            })
            .catch((error) => {
              console.error("오류:", error);
            });
        }
      }
    } else {
      alert("음성편지를 작성해주세요");
    }
  };

  useEffect(() => {
    const bold = document.querySelector(".bold");
    if (playAudio) {
      playAudio.addEventListener("timeupdate", () => {
        const currentTime = playAudio.currentTime;
        const duration = playAudio.duration;
        const percentage = (currentTime / duration) * 100;
        const boldWidth = (percentage * 10.5) / 100;
        bold.style.width = `${boldWidth}rem`;
      });
    }
  }, [playAudio]);

  return (
    <div className={`recording_page theme${nowTheme}`}>
      <div className={`recording_box theme${nowTheme}`}>
        <div className="icon_container">
          <div className={`dear_capsule theme${nowTheme}`}>
            To. {dear_name}{" "}
          </div>
          <div className="mike" onClick={onRec ? onRecAudio : offRecAudio}>
            <img
              src={require(`../assets/Recording_icon${nowTheme}.png`)}
              alt="마이크 아이콘"
              className={onRec ? "mic_icon" : "mic_icon moving"}
            />
          </div>
          <img
            src={
              audioState
                ? require(`../assets/pause_btn${nowTheme}.png`)
                : require(`../assets/play_btn${nowTheme}.png`)
            }
            alt={audioState ? "정지 버튼" : "재생 버튼"}
            id="play_button"
            onClick={!onRec ? null : play}
          />
          <div className="play_bar">
            <div className={`light theme${nowTheme}`}></div>
            <div className={`bold theme${nowTheme}`}></div>
          </div>

          <div className="add_file">
            <img
              className="file_icon"
              src={fileIcon}
              alt="파일 아이콘"
              onClick={attachAudio}
            />
            <input
              type="file"
              id="audioFileInput"
              accept="audio/*"
              style={{ display: "none" }}
              onChange={handleFileUpload}
            />
            <span className="file_name">{audioUrl.name}</span>
          </div>
        </div>
      </div>
      <div
        className={`record_submit_button theme${nowTheme}`}
        onClick={decisionBtnHandler}
      >
        다했어요!
      </div>
    </div>
  );
}

import "../styles/Recording.css";
import React, { useState, useEffect } from 'react';
//import { useLocation } from 'react-router-dom';
import mikeIcon1 from '../assets/Recording_icon1.png';
import playIcon1 from '../assets/play_btn1.png';

export default function Record() {
  const [isLoggedIn, setIsLoggedIn] = useState("");
  const [stream, setStream] = useState("");
  const [media, setMedia] = useState("");
  const [onRec, setOnRec] = useState(true);
  const [source, setSource] = useState("");
  const [analyser, setAnalyser] = useState("");
  const [audioUrl, setAudioUrl] = useState("");
  const [disabled, setDisabled] = useState(true);
  const dear_name="ME";
  //const location = useLocation();
  //const dearInfo = location.state;

  //로그인 확인 함수(임시저장 버튼 여부)
  function checkLoggedIn() {
    // const loginData = 0; //서버에서 로그인 여부 받아오기
    return true;
  }

  //컴포넌트가 마운트 될 때 서버에서 받아온 데이터를 기반으로 로그인 상태 설정
  useEffect(() => {
    setIsLoggedIn(checkLoggedIn());
  }, []);

  //사용자가 임시 저장 버튼을 누를 때
  /*const tempRecording = async () => {
    //서버에 데이터 전송
    try {
      const response = await axios.post('/api/', {
        // { record: 'url', Key: 'Value' }
      });
      console.log('서버 응답:', response.data);
    } 
    catch (error) {
      console.error('오류 발생:', error);
    }
  };*/

  const tempRecording = () =>{
    alert("임시저장 완료");
  }

  //사용자가 음성 녹음을 시작할 때
  const onRecAudio = () => {

    setDisabled(true); //녹음 중 버튼 비활성화
    
    //녹음 정보를 담은 노드를 생성하거나 음원을 실행 또는 디코딩
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

    //자바스크립트를 통해 음원의 진행상태 직접접근에 사용
    const analyser = audioCtx.createScriptProcessor(0, 1, 1);
    setAnalyser(analyser);

    function makeSound(stream) {
      //내 컴퓨터의 마이크나 다른 소스를 통해 발생한 오디오 스트림의 정보를 보여줌
      const source = audioCtx.createMediaStreamSource(stream);
      setSource(source);
      source.connect(analyser);
      analyser.connect(audioCtx.destination);
    }

    //마이크 사용 권한 획득
    navigator.mediaDevices.getUserMedia({ audio: true })
    .then((stream) => {
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorder.start(); //녹음 시작
      setStream(stream);
      setMedia(mediaRecorder);
      makeSound(stream);

      analyser.onaudioprocess = function (e) {
        //180초 지나면 자동으로 음성 저장 및 녹음 중지
        if (e.playbackTime > 180) {
          //모든 트랙에서 stop()을 호출해 오디오 스트림을 정지
          stream.getAudioTracks().forEach(function (track) {
            track.stop();
          });
          mediaRecorder.stop(); //녹음 중지

          //메서드가 호출 된 노드 연결 해제
          analyser.disconnect();
          audioCtx.createMediaStreamSource(stream).disconnect();

          //dataavailable 이벤트로 Blob 데이터에 대한 응답을 받을 수 있음
          mediaRecorder.ondataavailable = function (e) {
            setAudioUrl(e.data); //e.data는 Blob 형태의 데이터
            setOnRec(true);
          };
        } else {
          setOnRec(false);
        }
      };
    })
    .catch((error) => {
      alert("녹음 권한을 허용해주세요!");
    });
  };

  //사용자가 음성 녹음을 중지할 때
  const offRecAudio = () => {
    media.ondataavailable = function (e) {
      setAudioUrl(e.data);
      setOnRec(true);
    };

    stream.getAudioTracks().forEach(function (track) {
      track.stop();
    });

    media.stop();

    analyser.disconnect();
    source.disconnect();
    
    if (audioUrl) {
      URL.createObjectURL(audioUrl);
      console.log(audioUrl); //출력된 링크에서 녹음된 오디오 확인 가능
    }
    
    //파일 생성자를 사용해 파일로 변환
    const sound = new File([audioUrl], "soundBlob", {
      lastModified: new Date().getTime(),
      type: "audio",
    });
  
    setDisabled(false); //녹음 버튼 다시 활성화
    console.log(sound); //파일 정보 출력
  };


  //사용자가 재생 버튼 누를 시
  const play = () => { 
    const audio = new Audio(URL.createObjectURL(audioUrl));
    audio.loop = false;
    audio.volume = 1;
    audio.play();
  };

  return (
    <div className="recording_page">
        
      {isLoggedIn && (
        <div className="temp_save_button" onClick={tempRecording}>임시저장</div>
      )}

        <div className="recording_box">
            <div className="icon_container">
            <div className="dear_capsule">To. {dear_name} </div>
            <div className="mike" onClick={onRec ? onRecAudio : offRecAudio}><img src={mikeIcon1} alt="마이크 아이콘"/></div>
            <img src={playIcon1} alt="재생 아이콘" id="play_button" onClick={play} disabled={disabled} />
            <div className="play_bar">
                <div className="light"></div>
                <div className="bold"></div>
            </div>
            </div>

        </div>

        <div className="capsule_pre_button">타임캡슐 미리보기</div>
        
        <div className="record_submit_button">다했어요!</div>
    </div>
  )
}
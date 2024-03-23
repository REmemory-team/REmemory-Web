// 캡슐 확인 (오픈된 캡슐 확인, 오픈되지 않은 캡슐..)

import "../styles/OpenCapsule.css";

import { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import Menu from "../components/Menu";
import axios from "axios";
import icon_clock from "../assets/icon_clock.png";
import icon_menu from "../assets/icon_menu.png";
import icon_home from "../assets/icon_home.png";
import image_circle from "../assets/image_circle.png";
import image_empty from "../assets/image_empty.png";
import image_textballon from "../assets/image_textballon.png";
import image_add from "../assets/image_add.png";
import image_add_background from "../assets/image_add_background.png";
import image_share from "../assets/image_share.png";

const OpenCapsule = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const copyUrlRef = useRef();

  const [openMenu, setOpenMenu] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [remainingTime, setRemainingTime] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const theme = location.state.theme;
  const status = location.state.status;
  const isPcapsule = location.state && location.state.pcapsule_name;
  const { tens, units } = seperateDigits(location.state.rcapsule_cnt);

  function seperateDigits(number){
    let tens, units;
    if(number>99){
      tens = 9; units = 9;
    } else{
      tens = Math.floor(number/10);
      units = number % 10;
    }
    return { tens, units };
  }
  
  const userNickname = sessionStorage.getItem("nickname");

  useEffect(() => {
    if (status !== "OPENED") {
      const targetDate = new Date(location.state.open_date);

      const updateRemainingTime = () => {
        const currentDate = new Date();
        const timeDiff = targetDate.getTime() - currentDate.getTime();
        if (timeDiff <= 0) {
          clearInterval(interValId);
          setRemainingTime({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        } else {
          const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
          const hours = Math.floor(
            (timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          );
          const minutes = Math.floor(
            (timeDiff % (1000 * 60 * 60)) / (1000 * 60)
          );
          const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
          setRemainingTime({ days, hours, minutes, seconds });
        }
      };
      updateRemainingTime();
      const interValId = setInterval(updateRemainingTime, 1000);

      return () => clearInterval(interValId);
    }
  }, []);

  const menuHandler = () => {
    if (!isLoaded) {
      setIsLoaded(true);
    }
    setOpenMenu(!openMenu);
  };
  const checkCapsule = () => {
    axios
      .get("https://dev.mattie3e.store/capsule/retrieve/detail", {
        params: {
          capsule_number: location.state.capsule_number,
          capsule_password: location.state.password,
        },
      })
      .then((response) => {
        //롤링페이퍼
        if (response.data.result.rcapsules) {
          navigate("/capsule/open/rolling", { state: response.data.result });
        } else {
          //글+사진
          const state = response.data.result.pcapsules;
          if (state.content_type === 1) {
            navigate("/capsule/open/text", { state });
          }
          //음성메세지
          else {
            navigate("/capsule/open/voice", { state });
          }
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const handleCreateCapsule = () => {
    if(userNickname){
      navigate(`/capsule/settings/theme`);
    }else{
      navigate(`/`);
    }
  }
  const handleCopyUrl = (e) => {
    if(!document.queryCommandSupported("copy")){
        return alert("복사 기능이 지원되지 않는 브라우저입니다");
    }
    copyUrlRef.current.select();
    document.execCommand('copy');
    e.target.focus();

    alert("복사되었습니다");
}
  return (
    <div className={["OpenCapsule", theme].join(" theme")}>
      {/* {status !== "OPENED" && ( */}
      <div className="btn_top">
        <img
          className="icon_home"
          alt=""
          src={icon_home}
          onClick={() => {userNickname ? navigate(`/login/kakao/home`) : navigate(`/`)}}
        />
        <img
          className="icon_menu"
          alt=""
          src={icon_menu}
          onClick={menuHandler}
        />
      </div>
      {/* )} */}
      {isLoaded && (
        <div className={["menu", openMenu].join(" ")}>
          <Menu menuHandler={menuHandler} />
        </div>
      )}
      <div className="container">
        {status !== "OPENED" &&
          <div className="numberOfLetters">
            <p>작성된 편지 : </p>
            <p className="counter">{tens}</p>
            <p className="counter">{units}</p>
            <p>통</p>
          </div>
        }
        <div className="image_section">
          <img
            className={[
              "img_isOpened",
              status === "OPENED",
            ].join("_")}
            alt=""
            src={image_empty}
          />
          <div
            className={["ellipses", status === "OPENED"].join(
              "_"
            )}
          >
            <img className="circle" alt="" src={image_circle} />
            <img className="ellipse type1" alt="" src={image_empty} />
            <img className="ellipse type2" alt="" src={image_empty} />
            <img className="ellipse type3" alt="" src={image_empty} />
          </div>
        </div>
        <div className="text_section">
          <img className="clock" alt="" src={icon_clock} />
          {status === "OPENED" ? (
            <div className="maintext">오픈된 타임캡슐</div>
          ) : (
            <div className="maintext">타임캡슐 오픈까지</div>
          )}
          <button
            className={[
              "btn_isOpened",
              status === "OPENED",
            ].join("_")}
          >
            {status === "OPENED" ? (
              <p onClick={checkCapsule}>확인하기</p>
            ) : (
              `${remainingTime.days}일 ${remainingTime.hours}시간 ${remainingTime.minutes}분 ${remainingTime.seconds}초`
            )}
          </button>
        </div>
      </div>
        <div className="create_new">
          { isPcapsule &&
          <div className="textBalloon">
            <img alt="" src={image_textballon}/>
            <p>새로운 캡슐 만들러가기</p>
          </div>}            
          <div className="btn_bottom" onClick={isPcapsule ? handleCreateCapsule: handleCopyUrl}>
            <img alt="" src={image_add_background}/>
            <img className={isPcapsule?"add":"share"} alt="" src={isPcapsule ? image_add : image_share}/>
            <form>
              <textarea
                  ref={copyUrlRef}
                  defaultValue={window.location.href}
              />
            </form>   
            {!isPcapsule && <p>공유하기</p>}
          </div>
        </div>
    </div>
  );
};

export default OpenCapsule;

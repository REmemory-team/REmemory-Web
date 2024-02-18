// 캡슐 확인 (오픈된 캡슐 확인, 오픈되지 않은 캡슐..)

import "../styles/OpenCapsule.css";

import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import Menu from "../components/Menu";
import axios from "axios";
import icon_clock from "../assets/icon_clock.png";
import icon_menu from "../assets/icon_menu.png";
import image_circle from "../assets/image_circle.png";
import image_empty from "../assets/image_empty.png";

const OpenCapsule = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [openMenu, setOpenMenu] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [remainingTime, setRemainingTime] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const theme = location.state.theme;

  useEffect(() => {
    if (location.state.status !== "OPENED") {
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
        console.log(response.data.result);
        const data = response.data.result;
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

  return (
    <div className={["OpenCapsule", theme].join(" theme")}>
      {location.state.status !== "OPENED" && (
        <img
          className="image_menu"
          alt=""
          src={icon_menu}
          onClick={menuHandler}
        />
      )}
      {isLoaded && (
        <div className={["menu", openMenu].join(" ")}>
          <Menu menuHandler={menuHandler} />
        </div>
      )}
      <div className="container">
        <div className="image_section">
          <img
            className={[
              "img_isOpened",
              location.state.status === "OPENED",
            ].join("_")}
            alt=""
            src={image_empty}
          />
          <div
            className={["ellipses", location.state.status === "OPENED"].join(
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
          {location.state.status === "OPENED" ? (
            <div className="maintext">오픈된 타임캡슐</div>
          ) : (
            <div className="maintext">타임캡슐 오픈까지</div>
          )}
          <button
            className={[
              "btn_isOpened",
              location.state.status === "OPENED",
            ].join("_")}
          >
            {location.state.status === "OPENED" ? (
              <p onClick={checkCapsule}>확인하기</p>
            ) : (
              `${remainingTime.days}일 ${remainingTime.hours}시간 ${remainingTime.minutes}분 ${remainingTime.seconds}초`
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default OpenCapsule;

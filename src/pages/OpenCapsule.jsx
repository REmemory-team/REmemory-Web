// 캡슐 확인 (오픈된 캡슐 확인, 오픈되지 않은 캡슐..)

import "../styles/OpenCapsule.css";

import Menu from "../components/Menu";
import icon_clock from "../assets/icon_clock.png";
import icon_menu from "../assets/icon_menu.png";
import image_circle from "../assets/image_circle.png";
import image_ellipse from "../assets/image_ellipse.png";
import image_openedCapsule from "../assets/image_openedCapsule.png";
import image_unopenedCapsule from "../assets/image_unopenedCapsule.png";

import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const OpenCapsule = () => {
  const location = useLocation();
  const navigate = useNavigate();
  // state: {
  //   capsule_number: response.data.result.pcapsules.capsule_number,
  //   password: password,
  //   pcapsule_name: response.data.result.pcapsules.pcapsule_name,
  //   open_date: response.data.result.pcapsules.open_date,
  //   dear_name: response.data.result.pcapsules.dear_name,
  //   theme: response.data.result.pcapsules.theme,
  //   status: status,
  // }
  const [openMenu, setOpenMenu] = useState(false);
  const [remainingTime, setRemainingTime] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(()=>{
    const targetDate = new Date(location.state.open_date);  

    const updateRemainingTime = () => {
      const currentDate = new Date();
      const timeDiff = targetDate.getTime() - currentDate.getTime();
      if(timeDiff <= 0 ){
        clearInterval(interValId);
        setRemainingTime({days:0, hours:0, minutes:0, seconds:0});
      } else{  
        const days = Math.floor(timeDiff/(1000*60*60*24));
        const hours = Math.floor((timeDiff % (1000*60*60*24))/(1000*60*60));
        const minutes = Math.floor((timeDiff % (1000*60*60))/(1000*60));
        const seconds = Math.floor((timeDiff % (1000*60))/1000);
        setRemainingTime({days, hours, minutes, seconds});
      }
    };
    updateRemainingTime();    
    const interValId = setInterval(updateRemainingTime, 1000);

    return () => clearInterval(interValId);
  }, []);

  const menuHandler = () => {
    setOpenMenu(!openMenu);
  };

  const checkCapsule = () => {
    axios
      .get("https://dev.mattie3e.store/pcapsule/retrieveDetail", {
        params: {
          capsule_number: location.state.capsuleNum,
          password: location.state.password,
        },
      })
      .then((response) => {
        console.log(response);
        const state = {
          capsule_number: response.data.result.pcapsules.capsule_number,
          pcapsule_name: response.data.result.pcapsules.pcapsule_name,
          open_date: response.data.result.pcapsules.open_date,
          dear_name: response.data.result.pcapsules.dear_name,
          theme: response.data.result.pcapsules.theme,
          content_type: response.data.result.pcapsules.content_type,
          body: response.data.result.pcapsules.body,
          text_image_id: response.data.result.pcapsules.text_image_id,
        };
        switch(state.content_type){
          case 1:
            navigate("/capsule/open/rolling", {state});
            break;
          case 2:
            navigate("/capsule/open/text", {state});
            break;
          case 3:
            navigate("/capsule/open/voice", {state});
            break;
          default:
            console.log("올바르지 않은 content_type입니다.");
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  
  return (
    <div className="OpenCapsule">
      {location.state.status === "locked" && (
        <img
          className="image_menu"
          alt=""
          src={icon_menu}
          onClick={menuHandler}
        />
      )}
      {openMenu && (
        <div className="menu">
          <Menu menuHandler={menuHandler} />
        </div>
      )}
      <div className="container">
        <div className="image_section">
          <img
            className={["img_isOpened", location.state.status !== "locked"].join("_")}
            alt=""
            src={location.state.status !== "locked" ? image_openedCapsule : image_unopenedCapsule}
          />
          <div className={["ellipses", location.state.status !== "locked"].join("_")}>
            <img className="circle" alt="" src={image_circle} />
            <img className="ellipse type1" alt="" src={image_ellipse} />
            <img className="ellipse type2" alt="" src={image_ellipse} />
            <img className="ellipse type3" alt="" src={image_ellipse} />
          </div>
        </div>
        <div className="text_section">
          <img className="clock" alt="" src={icon_clock} />
          {location.state.status !== "locked" ? (
            <div className="maintext">오픈된 타임캡슐</div>
          ) : (
            <div className="maintext">타임캡슐 오픈까지</div>
          )}
          <button className={["btn_isOpened", location.state.status !== "locked"].join("_")}>
            {location.state.status !== "locked" ? <p onClick={checkCapsule}>확인하기</p> : `${remainingTime.days}일 ${remainingTime.hours}시간 ${remainingTime.minutes}분 ${remainingTime.seconds}초`}
          </button>
        </div>
      </div>
    </div>
  );
};

export default OpenCapsule;

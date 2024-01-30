import "../styles/OpenCapsule.css";
import Menu from "../components/Menu";
import { useState } from "react";

import image_openedCapsule from "../assets/image_openedCapsule.png";
import image_unopenedCapsule from "../assets/image_unopenedCapsule.png";
import image_ellipse from "../assets/image_ellipse.png";
import image_circle from "../assets/image_circle.png";
import icon_clock from "../assets/icon_clock.png";
import icon_menu from "../assets/icon_menu.png";

const OpenCapsule = () => {
    const [isOpened, setIsOpened] = useState(false);
    const [openMenu, setOpenMenu] = useState(false);
    const menuHandler = () => {
        setOpenMenu(!openMenu);
    }
    return(
        <div className="OpenCapsule">
            {!isOpened && <img className="image_menu" alt="" src={icon_menu} onClick={menuHandler}/>}
            { openMenu && <div className="menu"><Menu menuHandler={menuHandler}/></div>}
            <img className={["img_isOpened", isOpened].join("_")} alt="" src={isOpened?image_openedCapsule:image_unopenedCapsule}/>
            <img className="clock" alt="" src={icon_clock}/>
            {isOpened ? 
            <div className="maintext">오픈된 타임캡슐</div>
            : <div className="maintext">타임캡슐 오픈까지</div>
            }
            <div className="button_wrapper">
                <button className={["btn_isOpened", isOpened].join("_")}>
                    {isOpened
                    ?"확인하기"
                    :"54일 1시간 30분 40초"
                    }
                </button>
            </div>
            <button onClick={()=>setIsOpened(!isOpened)}>toggle</button>
            <div className={["ellipses", isOpened].join("_")}>
                <img className="circle"alt="" src={image_circle}/>
                <img className="ellipse type1"alt="" src={image_ellipse}/>
                <img className="ellipse type2"alt="" src={image_ellipse}/>
                <img className="ellipse type3"alt="" src={image_ellipse}/>
            </div>
        </div>
    )
}

export default OpenCapsule;
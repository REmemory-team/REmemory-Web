// 카카오 로그인 - 홈 화면 팝업창
import "../styles/CapsuleListItem.css";

import React from 'react';
import { useNavigate } from "react-router-dom";

export default function CapsuleListItem({imgSrc, name, number}) {
  const navigate = useNavigate();
  const handleList = () =>{
    navigate("/capsule/input-number",{
      state: number
    });
  }
  return (
    <div className="capsule_list" onClick={handleList}>
        <div className="list_image">
        <img src={imgSrc} alt="캡슐이미지" />
        </div>
        <span className="capsule_name">{name}</span>
        <span className="capsule_number">{number}</span>
    </div>
  );
};

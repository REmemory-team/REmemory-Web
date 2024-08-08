import "../styles/Settings.css";

import React, { useEffect, useState } from "react";

import { ReactComponent as BackIcon } from "../assets/back_btn.svg";
import { ReactComponent as HomeIcon } from "../assets/home_btn.svg";
import MetaTag from "../components/seo/SEOMetaTag";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Settings() {
  const navigate = useNavigate();
  const [nickname, setNickname] = useState("");
  const [newNickname, setNewNickname] = useState("");

  const token = sessionStorage.getItem("token");
  const userId = sessionStorage.getItem("userId");

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setNickname(response.data.result.nickname);
        sessionStorage.setItem("nickname", response.data.result.nickname);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const backBtnHandler = () => {
    navigate(-1);
  };

  const homeBtnHandler = () => {
    navigate("/login/kakao/home");
  };

  const handleNicknameChange = (event) => {
    setNewNickname(event.target.value);
  };

  const changeBtnHandler = () => {
    axios
      .patch(
        `${process.env.REACT_APP_API_BASE_URL}/user/nickname`,
        {
          userId: userId,
          nickname: newNickname,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        if (response.status === 200) {
          setNickname(response.data.result.nickname);
          sessionStorage.setItem("nickname", response.data.result.nickname);
          alert("닉네임이 변경되었습니다.");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const logoutBtnHandler = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("userId");
    sessionStorage.removeItem("nickname");
    navigate("/");
  };

  const withdrawalBtnHandler = () => {
    const isConfirmed = window.confirm("정말로 탈퇴하시겠습니까?");
    if (isConfirmed) {
      axios
        .patch(
          `${process.env.REACT_APP_API_BASE_URL}/user/deactivate`,
          { userId: userId },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          if (response.data.isSuccess) {
            sessionStorage.removeItem("token");
            sessionStorage.removeItem("userId");
            sessionStorage.removeItem("nickname");
            alert("탈퇴가 성공적으로 처리되었습니다.");
            navigate("/");
          }
        })
        .catch((error) => {
          console.error(error);
          alert("오류가 발생했습니다.");
        });
    }
  };

  return (
    <div className="setting-page">
      <MetaTag
        title="RE:memory"
        description="감정을 기억하고 선물하다, RE:memory 
    감정을 기억하고 선물할 수 있는 온라인 롤링페이퍼, 편지, 타임캡슐 서비스"
        keywords="RE:memory, 감정을 기억하고 선물하다, 온라인 롤링페이퍼, 온라인 편지, 온라인 타임캡슐, 롤링페이퍼, 편지, 타임캡슐"
      />

      <div className="top-menu">
        <BackIcon className="back-btn" onClick={backBtnHandler} />
        <HomeIcon className="home-btn" onClick={homeBtnHandler} />
      </div>
      <p className="settings">계정 설정</p>
      <div className="section1">
        <div className="user">
          <p className="user-name">{nickname} 님</p>
          <div className="kakao">
            <div className="kakao-logo"></div>
            <span className="kakao-login">
              <span>카카오</span>로 로그인 중
            </span>
          </div>
        </div>
        <div className="rememory-logo"></div>
      </div>
      <hr />
      <div className="section2">
        <p className="nickname">닉네임</p>
        <input
          type="text"
          onChange={handleNicknameChange}
          placeholder={nickname}
          className="nickname-input"
          maxLength="10"
        ></input>
        <span className="change-btn" onClick={changeBtnHandler}>
          변경하기
        </span>
      </div>
      <hr />
      <div className="section3">
        <div className="logout">
          <div className="logout-icon"></div>
          <div className="logout-title" onClick={logoutBtnHandler}>
            로그아웃
          </div>
        </div>
        <div className="withdrawal" onClick={withdrawalBtnHandler}>
          회원탈퇴
        </div>
      </div>
      <hr />
      <div className="footer">
        <a
          href="https://inwhite.notion.site/RE-memory-3840ad5e297b4639bfd1875e4b2a2cac"
          target="_blank"
          rel="noopener noreferrer"
        >
          개인정보처리방침
        </a>
        <span> | </span>
        <a
          href="https://inwhite.notion.site/RE-memory-22c641e798ef496496ef4f072d270f41"
          target="_blank"
          rel="noopener noreferrer"
        >
          이용약관
        </a>
      </div>
    </div>
  );
}

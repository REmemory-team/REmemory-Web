// 계정 설정 화면

import "../styles/Settings.css";

import React, { useEffect, useState } from "react";

import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Settings() {
  const navigate = useNavigate();
  const [nickname, setNickname] = useState("");
  const [newNickname, setNewNickname] = useState("");

  const token = sessionStorage.getItem("token");
  const userId = sessionStorage.getItem("userID");

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response);
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
  // 닉네임 변경
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
        console.log(response);
        if (response.status === 200) {
          alert("닉네임이 변경되었습니다.");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
  // 로그아웃
  const logoutBtnHandler = () => {
    sessionStorage.removeItem("userToken");
    sessionStorage.removeItem("userId");
    sessionStorage.removeItem("nickname");
    navigate("/");
  };
  // 회원탈퇴
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
          console.log(response);
          if (response.data.isSuccess) {
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
      <div className="top-menu">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="27"
          height="19"
          viewBox="0 0 27 19"
          fill="none"
          className="back-btn"
          onClick={backBtnHandler}
        >
          <path
            d="M26.625 8.04167H5.96042L11.1812 2.80625L9.125 0.75L0.375 9.5L9.125 18.25L11.1812 16.1938L5.96042 10.9583H26.625V8.04167Z"
            fill="white"
          />
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="26"
          height="24"
          viewBox="0 0 26 24"
          fill="none"
          className="home-btn"
          onClick={homeBtnHandler}
        >
          <path
            d="M12.9167 0C12.9167 0 4.92642 6.8975 0.461125 10.633C0.319038 10.7568 0.204561 10.9091 0.125122 11.08C0.0456818 11.2509 0.00305301 11.4366 0 11.625C0 11.9676 0.136086 12.2961 0.37832 12.5383C0.620555 12.7806 0.949095 12.9167 1.29167 12.9167H3.875V21.9583C3.875 22.3009 4.01109 22.6294 4.25332 22.8717C4.49556 23.1139 4.8241 23.25 5.16667 23.25H9.04167C9.38424 23.25 9.71278 23.1139 9.95501 22.8717C10.1972 22.6294 10.3333 22.3009 10.3333 21.9583V16.7917H15.5V21.9583C15.5 22.3009 15.6361 22.6294 15.8783 22.8717C16.1206 23.1139 16.4491 23.25 16.7917 23.25H20.6667C21.0092 23.25 21.3378 23.1139 21.58 22.8717C21.8223 22.6294 21.9583 22.3009 21.9583 21.9583V12.9167H24.5417C24.8842 12.9167 25.2128 12.7806 25.455 12.5383C25.6973 12.2961 25.8333 11.9676 25.8333 11.625C25.8315 11.433 25.7861 11.2438 25.7003 11.072C25.6146 10.9001 25.4909 10.75 25.3386 10.633C20.9043 6.8975 12.9167 0 12.9167 0Z"
            fill="white"
            fill-opacity="0.9"
          />
        </svg>
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
        <a href="">개인정보처리방침</a>
        <span> | </span>
        <a href="">이용약관</a>
      </div>
    </div>
  );
}

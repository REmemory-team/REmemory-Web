// 캡슐번호로 타임캡슐 확인

import "../styles/CheckCapsuleByNumber.css";

import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import React from "react";
import axios from "axios";

export default function CheckCapsuleByNumber() {
  const navigate = useNavigate();
  const location = useLocation();
  const [capsuleNum, setCapsuleNum] = useState(""); // 캡슐 번호
  const [password, setPassword] = useState(""); // 비밀번호

  useEffect(() => {
    if (location.state && location.state.capsule_number) {
      setCapsuleNum(location.state.capsule_number);
    }
  }, [location.state]);

  const handleCapsuleNumChange = (event) => {
    setCapsuleNum(event.target.value);
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  // 확인 버튼 누르면 실행되는 함수
  const confirmBtnHandler = () => {
    // if (!capsuleNum) {
    //   alert("캡슐번호를 입력해주세요.");
    //   return;
    // }
    // if (!password) {
    //   alert("비밀번호를 입력해주세요.");
    //   return;
    // }
    // axios
    //   .get(`${process.env.REACT_APP_API_BASE_URL}/capsule/retrieve`, {
    //     params: {
    //       capsule_number: capsuleNum,
    //       capsule_password: password,
    //     },
    //   })
    //   .then((response) => {
    //     if (response.status === 200) {
    //       if (response.data.result.pcapsules) {
    //         navigate("/capsule/verify", {
    //           state: {
    //             capsule_number: response.data.result.pcapsules.capsule_number,
    //             password: password,
    //             pcapsule_name: response.data.result.pcapsules.pcapsule_name,
    //             open_date: response.data.result.pcapsules.open_date,
    //             dear_name: response.data.result.pcapsules.dear_name,
    //             theme: response.data.result.pcapsules.theme,
    //             content_type: response.data.result.pcapsules.content_type,
    //             status: response.data.result.pcapsules.status,
    //           },
    //         });
    //       } else {
    //         navigate("/capsule/verify", {
    //           state: {
    //             capsule_number: response.data.result.rcapsules.capsule_number,
    //             password: password,
    //             rcapsule_name: response.data.result.rcapsules.pcapsule_name,
    //             open_date: response.data.result.rcapsules.open_date,
    //             dear_name: response.data.result.rcapsules.dear_name,
    //             theme: response.data.result.rcapsules.theme,
    //             rcapsule_cnt: response.data.result.rcapsules.rcapsule_cnt,
    //             status: response.data.result.rcapsules.status,
    //           },
    //         });
    //       }
    //     }
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //     if (error.response.status === 404) {
    //       alert("캡슐을 찾을 수 없습니다.");
    //     } else if (error.response.status === 400) {
    //       alert(error.response.data.message);
    //     } else {
    //       alert("오류가 발생했습니다.");
    //     }
    //   });
    navigate("/capsule/verify", {
      state: {
        capsule_number: "리메모리_72297",
        password: "123456",
        pcapsule_name: "test 중인 캡슐1",
        open_date: "2024-02-12T15:00:00.000Z",
        dear_name: "위트",
        theme: 3,
        content_type: 1,
        status: "OPENED",
      },
    });
  };

  return (
    <div className="check-capsule-page">
      <p className="check-capsule-message">캡슐번호로 타임캡슐 확인하기</p>
      <input
        type="text"
        value={capsuleNum}
        onChange={handleCapsuleNumChange}
        placeholder="캡슐번호를 입력해주세요"
        className="number-input-field"
      ></input>
      <br />
      <input
        type="password"
        value={password}
        onChange={handlePasswordChange}
        placeholder="비밀번호를 입력해주세요"
        className="password-input-field"
        maxLength={6}
      ></input>
      <br />
      <button onClick={confirmBtnHandler} className="capsule-check-btn">
        확인
      </button>
    </div>
  );
}

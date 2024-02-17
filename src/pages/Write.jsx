// 글&사진 편지 작성

import "../styles/Write.css";

import React, { useEffect, useRef, useState } from "react";

import axios from "axios";
import icon_alignCenter from "../assets/icon_alignCenter.png";
import icon_alignLeft from "../assets/icon_alignLeft.png";
import icon_alignRight from "../assets/icon_alignRight.png";
import icon_camera from "../assets/icon_camera.png";
import icon_alignCenter_white from "../assets/icon_alignCenter_white.png";
import icon_alignLeft_white from "../assets/icon_alignLeft_white.png";
import icon_alignRight_white from "../assets/icon_alignRight_white.png";
import icon_camera_white from "../assets/icon_camera_white.png";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router";

const Write = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const location = useLocation();

  // state: {
  //   dear_name: location.state.dear_name,
  //   theme: location.state.theme,
  //   purpose: location.state.purpose,
  //   capsule_number: response.data.result.capsule_number,
  // },
  
  const [receivedState, setReceivedState] = useState({
    dear_name: "dear_name",
    theme: 1,
    purpose: "",
    capsule_number: "testMember1_21956"
  });

  // useEffect(()=>{
  //   setReceivedState(location.state);
  // }, location);

  const [state, setState] = useState({
    capsule_number: receivedState.capsule_number,
    contents: [{ type: "text", content: "" }],
    alignType: "left",
  });

  //임시저장
  const handleSave = () => {
    window.alert("임시저장 되었습니다.");
  };

  //타임캡슐 미리보기
  // const goOverview = () => {
  //   navigate(`/`);
  // };

  const handleSubmit = async () => {
    if (window.confirm("작성을 끝낼까요?")) {
      console.log(state);
      // try{
      //     await axios.post('SERVER_URL', state);
      // navigate(`/`);
      // }catch(err){
      //     alert(err.response.data.message);
      // }
    }
  };

  //textarea 길이 조정
  const autoResizeTextarea = (e) => {
    let textarea;
    {
      typeof e === "number"
        ? (textarea = document.querySelector(`.index${e - 1}`))
        : (textarea = document.querySelector(`.index${e.target.id}`));
    }
    if (textarea) {
      textarea.style.height = "0";
      let height = textarea.scrollHeight;
      textarea.style.height = `${height}px`;
    }
  };

  //이미지 첨부/삭제
  const addItem = () => {
    const imageCount = state.contents.filter(
      (item) => item.type === "image"
    ).length;
    if (imageCount < 3) {
      fileInputRef.current.click();
    } else {
      alert("이미지는 최대 3장까지 추가할 수 있습니다.");
    }
  };

  const handleFileChange = (e) => {
    //선택한 파일에 대한 작업 수행
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      // 이미지 연달아 첨부하는 경우
      if (state.contents[state.contents.length - 1].content.length === 0) {
        state.contents.splice(state.contents.length - 1, 1);
      }
      //선택한 파일 읽기
      const reader = new FileReader();
      reader.onload = (event) => {
        setState({
          ...state,
          contents: [
            ...state.contents,
            { type: "image", content: event.target.result },
            { type: "text", content: "" },
          ],
        });
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleContentChange = (index, content) => {
    const newItems = [...state.contents];
    newItems[index].content = content;

    const allText = newItems.reduce((acc, item) => {
      if (item.type === "text") {
        acc += item.content;
      }
      return acc;
    }, "");

    if (allText.length <= 1000) {
      setState({
        ...state,
        contents: newItems,
      });
    } else {
      alert("텍스트 내용은 1000자를 초과할 수 없습니다.");
    }
  };
  const deleteImage = async (index) => {
    if (window.confirm("이미지를 삭제할까요?")) {
      const newItems = [state.contents];
      newItems[index - 1].content += "\n" + newItems[index + 1].content;
      newItems.splice(index, 2);
      await setState({
        ...state,
        contents: newItems,
      });
      await autoResizeTextarea(index);
    }
  };

  //텍스트 좌, 우, 가운데 정렬
  const changeAlignType = () => {
    if (state.alignType === "left") {
      setState({
        ...state,
        alignType: "center",
      });
    } else if (state.alignType === "center") {
      setState({
        ...state,
        alignType: "right",
      });
    } else {
      setState({
        ...state,
        alignType: "left",
      });
    }
  };
  return (
    <div className={["Write", receivedState.theme].join(" theme")}>
      <div className="write_top">
        <button className="btn_save" onClick={handleSave}>
          임시저장
        </button>
      </div>
      <div className="write_center">
        <div className="to">
          <p>To. {receivedState.dear_name}</p>
        </div>
        <div className="text">
          {state.contents.map((item, index) => (
            <div key={index}>
              {item.type === "text" ? (
                <textarea
                  value={item.content}
                  onChange={(e) => handleContentChange(index, e.target.value)}
                  className={`${state.alignType} index${index}`}
                  placeholder="여기에 작성하세요."
                  onKeyDown={autoResizeTextarea}
                  onKeyUp={autoResizeTextarea}
                  id={`${index}`}
                />
              ) : (
                <img
                  className="selected_image"
                  onClick={() => deleteImage(index)}
                  alt=""
                  src={item.content}
                />
              )}
            </div>
          ))}
        </div>
        <div className="buttons">
          <img
            className="btn_photo"
            onClick={addItem}
            alt=""
            src={receivedState.theme !== 3 ? icon_camera : icon_camera_white}
          />
          <input
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            ref={fileInputRef}
            onChange={handleFileChange}
          />
          {state.alignType === "left" && (
            <img
              className="btn_align"
              onClick={changeAlignType}
              alt=""
              src={receivedState.theme !== 3 ? icon_alignLeft : icon_alignLeft_white}
            />
          )}
          {state.alignType === "center" && (
            <img
              className="btn_align"
              onClick={changeAlignType}
              alt=""
              src={receivedState.theme !== 3 ? icon_alignCenter : icon_alignCenter_white}
            />
          )}
          {state.alignType === "right" && (
            <img
              className="btn_align"
              onClick={changeAlignType}
              alt=""
              src={receivedState.theme !== 3 ? icon_alignRight : icon_alignRight_white}
            />
          )}
        </div>
      </div>
      <div className="write_bottom">
        {/* <button className="btn_overview">타임캡슐 미리보기</button> */}
        <button className="btn_submit" onClick={handleSubmit}>
          다했어요!
        </button>
      </div>
    </div>
  );
};

export default Write;

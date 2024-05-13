import "../styles/Write.css";

import React, { useEffect, useRef, useState } from "react";

import MetaTag from "../components/seo/SEOMetaTag";
import axios from "axios";
import icon_alignCenter from "../assets/icon_alignCenter.png";
import icon_alignCenter_white from "../assets/icon_alignCenter_white.png";
import icon_alignLeft from "../assets/icon_alignLeft.png";
import icon_alignLeft_white from "../assets/icon_alignLeft_white.png";
import icon_alignRight from "../assets/icon_alignRight.png";
import icon_alignRight_white from "../assets/icon_alignRight_white.png";
import icon_camera from "../assets/icon_camera.png";
import icon_camera_white from "../assets/icon_camera_white.png";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router";

const Write = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const location = useLocation();

  const [receivedState, setReceivedState] = useState({
    dear_name: "",
    theme: 1,
    purpose: "",
    capsule_number: "",
  });

  const [state, setState] = useState({
    capsule_number: receivedState.capsule_number,
    contents: [{ type: "text", content: "" }],
    align_type: "left",
  });

  const [cursor, setCursor] = useState({
    pos: null,
    index: null,
  });

  const maxSize = 5 * 1024 * 1024;

  useEffect(() => {
    setReceivedState(location.state);
    setState({
      ...state,
      capsule_number: location.state.capsule_number,
    });
  }, [location]);

  useEffect(() => {
    resizeTextarea(state.contents);
  }, [state]);

  const handleSubmit = async () => {
    if (window.confirm("작성을 끝낼까요?")) {
      try {
        if (location.state.purpose === "rollingPaper") {
          const data = {
            ...state,
            from_name: location.state.from_name,
          };
          await axios.post(
            `${process.env.REACT_APP_API_BASE_URL}/rcapsule/create/text_image`,
            data
          );
          navigate("/capsule/write/Complete", {
            state: { theme: location.state.theme },
          });
        } else {
          await axios.post(
            `${process.env.REACT_APP_API_BASE_URL}/pcapsule/create/text_image`,
            state
          );
          navigate(`/capsule/assign-number`, {
            state: { capsule_number: state.capsule_number },
          });
        }
      } catch (err) {
        alert(err.response.data.message);
      }
    }
  };

  const autoResizeTextarea = (e, index) => {
    setCursor({ pos: e.target.selectionStart, index: index });
    let textarea = document.querySelector(`.index${e.target.id}`);
    if (textarea) {
      textarea.style.height = "0";
      let height = textarea.scrollHeight;
      textarea.style.height = `${height}px`;
    }
  };
  const resizeTextarea = (contents) => {
    for (let i = 0; i < contents.length; i++) {
      if (state.contents[i].type === "text") {
        if (document.getElementById(`${i}`)) {
          document.getElementById(`${i}`).value = contents[i].content;
          let textarea = document.querySelector(`.index${i}`);
          if (textarea) {
            textarea.style.height = "0";
            let height = textarea.scrollHeight;
            textarea.style.height = `${height}px`;
          }
        }
      }
    }
  };

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
    const selectedFile = e.target.files[0];
    const newArray = state.contents;
    if (selectedFile.size > maxSize) {
      alert("파일 크기는 5MB 이하만 첨부 가능합니다.");
      return;
    } else if (selectedFile) {
      const reader = new FileReader();
      if (
        cursor.pos === null ||
        (cursor.index === state.contents.length - 1 &&
          state.contents[cursor.index].content.substring(cursor.pos).length ===
            0)
      ) {
        reader.onload = (event) => {
          newArray.push({ type: "image", content: event.target.result });
          newArray.push({ type: "text", content: "" });
          setState({
            ...state,
            contents: newArray,
          });
        };
        reader.readAsDataURL(selectedFile);
        if (state.contents[state.contents.length - 1].content.length === 0) {
          newArray.splice(newArray.length - 1, 1);
        }
      } else {
        const textBeforeClick = state.contents[cursor.index].content.substring(
          0,
          cursor.pos
        );
        const textAfterClick = state.contents[cursor.index].content.substring(
          cursor.pos
        );
        reader.onload = (event) => {
          if (textBeforeClick.length !== 0 && textAfterClick.length !== 0) {
            newArray.splice(cursor.index, 1, {
              type: "text",
              content: textBeforeClick,
            });
            newArray.splice(cursor.index + 1, 0, {
              type: "text",
              content: textAfterClick,
            });
            newArray.splice(cursor.index + 1, 0, {
              type: "image",
              content: event.target.result,
            });
          } else if (textBeforeClick.length === 0) {
            if (cursor.index === 0) {
              newArray.unshift({ type: "image", content: event.target.result });
            } else {
              newArray.splice(cursor.index - 1, 0, {
                type: "image",
                content: event.target.result,
              });
            }
          } else {
            newArray.splice(cursor.index + 1, 0, {
              type: "image",
              content: event.target.result,
            });
          }
          setState({
            ...state,
            contents: newArray,
          });
          resizeTextarea(state.contents);
        };
        reader.readAsDataURL(selectedFile);
      }
      setCursor({ pos: null, index: null });
    }
  };

  const deleteImage = (index) => {
    if (window.confirm("이미지를 삭제할까요?")) {
      const newItems = state.contents;
      if (
        index !== 0 &&
        newItems[index - 1].type === "text" &&
        newItems[index + 1].type === "text"
      ) {
        newItems[index - 1].content += newItems[index + 1].content;
        newItems.splice(index, 2);
      } else {
        newItems.splice(index, 1);
      }
      setState({
        ...state,
        contents: newItems,
      });
      resizeTextarea(state.contents);
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

  const changeAlignType = () => {
    if (state.align_type === "left") {
      setState({
        ...state,
        align_type: "center",
      });
    } else if (state.align_type === "center") {
      setState({
        ...state,
        align_type: "right",
      });
    } else {
      setState({
        ...state,
        align_type: "left",
      });
    }
  };

  return (
    <div className={["Write", receivedState.theme].join(" theme")}>
      <MetaTag
        title="RE:memory"
        description="감정을 기억하고 선물하다, RE:memory 
    감정을 기억하고 선물할 수 있는 온라인 롤링페이퍼, 편지, 타임캡슐 서비스"
        keywords="RE:memory, 감정을 기억하고 선물하다, 온라인 롤링페이퍼, 온라인 편지, 온라인 타임캡슐, 롤링페이퍼, 편지, 타임캡슐"
      />
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
                  onClick={(e) => {
                    setCursor({ pos: e.target.selectionStart, index: index });
                  }}
                  onChange={(e) => handleContentChange(index, e.target.value)}
                  className={`${state.align_type} index${index}`}
                  placeholder="여기에 작성하세요."
                  onKeyDown={(e) => autoResizeTextarea(e, index)}
                  onKeyUp={(e) => autoResizeTextarea(e, index)}
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
          {state.align_type === "left" && (
            <img
              className="btn_align"
              onClick={changeAlignType}
              alt=""
              src={
                receivedState.theme !== 3
                  ? icon_alignLeft
                  : icon_alignLeft_white
              }
            />
          )}
          {state.align_type === "center" && (
            <img
              className="btn_align"
              onClick={changeAlignType}
              alt=""
              src={
                receivedState.theme !== 3
                  ? icon_alignCenter
                  : icon_alignCenter_white
              }
            />
          )}
          {state.align_type === "right" && (
            <img
              className="btn_align"
              onClick={changeAlignType}
              alt=""
              src={
                receivedState.theme !== 3
                  ? icon_alignRight
                  : icon_alignRight_white
              }
            />
          )}
        </div>
      </div>
      <div className="write_bottom">
        <button className="btn_submit" onClick={handleSubmit}>
          <span>다했어요!</span>
        </button>
      </div>
    </div>
  );
};

export default Write;

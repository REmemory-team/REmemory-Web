// 글&사진 편지 작성

import "../styles/Write.css";

import React, { useRef } from "react";
import { useEffect, useState } from "react";

import icon_alignCenter from "../assets/icon_alignCenter.png";
import icon_alignLeft from "../assets/icon_alignLeft.png";
import icon_alignRight from "../assets/icon_alignRight.png";
import icon_camera from "../assets/icon_camera.png";
import { useNavigate } from "react-router";

//import axios
const Write = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [data, setData] = useState({
    // recipient: "",
    // image: "",
    // text: "",
    alignType: "left",
    theme: "default",
  });
  const [items, setItems] = useState([{ type: 'text', content: '' }]);

  // useEffect(() => {}, []);

  //임시저장
  const handleSave = () => {
    window.alert("임시저장 되었습니다.");
  };

  //타임캡슐 미리보기
  const goOverview = () => {
    navigate(`/`);
  };

  const handleSubmit = () => {
    if (window.confirm("작성을 끝낼까요?")) {
      // try{
      //     axios.post(SERVER_URL, data);
      // }catch(err){
      //     window.alert(err);
      // }
      // navigate(`/`);
    }
  };

  //textarea 길이 조정
  const autoResizeTextarea = (e) => {
    let textarea;
    {typeof e === 'number' ?
      textarea = document.querySelector(`.index${e-1}`)
    : textarea = document.querySelector(`.index${e.target.id}`)
    }
    if (textarea) {
      textarea.style.height = "0";
      let height = textarea.scrollHeight;
      textarea.style.height = `${height}px`;
    }
  };

  //이미지 첨부/삭제
  const addItem = () => {
    fileInputRef.current.click();
  };
  const handleFileChange = (e) => {
    //선택한 파일에 대한 작업 수행
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      //선택한 파일 읽기
      const reader = new FileReader();
      reader.onload = (event) => {
        setItems([...items, { type: 'image', content: event.target.result }, { type: 'text', content: '' }]);
      };
      reader.readAsDataURL(selectedFile);
    }
  };
  const handleContentChange = (index, content) => {
    const newItems = [...items];
    newItems[index].content = content;
    setItems(newItems);
  };
  const deleteImage = async(index) => {
    if (window.confirm("이미지를 삭제할까요?")) {  
      const newItems = [...items];
      newItems[index - 1].content += '\n' + newItems[index + 1].content;
      newItems.splice(index, 2);
      await setItems(newItems);
      await autoResizeTextarea(index);
    }
  };

  //텍스트 좌, 우, 가운데 정렬
  const changeAlignType = () => {
    if (data.alignType === "left") {
      setData({
        ...data,
        alignType: "center",
      });
    } else if (data.alignType === "center") {
      setData({
        ...data,
        alignType: "right",
      });
    } else {
      setData({
        ...data,
        alignType: "left",
      });
    }
  };

  return (
    <div className={["Write", data.theme].join(" ")}>
      <div className="write_top">
        <button className="btn_save" onClick={handleSave}>임시저장</button>
      </div>
      <div className="write_center">
        <div className="to">
          <p>To. ME</p>
          {/* <input></input> */}
        </div>

        <div className="text">
          {items.map((item, index) => (
          <div key={index}>
            {item.type === 'text' ? (
              <textarea
                value={item.content}
                onChange={(e) => handleContentChange(index, e.target.value)}
                className={`${data.alignType} index${index}`}
                placeholder="여기에 작성하세요."
                onKeyDown={autoResizeTextarea}
                onKeyUp={autoResizeTextarea}
                id={`${index}`}
              />
            ) : (
              <img
                className="selected_image"
                onClick={()=>deleteImage(index)}
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
            src={icon_camera}
          />
          <input
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            ref={fileInputRef}
            onChange={handleFileChange}
          />
          {data.alignType === "left" && (
            <img
              className="btn_align"
              onClick={changeAlignType}
              alt=""
              src={icon_alignLeft}
            />
          )}
          {data.alignType === "center" && (
            <img
              className="btn_align"
              onClick={changeAlignType}
              alt=""
              src={icon_alignCenter}
            />
          )}
          {data.alignType === "right" && (
            <img
              className="btn_align"
              onClick={changeAlignType}
              alt=""
              src={icon_alignRight}
            />
          )}
        </div>
      </div>
      <div className="write_bottom">
        {/* <button className="btn_overview">타임캡슐 미리보기</button> */}
        <button className="btn_submit" onClick={handleSubmit}>다했어요!</button>
      </div>
    </div>
  );
};

export default Write;

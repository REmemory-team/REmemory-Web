// 미리보기

import "../styles/Preview.css";

import React from "react";

export default function Preview({ content, setShowPreview }) {
  return (
    <div className="preview-modal">
      <img src={content} alt="미리보기"></img>
      <button
        className="preview-close-btn"
        onClick={() => setShowPreview(false)}
      >
        닫기
      </button>
    </div>
  );
}

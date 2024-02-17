// 롤링페이퍼 타임캡슐 오픈 시 화면 - 작성된 편지들

import "../styles/RollingpaperContents.css";

import React from "react";
import { useNavigate } from "react-router-dom";

export default function RollingpaperContents({
  sender,
  format,
  theme,
  recipient,
  contents,
}) {
  const navigate = useNavigate();
  const contentsBoxHandler = () => {
    if (format === 1) {
      navigate("/capsule/open/text", {
        state: {
          sender: sender,
          theme: theme,
          dear_name: recipient,
          text_img_data: contents,
        },
      });
    } else if (format === 2) {
      navigate("/capsule/open/voice", {
        state: {
          sender: sender,
          theme: theme,
          dear_name: recipient,
          voice_data: contents,
        },
      });
    }
  };

  return (
    <div
      className={`rollingpaper-contents rolling-contents-theme${theme}`}
      onClick={contentsBoxHandler}
    >
      <p className="rolling-sender">From. {sender}</p>
      <p className="rolling-format">
        {format === 1
          ? "글/사진 메시지가 도착했습니다!"
          : "음성 메시지가 도착했습니다!"}
      </p>
    </div>
  );
}

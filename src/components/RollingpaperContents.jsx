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
    if (format === "글/사진") {
      navigate("/capsule/open/text", {
        state: {
          sender,
          theme,
          recipient,
          contents,
        },
      });
    } else if (format === "음성") {
      navigate("/capsule/open/voice", {
        state: {
          sender,
          theme,
          recipient,
          contents,
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
      <p className="rolling-format">{format} 메시지가 도착했습니다!</p>
    </div>
  );
}

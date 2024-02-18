// 롤링페이퍼 타임캡슐 오픈 시 화면 - 작성된 편지들

import "../styles/RollingpaperContents.css";

import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function RollingpaperContents({
  writerId,
  sender,
  format,
  theme,
  recipient,
}) {
  const navigate = useNavigate();

  const contentsBoxHandler = () => {
    axios
      .get(
        `${process.env.REACT_APP_API_BASE_URL}/rcapsule/retrieveDetail?writer_id=${writerId}`
      )
      .then((response) => {
        if (response.status === 200) {
          if (format === 1) {
            navigate("/capsule/open/text", {
              state: {
                sender: sender,
                theme: theme,
                dear_name: recipient,
                text_img_data: response.data.result.capsuledata.text_img_data,
              },
            });
          } else if (format === 2) {
            navigate("/capsule/open/voice", {
              state: {
                sender: sender,
                theme: theme,
                dear_name: recipient,
                voice_data: response.data.result.capsuledata.voice_data,
              },
            });
          }
        }
      })
      .catch((error) => {
        console.log(error);
        alert("오류가 발생했습니다.");
      });
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

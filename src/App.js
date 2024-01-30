import "./App.css";

import { Route, Routes } from "react-router-dom";

import CapsuleBasicSetting from "./pages/CapsuleBasicSetting";
import CheckCapsuleByNumber from "./pages/CheckCapsuleByNumber";
import ConfirmBasicSetting from "./pages/ConfirmBasicSetting";
import EnterURL from "./pages/EnterURL";
import ReceivedText from "./pages/ReceivedText";
import ReceivedVoice from "./pages/ReceivedVoice";
import RecipientInput from "./pages/RecipientInput";
import RollingpaperOpen from "./pages/RollingpaperOpen";
import WritingFormat from "./pages/WritingFormat";

import OpenCapsule from "./pages/OpenCapsule";
import Write from "./pages/Write";

import Home from "./pages/Home";
import Nickname from "./pages/Nickname";
import Recording from "./pages/Recording";

function App() {
  return (
    // 웹 처음 입장 시
    // 캡슐 확인
    // 카카오 로그인 - 이름(닉네임) 설정
    // 카카오 로그인 - 홈 화면
    // 글 & 사진 편지 작성
    // 음성 편지 작성
    // 캡슐 번호 부여 (용도1, 2)
    // 캡슐 번호 & URL 부여 (용도3)
    <div className="App">
      <Routes>
        <Route
          path="/capsule/input-number"
          element={<CheckCapsuleByNumber />}
        ></Route>
        <Route
          path="/capsule/settings"
          element={<CapsuleBasicSetting />}
        ></Route>
        <Route
          path="/capsule/settings/confirm"
          element={<ConfirmBasicSetting />}
        ></Route>
        <Route
          path="/capsule/input-recipients"
          element={<RecipientInput />}
        ></Route>
        <Route
          path="/capsule/letter-format"
          element={<WritingFormat />}
        ></Route>
        <Route
          path="/capsule/open/rolling"
          element={<RollingpaperOpen />}
        ></Route>
        <Route path="/capsule/open/text" element={<ReceivedText />}></Route>
        <Route path="/capsule/open/voice" element={<ReceivedVoice />}></Route>

        <Route path="/enterURL" element={<EnterURL />}></Route>
      
        <Route path = "/capsule/verify" element={<OpenCapsule/>}/>
        <Route path = "/capsule/write/text" element={<Write/>}/>

        <Route path="/home" element={<Home />} />
        <Route path="/nickname" element={<Nickname />} />
        <Route path="/capsule/recording" element={<Recording />} />

      </Routes>
    </div>
  );
}

export default App;

import "./App.css";

import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import CapsuleBasicSetting from "./pages/CapsuleBasicSetting";
import CapsuleCodeAssignment from "./pages/CapsuleCodeAssignment.jsx";
import CheckCapsuleByNumber from "./pages/CheckCapsuleByNumber";
import ConfirmBasicSetting from "./pages/ConfirmBasicSetting";
import EnterURL from "./pages/EnterURL";
import Home from "./pages/Home";
import Login from "./pages/Login.jsx";
import Nickname from "./pages/Nickname";
import OpenCapsule from "./pages/OpenCapsule";
import React from "react";
import ReceivedText from "./pages/ReceivedText";
import ReceivedVoice from "./pages/ReceivedVoice";
import RecipientInput from "./pages/RecipientInput";
import Recording from "./pages/Recording";
import RollingpaperOpen from "./pages/RollingpaperOpen";
import Settings from "./pages/Settings.jsx";
import URLnCodeAssignment from "./pages/URLnCodeAssignment.jsx";
import Write from "./pages/Write";
import WritingFormat from "./pages/WritingFormat";

function App() {
  return (
    <div className="App">
      {/* <Router> */}
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route
          path="/capsule/assign-number"
          element={<CapsuleCodeAssignment />}
        ></Route>
        <Route
          path="/capsule/assign-number-url"
          element={<URLnCodeAssignment />}
        ></Route>
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

        <Route path="/rolling/:rcapsule_number" element={<EnterURL />}></Route>

        <Route path="/capsule/verify" element={<OpenCapsule />} />
        <Route path="/capsule/write/text" element={<Write />} />

        <Route path="/capsule/write/voice" element={<Recording />} />
        <Route path="/login/kakao/nickname" element={<Nickname />} />
        <Route path="/login/kakao/home" element={<Home />}></Route>
        <Route path="/login/kakao/settings" element={<Settings />}></Route>
      </Routes>
      {/* </Router> */}
    </div>
  );
}

export default App;

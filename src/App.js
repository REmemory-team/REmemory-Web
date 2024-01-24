import "./App.css";

import { Route, Routes } from "react-router-dom";

import CapsuleBasicSetting from "./pages/CapsuleBasicSetting";
import CheckCapsuleByNumber from "./pages/CheckCapsuleByNumber";
import ConfirmBasicSetting from "./pages/ConfirmBasicSetting";
import EnterURL from "./pages/EnterURL";
import RecipientInput from "./pages/RecipientInput";
import WritingFormat from "./pages/WritingFormat";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<CapsuleBasicSetting />}></Route>
        <Route path="/confirm" element={<ConfirmBasicSetting />}></Route>
        <Route path="/capsulecheck" element={<CheckCapsuleByNumber />}></Route>
        <Route path="/recipientinput" element={<RecipientInput />}></Route>
        <Route path="/writingformat" element={<WritingFormat />}></Route>
        <Route path="/enterURL" element={<EnterURL />}></Route>
      </Routes>
    </div>
  );
}

export default App;

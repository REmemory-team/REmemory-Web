import "./App.css";

import { Route, Routes } from "react-router-dom";

import CapsuleBasicSetting from "./pages/CapsuleBasicSetting";
import ConfirmBasicSetting from "./pages/ConfirmBasicSetting";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<CapsuleBasicSetting />}></Route>
        <Route path="/confirm" element={<ConfirmBasicSetting />}></Route>
      </Routes>
    </div>
  );
}

export default App;

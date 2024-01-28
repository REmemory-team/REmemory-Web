import "./App.css";
import { Route, Routes } from "react-router-dom";

import OpenCapsule from "./pages/OpenCapsule";
import Write from "./pages/Write";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path = "/" element={<OpenCapsule/>}/>
        <Route path = "/write" element={<Write/>}/>
      </Routes>
    </div>
  );
}

export default App;

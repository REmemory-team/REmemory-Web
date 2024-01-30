import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Nickname from "./pages/Nickname";
import Home from "./pages/Home";
import Recording from "./pages/Recording";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/nickname" element={<Nickname />} />
          <Route path="/recording" element={<Recording />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login.jsx";
import CapsuleCodeAssignment from "./pages/CapsuleCodeAssignment.jsx";
import URLnCodeAssignment from "./pages/URLnCodeAssignment.jsx";

const App = () => {
  return (
    <div className="app-container">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/CapsuleCode" element={<CapsuleCodeAssignment />} />
          <Route path="/URLnCode" element={<URLnCodeAssignment />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;

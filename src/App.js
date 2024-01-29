import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login.jsx";
import CapsuleCodeAssignment from "./pages/CapsuleCodeAssignment.jsx";

const App = () => {
  return (
    <div className="app-container">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/CapsuleCode" element={<CapsuleCodeAssignment />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;

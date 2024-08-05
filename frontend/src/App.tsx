import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Booking from "./pages/Booking";
import StripeMock from "./pages/StripeMock";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Booking />} />
        <Route path="/payment" element={<StripeMock />} />
      </Routes>
    </Router>
  );
}

export default App;

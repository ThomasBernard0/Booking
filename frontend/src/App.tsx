import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Booking from "./pages/Booking";
import StripeMock from "./pages/StripeMock";
import Success from "./pages/Success";
import Error from "./pages/Error";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Booking />} />
        <Route path="/payment" element={<StripeMock />} />
        <Route path="/success" element={<Success />} />
        <Route path="/error" element={<Error />} />
      </Routes>
    </Router>
  );
}

export default App;

/* eslint-disable no-unused-vars */
//import { useState } from 'react'
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Simulator from "./pages/Simulator";
import Build from "./pages/Build";
import Navbar from "./components/Navbar";
import "./App.css"; // Or the path to your CSS file
import Home from "./pages/Home";
import Learn from "./pages/Learn";

function App() {
  return (
    <div>
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/simulator" element={<Simulator />}></Route>
          <Route path="/build" element={<Build />}></Route>
          <Route path="/learn" element={<Learn />}></Route>
        </Routes>
      </BrowserRouter>
      <div className="footer">© 2024 SpaceQ</div>
    </div>
  );
}

export default App;

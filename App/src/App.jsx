/* eslint-disable no-unused-vars */
//import { useState } from 'react'
import "./App.css";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import Simulator from "./pages/Simulator";
import Build from "./pages/Build";
import Navbar from "./components/Navbar";
import "./App.css"; // Or the path to your CSS file
import Home from "./pages/Home";

function App() {
  return (
    <div>
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/simulator" element={<Simulator />}></Route>
          <Route path="/build" element={<Build />}></Route>
        </Routes>
      </BrowserRouter>
      <div className='footer'>© 2024 SpaceQ</div>
    </div>
  );
}

export default App;

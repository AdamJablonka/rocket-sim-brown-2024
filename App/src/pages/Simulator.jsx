import "./simulator.css";
import RocketScene from "../components/RocketScene";

function Simulator() {
  return (
    <div className="simulator-container">
      <div className="centered-content">
        <h1>Operate your flight!</h1>
        <RocketScene />
        <canvas
          id="rocket-sim-canvas"
          width="600"
          height="600"
          className="canvas"
        ></canvas>
        <div>
          <h1>How to operate</h1>
          <p>test</p>
        </div>
      </div>
    </div>
  );
}

export default Simulator;

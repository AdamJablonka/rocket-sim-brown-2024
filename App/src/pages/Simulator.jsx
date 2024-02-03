import './simulator.css';

function Simulator() {
  return (
    <div className="simulator-container">
      <div className="centered-content">
        <h1>Welcome to Rocket Simulator!</h1>
        <canvas
          id="rocket-sim-canvas"
          width="600"
          height="600"
          className="canvas"
        ></canvas>
      </div>
      {/* Additional content can go here */}
    </div>
  );
}

export default Simulator;

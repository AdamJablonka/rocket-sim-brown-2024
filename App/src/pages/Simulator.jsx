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
        <div>
          <h1>How to operate</h1>
          <p>test</p>
        </div>
      </div>
    </div>
  );
}

export default Simulator;

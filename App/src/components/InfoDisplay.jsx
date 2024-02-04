export default function InfoDisplay({ rocketData }) {
  const altitudeColor = rocketData.y > 2000 ? "green" : "";
  const velocityColor = rocketData.velX > 2 ? "green" : "";

  return (
    <div id="info">
      <h1>TELEMETRY</h1>
      <div>
        <p style={{ backgroundColor: altitudeColor }}>
          ALTITUDE: {(rocketData.y/10).toFixed(0)*10}
        </p>
        <p style={{ backgroundColor: velocityColor }}>
          VELX: {rocketData.velX.toFixed(2)}; VELY: {rocketData.velY.toFixed(2)}
        </p>
        <p>FUEL MASS: {rocketData.fuelMass.toFixed(2)}</p>
        <p>
          THRUST/WEIGHT: &nbsp;
          {(
            rocketData.thrust /
            ((rocketData.fuelMass + rocketData.dryMass) * rocketData.g)
          ).toFixed(2)}
        </p>
      </div>
    </div>
  );
}

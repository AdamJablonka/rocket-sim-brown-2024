export default function FuelGauge({ currFuel, maxFuel }) {
  const fuelRatio = currFuel / maxFuel;
  // const fuelRatio = 0.0

  const gaugeHeight = 300;
  const fuelHeight = `${fuelRatio * 100}%`;

  return (
    <div className="fuel-gauge" style={{ height: `${gaugeHeight}px` }}>
      <div className="fuel-level" style={{ height: fuelHeight }}></div>
    </div>
  );
}

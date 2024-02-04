

// requires rocketData object with the needed data
export default function InfoDisplay({ rocketData }) {
    const altitudeColor = rocketData.y > 100000 ? 'green' : '';
    const velocityColor = rocketData.velX > 5 ? 'green' : '';

    return (
        <div id="info">
            <h1>Telemetry</h1>
            <div>
                <p style={{backgroundColor: altitudeColor}}>Altitude: {rocketData.y.toFixed(2)}</p>
                <p style={{backgroundColor: velocityColor}}>velX: {rocketData.velX.toFixed(2)}; velY: {rocketData.velY.toFixed(2)}</p>
                <p>Fuel Mass: {rocketData.fuelMass.toFixed(2)}</p>
                <p>Thrust/Weight: &nbsp;
                    {(rocketData.thrust / ((rocketData.fuelMass + rocketData.dryMass)*rocketData.g)).toFixed(2)}
                </p>
            </div>
        </div>
    )
}
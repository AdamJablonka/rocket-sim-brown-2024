import "./Build.css";
import PhotoCarousel from "../components/PhotoCarousel";
import { useState } from "react";
// Payload Photos
import satelliteImg from "../assets/build-images/payloads/satellite.png";
import spacecraftImg from "../assets/build-images/payloads/human_spacecraft.png";
// Command Modules Photos
import apolloImg from "../assets/build-images/command_modules/apollo.png";
import dragonImg from "../assets/build-images/command_modules/dragon2.png";
import soyuz from "../assets/build-images/command_modules/soyuz.png";
// Fuel Tank Photos
import solid from "../assets/build-images/fuel-tank/solid.png";
import liquid from "../assets/build-images/fuel-tank/liquid.png";

// Data Objects to be passed into PhotoCarousel
const payloadData = [
  {
    url: satelliteImg,
    name: "Satellite",
    description:
      "Satellites can be used for communication, Earth observation, scientific research, weather monitoring, and more.",
  },
  {
    url: spacecraftImg,
    name: "Human Spacecraft",
    description:
      "Designed to carry astronauts into space for examples like ISS supply missions, or spacecraft designed for lunar or Martian exploration.",
  },
];

const commandModuleData = [
  {
    url: apolloImg,
    name: "Apollo Command",
    description:
      " Used in NASA's Apollo program, this was the crewed module capable of supporting three astronauts from lunar orbit to Earth return. It's one of the most famous examples of a command module.",
  },
  {
    url: dragonImg,
    name: "Dragon 2",
    description:
      " Developed by SpaceX, this spacecraft includes a modern command module designed for ferrying astronauts to the International Space Station and potentially other destinations in the future.",
  },
  {
    url: soyuz,
    name: "Soyuz",
    description:
      " Part of the Russian Soyuz spacecraft, this module houses the crew during launch, orbital flight, and re-entry. It's been in use since the 1960s and is known for its reliability.",
  },
];

const engineData = [
  {
    url: solid,
    name: "Solid Rocket Motors (SRMs)",
    description:
      "Commonly used as booster engines for additional thrust during liftoff and in military applications. They are simpler and more reliable than liquid engines, with fewer moving parts, but lack throttle control and are generally less efficient.",
  },
  {
    url: liquid,
    name: "Liquid Rocket Engines (LREs)",
    description:
      "Used primarily as main and upper stage engines in launch vehicles due to their ability to be throttled and restarted. They offer precise control and efficiency but are complex, requiring intricate fuel and oxidizer management systems.",
  },
];

function Build() {
  const [selectedPayload, setSelectedPayload] = useState(null);
  const [selectedCommandModule, setSelectedCommandModule] = useState(null);
  const [selectedEngine, setSelectedEngine] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent the default form submit action
    console.log("Checkout with the following selections:");
    console.log("Payload:", selectedPayload);
    console.log("Command Module:", selectedCommandModule);
    console.log("Engine:", selectedEngine);
    // Add additional checkout logic here
  };
  return (
    <div className="build-container">
      <h1> Available Components</h1>

      <h2>Payload</h2>
      <p>What is your rocket loading?</p>
      <PhotoCarousel payloadData={payloadData} />

      <h2>Command Module</h2>
      <p>
        The command module in a rocket, especially in the context of manned
        space missions, <br />
        is a critical component. Its essentially the part of the spacecraft
        where the astronauts <br />
        live and control the mission. <br />
      </p>
      <PhotoCarousel payloadData={commandModuleData} />

      <h2>Engine Configuration</h2>
      <p>
        Rocket engines are a critical component of space <br />
        exploration and satellite deployment. They come in various types, <br />
        each suited for specific applications and stages of a mission <br />
      </p>

      <PhotoCarousel payloadData={engineData} />

      <h2>Engineer your Flight!</h2>
      <form onSubmit={handleSubmit}>
        <h3>Select your Payload</h3>
        <div className="button-group">
          {payloadData.map((item) => (
            <button
              type="button"
              key={item.name}
              className={`button ${
                selectedPayload === item.name ? "selected" : ""
              }`}
              onClick={() => setSelectedPayload(item.name)}
            >
              {item.name}
            </button>
          ))}
        </div>

        <h3>Select your Command Module</h3>
        <div className="button-group">
          {commandModuleData.map((item) => (
            <button
              type="button"
              key={item.name}
              className={`button ${
                selectedCommandModule === item.name ? "selected" : ""
              }`}
              onClick={() => setSelectedCommandModule(item.name)}
            >
              {item.name}
            </button>
          ))}
        </div>

        <h3>Select your Engine</h3>
        <div className="button-group">
          {engineData.map((item) => (
            <button
              type="button"
              key={item.name}
              className={`button ${
                selectedEngine === item.name ? "selected" : ""
              }`}
              onClick={() => setSelectedEngine(item.name)}
            >
              {item.name}
            </button>
          ))}
        </div>

        <div className="button-group">
          <button type="submit" className="button checkout-button">
            Check Out
          </button>
        </div>
      </form>
    </div>
  );
}

export default Build;

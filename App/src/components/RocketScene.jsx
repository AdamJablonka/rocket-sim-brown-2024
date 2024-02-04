import React, { useRef, useState, useEffect } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three-stdlib";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import FuelGauge from "./FuelGauge";
import InfoDisplay from "./InfoDisplay";

const TestScene = () => {
  const [gameOn, setGameOn] = useState(false);
  const gameOnRef = useRef(gameOn);
  const [direction, setDirection] = useState(90);
  const directionRef = useRef(direction);
  const [thrust, setThrust] = useState(88.8);
  const thrustRef = useRef(thrust);
  const [fuelMass, setFuelMass] = useState(2);
  const fuelMassRef = useRef(fuelMass);

  const [rocketData, setRocketData] = useState({
    g: 5,
    x: 0,
    y: 0,
    velX: 0,
    velY: 0,
    direction: 90,
    thrust: 70,
    thrustX: 0,
    thrustY: 0,
    dragX: 0,
    dragY: 0,
    forceX: 0,
    forceY: 0,
    dryMass: 16,
    fuelMass: 2,
  });
  const rocketDataRef = useRef(rocketData);

  useEffect(() => {
    gameOnRef.current = gameOn; // Update ref value when gameOn changes
  }, [gameOn]);

  // useEffect(() => {
  //   directionRef.current = direction; // Update ref value when direction changes
  // }, [direction]);

  // useEffect(() => {
  //   thrustRef.current = thrust; // Update ref value when thrust changes
  // }, [thrust]);

  // useEffect(() => {
  //   fuelMassRef.current = fuelMass; // Update ref value when fuelMass changes
  // }, [fuelMass]);

  useEffect(() => {
    rocketDataRef.current = rocketData;
  }, [rocketData]);

  const togglePlay = () => {
    setGameOn(!gameOn);
  };

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.code === "Space") {
        event.preventDefault();
        togglePlay();
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress); // Cleanup the event listener on component unmount
    };
  }, [togglePlay]); // Add togglePlay as a dependency so the effect knows when it changes

  useEffect(() => {
    console.log("GameOn?", gameOn);
  }, [gameOn]);
  // let gameOn = false;

  var dt = 1 / 5000;

  // ENVIRONMENT -----------------------
  const g = 5;
  let dragCoeff = 0.1;
  // ENVIRONMENT -----------------------

  // ROCKET ----------------------------

  // const rocketStartOffGround = 100;

  // var x = window.innerWidth/2;
  // var y = rocketStartOffGround;

  var x = 0;
  var y = 0;

  const dryMass = 16;
  // var fuelMass = 4;
  var rocketMass = dryMass + fuelMass;

  var burnRate = 0.01;

  const rocketWidth = 20;
  const rocketHeight = 100;

  var velX = 0;
  var velY = 0;

  var thrustY = 0;
  var thrustX = 0;

  const startingThrust = 50;
  const maxThrust = 100;
  const minThrust = 0;

  // ROCKET ----------------------------

  let dragX = 0;
  let dragY = 0;
  let forceX = 0;
  let forceY = 0;

  const handleKeyDown = (e) => {
    switch (e.key) {
      case "Right":
      case "d":
        setRocketData((prevData) => {
          return { ...prevData, direction: prevData.direction - 1 };
        });
        // setDirection((prevDirection) => prevDirection - 1);
        break;
      case "Left":
      case "a":
        setRocketData((prevData) => {
          return { ...prevData, direction: prevData.direction + 1 };
        });
        // setDirection((prevDirection) => prevDirection + 1);
        break;
      case "Up":
      case "w":
        setRocketData((prevData) => {
          return {
            ...prevData,
            thrust:
              prevData.thrust < maxThrust ? prevData.thrust + 0.5 : maxThrust,
          };
        });
        // setThrust((prevThrust) => (prevThrust < maxThrust ? prevThrust + 0.5 : maxThrust));
        break;
      case "Down":
      case "s":
        setRocketData((prevData) => {
          return {
            ...prevData,
            thrust: prevData.thrust > minThrust ? prevData.thrust - 0.5 : 0,
          };
        });
        // setThrust((prevThrust) => (prevThrust > minThrust ? prevThrust - 0.5 : 0 ));
        break;
      default:
        break;
    }
  };

  function updateDragCoeff(y) {
    return 0.5 * Math.exp(-y / 10000);
  }

  function rocketMechanics() {
    if (!gameOnRef.current) {
      return;
    }
    // console.log("simulating hahahah");

    // gravity
    if (y < 0) {
      setRocketData((prevData) => {
        return { ...prevData, velY: 0, y: 0 };
      });
      velY = 0;
      y = 0;
    }
    setRocketData((prevData) => {
      return { ...prevData, velY: prevData.velY - g * dt };
    });
    velY -= g * dt;

    // engine thrust
    if (rocketDataRef.current.fuelMass >= 0) {
      thrustX =
        Math.cos((rocketDataRef.current.direction * Math.PI) / 180) *
        rocketDataRef.current.thrust;
      thrustY =
        Math.sin((rocketDataRef.current.direction * Math.PI) / 180) *
        rocketDataRef.current.thrust;

      // fuelMassRef.current -= thrustRef.current * burnRate * dt;
      // setFuelMass(fuelMassRef.current);
      setRocketData((prevData) => {
        return {
          ...prevData,
          fuelMass:
            prevData.fuelMass - rocketDataRef.current.thrust * burnRate * dt,
        };
      });
    } else {
      setRocketData((prevData) => {
        return { ...prevData, thrust: 0, thrustX: 0, thrustY: 0 };
      });
      thrustX = 0;
      thrustY = 0;
    }
    // let velAngle = Math.atan(velY/velX);

    // drag, not coupled
    dragCoeff = updateDragCoeff(y);
    dragX = -dragCoeff * velX * velX * Math.sign(velX);
    dragY = -dragCoeff * velY * velY * Math.sign(velY);

    forceX = dragX + thrustX;
    forceY = dragY + thrustY;

    rocketMass = dryMass + rocketDataRef.current.fuelMass;

    velX += (forceX / rocketMass) * dt;
    velY += (forceY / rocketMass) * dt;

    console.log(
      "T/W: " +
        (rocketDataRef.current.thrust / (rocketMass * g)).toFixed(2) +
        "; x: " +
        x.toFixed(2) +
        "; y: " +
        y.toFixed(2) +
        "; velX: " +
        velX.toFixed(2) +
        "; velY: " +
        velY.toFixed(2) +
        "; thrustX: " +
        thrustX.toFixed(2) +
        "; thrustY: " +
        thrustY.toFixed(2) +
        "; dragX: " +
        dragX.toFixed(2) +
        "; dragY: " +
        dragY.toFixed(2) +
        "; forceX: " +
        forceX.toFixed(2) +
        "; forceY: " +
        forceY.toFixed(2) +
        "; fuelMass: " +
        rocketDataRef.current.fuelMass.toFixed(2) +
        "; rocketMass: " +
        rocketMass.toFixed(2)
    );

    x += velX;
    y += velY;

    setRocketData((prevData) => {
      return {
        ...prevData,
        x: x,
        y: y,
        velX: velX,
        velY: velY,
        thrustX: thrustX,
        thrustY: thrustY,
        dragX: dragX,
        dragY: dragY,
        forceX: forceX,
        forceY: forceY,
      };
    });
  }

  const mountRef = useRef(null);
  let rocket = null; // Declare rocket outside useEffect to maintain its reference

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 10;
    camera.position.y = 1;

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x87ceeb); // Sky blue background
    mountRef.current.appendChild(renderer.domElement);

    const particleCount = 1000 * (1 - velY);
    const particles = [];

    const particleGeometry = new THREE.SphereGeometry(0.4, 8, 8); // Small spherical particles
    const particleMaterial = new THREE.MeshPhongMaterial({
      color: 0xd3d3d3,
      transparent: true,
      opacity: 1,
    });

    for (let i = 0; i < particleCount; i++) {
      const particle = new THREE.Mesh(particleGeometry, particleMaterial);
      resetParticle(particle, 0, -3);
      particles.push(particle);
      scene.add(particle);
    }

    function resetParticle(particle, emitterXPosition, emitterYPosition) {
      particle.position.set(emitterXPosition, emitterYPosition, 0); // Emitter position
      const speed = 0.01 - velY / 2 + Math.random() * 0.1; // Random speed
      const angleRange = Math.PI / 4; // Quarter circle (90 degrees)
      const angleOffset = -Math.PI / 4; // Offset to center the spread downwards
      const angle = angleOffset + (Math.random() - 1.5) * angleRange; // Random direction within a quarter circle, centered downwards
      particle.userData.velocity = new THREE.Vector3(
        Math.cos(angle) * speed,
        Math.sin(angle) * speed,
        (Math.random() * 2 - 1) * speed
      );
    }

    const directionalLight = new THREE.DirectionalLight(0xffffff, 3);
    directionalLight.position.set(0, 35, 50);
    scene.add(directionalLight);
    const ambientLight = new THREE.AmbientLight(0xffffff, 1);
    scene.add(ambientLight);

    const loader = new GLTFLoader();
    loader.load(
      "rocket.glb",
      (gltf) => {
        rocket = gltf.scene; // Assign the rocket scene object
        scene.add(rocket);
      },
      undefined,
      (error) => {
        console.error("An error happened", error);
      }
    );

    loader.load(
      "launch_pad.glb",
      (gltf) => {
        gltf.scene.position.y = -3.5; // Adjust the floor model's vertical position
        scene.add(gltf.scene);
      },
      undefined,
      (error) => {
        console.error(
          "An error happened while loading the floor model:",
          error
        );
      }
    );

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.maxPolarAngle = Math.PI / 2; // Lock vertical movement
    controls.minPolarAngle = Math.PI / 2;
    controls.enableZoom = false;
    controls.maxAzimuthAngle = Math.PI / 4; // Limit rotation to 45 degrees left
    controls.minAzimuthAngle = -Math.PI / 4;

    // event listener for keyboard controls
    window.addEventListener("keydown", handleKeyDown);

    const animate = () => {
      requestAnimationFrame(animate);
      if (rocket) {
        // rocket.position.y += 0.01; // Move the rocket up slowly
        rocketMechanics();

        rocket.position.x = x;
        rocket.position.y = y;

        rocket.rotation.z =
          (rocketDataRef.current.direction - 90) * (Math.PI / 180); // Rotate the rocket

        let factor = Math.min(rocket.position / 5000, 1);
        const skyBlue = new THREE.Color(0x87ceeb);
        const black = new THREE.Color(0x000000);
        const currentColor = skyBlue.lerp(black, factor);

        renderer.setClearColor(currentColor);

        if (gameOnRef.current) {
          particles.forEach((particle) => {
            particle.position.add(particle.userData.velocity);

            // Define the ground plane's y position (for example, y = -5)
            const groundY = -3;

            // Check for collision with the ground plane
            if (particle.position.y <= groundY) {
              particle.position.y = groundY; // Reset position to ground level
              particle.userData.velocity.y *= Math.random() * -0.04; // Reverse and dampen y velocity
            }

            // Reset particle if it moves too far
            const distance = particle.position.distanceTo(rocket.position);
            if (distance > 16 - velY) {
              const theta = directionRef.current * (Math.PI / 180) + Math.PI;
              resetParticle(
                particle,
                3 * Math.cos(theta) + rocketDataRef.current.x,
                3 * Math.sin(theta) + rocketDataRef.current.y
              );
            }
          });
        }

        // console.log(rocket.position.x, rocket.position.y, rocket.position.z)
        camera.position.x = rocket.position.x;
        camera.position.y = rocket.position.y + 1;
        camera.position.z = rocket.position.z + 10;
        camera.lookAt(rocket.position); // Camera always points at the rocket
        controls.target.copy(rocket.position); // OrbitControls target follows the rocket
      }
      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      mountRef.current.removeChild(renderer.domElement);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div>
      <div ref={mountRef} />
      <InfoDisplay rocketData={rocketData} />
      <FuelGauge currFuel={rocketData.fuelMass} maxFuel={2} />
      <button id="start-pause-button" onClick={togglePlay}>
        {gameOn ? "Pause" : "Resume"}
      </button>
    </div>
  );
};

export default TestScene;

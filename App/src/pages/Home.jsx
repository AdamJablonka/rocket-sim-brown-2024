import Slider from "react-slick"; // Import the Slider component
import "slick-carousel/slick/slick.css"; // Default styling
import "slick-carousel/slick/slick-theme.css"; // Theme styling (optional)
import "./Home.css"; // Make sure to import the CSS file

function Home() {
  // Carousel settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div>
      <div className="top-section">
        <div className="floating-text">
          <Slider {...settings}>
            <div>
              <h1>Rocket Simulator</h1>
              <p>Discover the universe and beyond...</p>
            </div>
            <div>
              <h1>3D Rocket Model</h1>
              <p>Unleash the Cosmos: Adventure Awaits Beyond the Horizon.</p>
            </div>
            <div>
            <h1>Physics Game Engine</h1>
              <p>Soar Through the Heavens, Where Only Rockets Dare</p>
            </div>
            {/* Add more slides as needed */}
          </Slider>
        </div>
      </div>
      <div className="second-section">
        <div className="floating-text">
          <Slider {...settings}>
            <div>
              <h1>Rocket Builder</h1>
              <p>Where Engineering Meets Imagination: Assemble the Future.</p>
            </div>
            <div>
            <h1>Component Library</h1>
              <p>Explore the Building Blocks of Space Travel.</p>
            </div>
            <div>
            <h1>C02 Launch Calculator</h1>
              <p>From Blueprint to Liftoff: Every Part Tells a Story.</p>
            </div>
            {/* Add more slides as needed */}
          </Slider>
        </div>
      </div>
      <div className="third-section">
        <div className="floating-text">
          <Slider {...settings}>
            <div>
              <h1>Learn</h1>
              <p>Diving into the vastness of space, we realize how boundless our curiosity can be. Every star and planet tells a unique story of cosmic wonder.</p>
            </div>
            <div>
              <h1>Advocate and Educate</h1>
              <p>Tackling CO2 emissions starts with knowledge.</p>
            </div>
            <div>
            <h1>Takei</h1>
              <p>The best professor!</p>
            </div>
            {/* Add more slides as needed */}
          </Slider>
        </div>
      </div>
    </div>
  );
}

export default Home;

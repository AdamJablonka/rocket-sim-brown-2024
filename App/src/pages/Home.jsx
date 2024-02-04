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
              <h1>Mission to Mars</h1>
              <p>Experience the Red Planet like never before.</p>
            </div>
            <div>
              <h1>Orbital Outposts</h1>
              <p>Building the future in space.</p>
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
              <p>Discover the universe and beyond...</p>
            </div>
            <div>
              <h1>Mission to Mars</h1>
              <p>Experience the Red Planet like never before.</p>
            </div>
            <div>
              <h1>Orbital Outposts</h1>
              <p>Building the future in space.</p>
            </div>
            {/* Add more slides as needed */}
          </Slider>
        </div>
      </div>
    </div>
  );
}

export default Home;

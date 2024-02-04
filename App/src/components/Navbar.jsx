import logo from "../assets/logo.jpg";
import "./Navbar.css";

function Navbar() {
  return (
    <nav>
      <span>
        <img src={logo} alt={logo} width="50" height="50"></img>
      </span>
      <a href="/">HOME</a>
      <a href="/simulator">SIMULATOR</a>
      <a href="/build">BUILD</a>
      <a href="/learn">LEARN</a>
    </nav>
  );
}

export default Navbar;

import logo from "../assets/demo-logo.png"
import "./Navbar.css"

function Navbar() {
    return (
        <nav>
        <span> 
            <img src={logo} alt={logo} width="50" height="50">
            </img>
        </span>
        <a href="/">Home</a>
        <a href="/simulator">Simulator</a>
        <a href="/build">Build</a>
        </nav>
    )
}

export default Navbar

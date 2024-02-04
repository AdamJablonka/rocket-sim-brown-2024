import logo from "../assets/demo-logo.png"
import "./Navbar.css"

function Navbar() {
    return (
        <nav>
        <span> 
            <img src={logo} alt={logo} width="50" height="50">
            </img>
        </span>
        <a href="/">HOME</a>
        <a href="/simulator">SIMULATOR</a>
        <a href="/build">BUILD</a>
        </nav>
    )
}

export default Navbar
